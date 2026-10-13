import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Lesson } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const dbLessons = await prisma.lesson.findMany({
      orderBy: { orderNumber: 'asc' },
    });

    const lessons: Lesson[] = dbLessons.map((l) => ({
      id: l.id,
      orderNumber: l.orderNumber,
      slug: l.slug,
      title: l.title,
      subtitle: l.subtitle,
      description: l.description,
      duration: l.duration,
      videoUrl: l.videoUrl || undefined,
      objectives: l.objectives ? JSON.parse(l.objectives) : [],
      pblProblem: l.pblProblem || undefined,
      simulationType: l.simulationType as any,
      hasSimulation: l.hasSimulation,
      reflectionPrompts: l.reflectionPrompts ? JSON.parse(l.reflectionPrompts) : [],
      contentBlocks: l.content ? JSON.parse(l.content) : [],
    }));

    return NextResponse.json({ success: true, lessons });
  } catch (error) {
    console.error('Error fetching lessons from DB:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal memuat modul dari database' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Lesson = await request.json();

    const updated = await prisma.lesson.upsert({
      where: { id: body.id },
      update: {
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        duration: body.duration,
        videoUrl: body.videoUrl || null,
        objectives: JSON.stringify(body.objectives),
        pblProblem: body.pblProblem || null,
        simulationType: body.simulationType,
        reflectionPrompts: JSON.stringify(body.reflectionPrompts || []),
        content: JSON.stringify(body.contentBlocks),
      },
      create: {
        id: body.id,
        orderNumber: body.orderNumber,
        slug: body.slug,
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        duration: body.duration,
        videoUrl: body.videoUrl || null,
        objectives: JSON.stringify(body.objectives),
        pblProblem: body.pblProblem || null,
        simulationType: body.simulationType,
        reflectionPrompts: JSON.stringify(body.reflectionPrompts || []),
        content: JSON.stringify(body.contentBlocks),
      },
    });

    return NextResponse.json({ success: true, lesson: updated });
  } catch (error) {
    console.error('Error saving lesson to DB:', error);
    return NextResponse.json(
      { success: false, error: 'Gagal menyimpan modul ke database' },
      { status: 500 }
    );
  }
}
