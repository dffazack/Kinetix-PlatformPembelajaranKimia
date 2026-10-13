import { PrismaClient } from '@prisma/client';
import { PBL_LESSONS, PBL_QUESTIONS, SEED_USERS, INITIAL_STUDENT_RESULTS } from '../src/lib/data/pblCurriculumData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed for KINETIX Chemistry Platform...');

  // 1. Clean existing records
  await prisma.studentResult.deleteMany();
  await prisma.question.deleteMany();
  await prisma.experiment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing database tables.');

  // 2. Seed Users
  for (const user of SEED_USERS) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        school: user.school || null,
        avatar: user.avatar || '👨‍🎓',
        password: user.role === 'TEACHER' ? 'kinetix2026' : 'password123',
      },
    });
  }
  console.log(`✅ Seeded ${SEED_USERS.length} users (Teacher & Students).`);

  // 3. Seed Lessons & Experiments
  for (const lesson of PBL_LESSONS) {
    await prisma.lesson.create({
      data: {
        id: lesson.id,
        orderNumber: lesson.orderNumber,
        slug: lesson.slug,
        title: lesson.title,
        subtitle: lesson.subtitle,
        description: lesson.description,
        duration: lesson.duration,
        videoUrl: lesson.videoUrl || null,
        objectives: JSON.stringify(lesson.objectives),
        pblProblem: lesson.pblProblem || null,
        content: JSON.stringify(lesson.contentBlocks),
        hasSimulation: true,
        simulationType: lesson.simulationType,
        reflectionPrompts: JSON.stringify(lesson.reflectionPrompts || []),
      },
    });

    // Create corresponding experiment entity
    await prisma.experiment.create({
      data: {
        id: `exp-${lesson.id}`,
        lessonId: lesson.id,
        type: lesson.simulationType,
        title: `Simulasi Laboratorium Virtual: ${lesson.title}`,
        description: `Laboratorium simulasi interaktif untuk ${lesson.subtitle}`,
        parameters: JSON.stringify({
          simulationType: lesson.simulationType,
          videoUrl: lesson.videoUrl,
        }),
      },
    });
  }
  console.log(`✅ Seeded ${PBL_LESSONS.length} PBL Lessons (Pertemuan 1 - 5) & Experiments.`);

  // 4. Seed Pre-test and Post-test Questions
  for (const q of PBL_QUESTIONS) {
    await prisma.question.create({
      data: {
        id: q.id,
        lessonId: q.lessonId,
        testType: q.testType,
        category: q.category || null,
        type: q.type,
        orderIndex: q.orderIndex,
        questionText: q.questionText,
        options: q.options ? JSON.stringify(q.options) : null,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || null,
      },
    });
  }
  console.log(`✅ Seeded ${PBL_QUESTIONS.length} Questions (Pre-test diagnostik & Post-test HOTS).`);

  // 5. Seed Initial Student Results (Demonstrating N-Gain & Metacognitive Reflections)
  for (const res of INITIAL_STUDENT_RESULTS) {
    await prisma.studentResult.create({
      data: {
        id: res.id,
        studentId: res.studentId,
        lessonId: res.lessonId,
        preTestScore: res.preTestScore,
        postTestScore: res.postTestScore,
        nGain: res.nGain,
        score: res.postTestScore,
        preAnswers: JSON.stringify(res.preAnswers || {}),
        postAnswers: JSON.stringify(res.postAnswers || {}),
        mcAnswers: JSON.stringify(res.postAnswers || {}),
        fillAnswers: JSON.stringify({}),
        reflectionAnswers: JSON.stringify(res.reflectionAnswers || {}),
        stagesCompleted: JSON.stringify(res.stagesCompleted || []),
        feedback: res.feedback || null,
        completedAt: new Date(res.completedAt),
      },
    });
  }
  console.log(`✅ Seeded ${INITIAL_STUDENT_RESULTS.length} Student Results with N-Gain & Reflections.`);

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
