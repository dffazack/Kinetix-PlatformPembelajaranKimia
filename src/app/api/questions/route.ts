import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Question } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lessonId = searchParams.get('lessonId');
    const testType = searchParams.get('testType');

    const whereClause: any = {};
    if (lessonId) whereClause.lessonId = lessonId;
    if (testType) whereClause.testType = testType;

    const dbQuestions = await prisma.question.findMany({
      where: whereClause,
      orderBy: { orderIndex: 'asc' },
    });

    const questions: Question[] = dbQuestions.map((q) => ({
      id: q.id,
      lessonId: q.lessonId,
      testType: q.testType as any,
      category: q.category as any,
      type: q.type as any,
      orderIndex: q.orderIndex,
      questionText: q.questionText,
      options: q.options ? JSON.parse(q.options) : [],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || undefined,
    }));

    // Also group by lessonId for quick mapping
    const groupedByLesson: Record<string, { preTest: Question[]; postTest: Question[] }> = {};
    questions.forEach((q) => {
      if (!groupedByLesson[q.lessonId]) {
        groupedByLesson[q.lessonId] = { preTest: [], postTest: [] };
      }
      if (q.testType === 'PRE_TEST') {
        groupedByLesson[q.lessonId].preTest.push(q);
      } else {
        groupedByLesson[q.lessonId].postTest.push(q);
      }
    });

    return NextResponse.json({
      success: true,
      questions,
      groupedByLesson,
    });
  } catch (error) {
    console.error('Error fetching questions from DB:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memuat soal asesmen dari database' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Question = await request.json();

    const created = await prisma.question.upsert({
      where: { id: body.id },
      update: {
        lessonId: body.lessonId,
        testType: body.testType,
        category: body.category || null,
        type: body.type,
        orderIndex: body.orderIndex,
        questionText: body.questionText,
        options: body.options ? JSON.stringify(body.options) : null,
        correctAnswer: body.correctAnswer,
        explanation: body.explanation || null,
      },
      create: {
        id: body.id,
        lessonId: body.lessonId,
        testType: body.testType,
        category: body.category || null,
        type: body.type,
        orderIndex: body.orderIndex,
        questionText: body.questionText,
        options: body.options ? JSON.stringify(body.options) : null,
        correctAnswer: body.correctAnswer,
        explanation: body.explanation || null,
      },
    });

    return NextResponse.json({ success: true, question: created });
  } catch (error) {
    console.error('Error saving question to DB:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menyimpan soal ke database' },
      { status: 500 }
    );
  }
}
