import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { StudentResult, LearningStage } from '@/lib/types';

export const dynamic = 'force-dynamic';

function calculateNGain(pre: number, post: number): number {
  if (pre >= 100) return post >= 100 ? 1 : 0;
  const gain = (post - pre) / (100 - pre);
  return Math.round(gain * 100) / 100;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const lessonId = searchParams.get('lessonId');

    const whereClause: any = {};
    if (studentId) whereClause.studentId = studentId;
    if (lessonId) whereClause.lessonId = lessonId;

    const dbResults = await prisma.studentResult.findMany({
      where: whereClause,
      include: {
        student: true,
      },
      orderBy: { completedAt: 'desc' },
    });

    const results: StudentResult[] = dbResults.map((r) => ({
      id: r.id,
      studentId: r.studentId,
      studentName: r.student.name,
      studentEmail: r.student.email,
      lessonId: r.lessonId,
      preTestScore: r.preTestScore ?? 0,
      postTestScore: r.postTestScore ?? 0,
      nGain: r.nGain ?? 0,
      score: r.score ?? 0,
      preAnswers: r.preAnswers ? JSON.parse(r.preAnswers) : {},
      postAnswers: r.postAnswers ? JSON.parse(r.postAnswers) : {},
      reflectionAnswers: r.reflectionAnswers ? JSON.parse(r.reflectionAnswers) : {},
      paragraphAnswers: r.paragraphAnswers ? JSON.parse(r.paragraphAnswers) : {},
      stagesCompleted: r.stagesCompleted ? JSON.parse(r.stagesCompleted) : [],
      feedback: r.feedback || undefined,
      completedAt: r.completedAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    }));

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Error fetching student results from DB:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memuat rekap nilai siswa dari database' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      studentId,
      lessonId,
      action, // 'SUBMIT_PRE_TEST' | 'COMPLETE_ORIENTATION' | 'COMPLETE_SIMULATION' | 'SUBMIT_POST_TEST' | 'SUBMIT_REFLECTION' | 'SUBMIT_PARAGRAPH_ANSWER'
      answers,
      reflectionAnswers,
      blockId,
      answerText,
    } = body;

    if (!studentId || !lessonId) {
      return NextResponse.json(
        { success: false, error: 'studentId dan lessonId wajib disertakan' },
        { status: 400 }
      );
    }

    // Ensure user exists
    let user = await prisma.user.findUnique({ where: { id: studentId } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: studentId,
          email: body.studentEmail || `student_${Date.now()}@kinetix.id`,
          name: body.studentName || 'Siswa Kinetix',
          role: 'STUDENT',
        },
      });
    }

    // Find existing result or prepare default
    const existing = await prisma.studentResult.findUnique({
      where: {
        studentId_lessonId: { studentId, lessonId },
      },
    });

    let preScore = existing?.preTestScore ?? 0;
    let postScore = existing?.postTestScore ?? 0;
    let nGain = existing?.nGain ?? 0;
    let preAnswersMap = existing?.preAnswers ? JSON.parse(existing.preAnswers) : {};
    let postAnswersMap = existing?.postAnswers ? JSON.parse(existing.postAnswers) : {};
    let reflectionMap = existing?.reflectionAnswers ? JSON.parse(existing.reflectionAnswers) : {};
    let paragraphMap = existing?.paragraphAnswers ? JSON.parse(existing.paragraphAnswers) : {};
    let stages: LearningStage[] = existing?.stagesCompleted ? JSON.parse(existing.stagesCompleted) : [];

    const addStage = (stage: LearningStage) => {
      if (!stages.includes(stage)) stages.push(stage);
    };

    if (action === 'SUBMIT_PRE_TEST') {
      // Calculate pre-test score from DB questions
      const preQuestions = await prisma.question.findMany({
        where: { lessonId, testType: 'PRE_TEST' },
      });

      let correct = 0;
      preQuestions.forEach((q) => {
        const studentAns = answers?.[q.id];
        if (studentAns && studentAns.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
          correct += 1;
        }
      });

      preScore = preQuestions.length > 0 ? Math.round((correct / preQuestions.length) * 100) : 0;
      preAnswersMap = answers || {};
      addStage('PRE_TEST');
    } else if (action === 'COMPLETE_ORIENTATION') {
      addStage('ORIENTATION');
    } else if (action === 'COMPLETE_SIMULATION') {
      addStage('SIMULATION');
    } else if (action === 'SUBMIT_POST_TEST') {
      // Calculate post-test score from DB questions
      const postQuestions = await prisma.question.findMany({
        where: { lessonId, testType: 'POST_TEST' },
      });

      let correct = 0;
      postQuestions.forEach((q) => {
        const studentAns = answers?.[q.id];
        if (studentAns && studentAns.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
          correct += 1;
        }
      });

      postScore = postQuestions.length > 0 ? Math.round((correct / postQuestions.length) * 100) : 0;
      postAnswersMap = answers || {};
      nGain = calculateNGain(preScore, postScore);
      addStage('POST_TEST');
    } else if (action === 'SUBMIT_REFLECTION') {
      reflectionMap = reflectionAnswers || {};
      addStage('REFLECTION');
    } else if (action === 'SUBMIT_PARAGRAPH_ANSWER') {
      if (blockId) {
        paragraphMap = { ...paragraphMap, [blockId]: answerText || '' };
      }
    }

    // Feedback based on postScore or preScore
    let feedback = 'Pemahaman awal tercatat.';
    if (stages.includes('POST_TEST')) {
      if (postScore >= 90) feedback = 'Pemahaman Konseptual Sangat Mendalam (Mastery)!';
      else if (postScore >= 75) feedback = 'Tuntas Kriteria Ketuntasan Minimal (KKM).';
      else feedback = 'Perlu penguatan ulang pada level submikroskopik.';
    }

    const saved = await prisma.studentResult.upsert({
      where: {
        studentId_lessonId: { studentId, lessonId },
      },
      update: {
        preTestScore: preScore,
        postTestScore: postScore,
        nGain: nGain,
        score: postScore,
        preAnswers: JSON.stringify(preAnswersMap),
        postAnswers: JSON.stringify(postAnswersMap),
        reflectionAnswers: JSON.stringify(reflectionMap),
        stagesCompleted: JSON.stringify(stages),
        feedback,
        ...(Object.keys(paragraphMap).length > 0 ? { paragraphAnswers: JSON.stringify(paragraphMap) } : {}),
      },
      create: {
        id: `res-${Date.now()}`,
        studentId,
        lessonId,
        preTestScore: preScore,
        postTestScore: postScore,
        nGain: nGain,
        score: postScore,
        preAnswers: JSON.stringify(preAnswersMap),
        postAnswers: JSON.stringify(postAnswersMap),
        reflectionAnswers: JSON.stringify(reflectionMap),
        stagesCompleted: JSON.stringify(stages),
        feedback,
        ...(Object.keys(paragraphMap).length > 0 ? { paragraphAnswers: JSON.stringify(paragraphMap) } : {}),
      },
    });

    return NextResponse.json({
      success: true,
      result: {
        ...saved,
        studentName: user.name,
        studentEmail: user.email,
        preAnswers: preAnswersMap,
        postAnswers: postAnswersMap,
        reflectionAnswers: reflectionMap,
        paragraphAnswers: paragraphMap,
        stagesCompleted: stages,
      },
    });
  } catch (error) {
    console.error('Error saving student result to DB:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menyimpan hasil evaluasi siswa ke database' },
      { status: 500 }
    );
  }
}
