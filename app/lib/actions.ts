'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '../db/prisma-client';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';

const createClassroomSchema = z.object({
  classroom_id: z.string(),
  name: z.string(),
  level: z.string(),
  days: z.string().array(),
  time: z.string(),
  schedule: z.string(),
  teacher_id: z.string(),
  students: z.array(z.string())
})

export async function createClassroom(formData: FormData) {

  const {
    classroom_id,
    name,
    level,
    days,
    time,
    schedule,
    teacher_id,
    students
  } = createClassroomSchema.parse({
    classroom_id: formData.get('classroom_id'),
    name: formData.get('name'),
    level: formData.get('level'),
    days: formData.getAll('days'),
    time: formData.get('time'),
    schedule: formData.get('schedule'),
    teacher_id: formData.get('teacher_id'),
    students: formData.getAll('students')
  })

  try {
    const user = await prisma.classrooms.create({
      data: {
        classroom_id: classroom_id,
        name: name,
        level: level,
        days: days,
        time: time,
        schedule: schedule.split(',').map(date => {
          return new Date(date)
        }),
        teacher_id: teacher_id
      }
    })

    students.map(async (student_id:string) => {
      const student = await prisma.students.update({
        where: {
          student_id: student_id
        },
        data: {
          classroom_id: classroom_id
        }
      })
    })

  } catch(error) {
    console.log("Error during process", error)
    return { error: "Couldn't create classroom" }
  }

  revalidatePath('/dashboard/classroom');
  revalidatePath('/');
  redirect('/dashboard/classroom');
}

const attendanceSchema = z.object({
  date: z.string(),
  value: z.enum(['present', 'absent', 'tardy']),
  student_id: z.array(z.string()),
  classroom_id: z.string()
})

export async function sendAttendance(formData: FormData) {
  try {
    const {
      date,
      value,
      student_id,
      classroom_id
    } = attendanceSchema.parse({
      date: formData.get('date'),
      value: formData.get('value'),
      student_id: formData.getAll('student_id'),
      classroom_id: formData.get('classroom_id')
    });

    const sendData = async (id: string) => {
      await prisma.attendance.create({
        data: {
          attendance_id: uuidv4(),
          date: new Date(date),
          value: value,
          student_id: id,
          classroom_id: classroom_id
        }
      });
    };

    await Promise.all(
      student_id.map(async (id) => {
        try {
          await sendData(id);
        } catch (error) {
          console.log("Error during process", error);
          throw new Error("Couldn't record attendance");
        }
      })
    );


  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        // Unique constraint failed
        throw new Error('Attendance record for this student on this date already exists.');
      }
    }
    return { error: error.message };
  }

  revalidatePath('/dashboard/attendance/new-attendance');
  revalidatePath('/');
  redirect('/dashboard/attendance/new-attendance');

}

const gradingSchema = z.object({
  grading_id: z.string(),
  period: z.string(),
  year: z.string(),
  listening: z.coerce.number(),
  reading: z.coerce.number(),
  writing: z.coerce.number(),
  speaking: z.coerce.number(),
  grammar_vocab: z.coerce.number(),
  project: z.coerce.number(),
  conversation: z.coerce.number(),
  teacher_comment: z.string(),
  student_id: z.string(),
  classroom_id: z.string()
})

export async function sendGrading(formData: FormData) {

  const {
    grading_id,
    period,
    year,
    listening,
    reading,
    writing,
    speaking,
    grammar_vocab,
    project,
    conversation,
    teacher_comment,
    student_id,
    classroom_id
  } = gradingSchema.parse({
    grading_id: formData.get('grading_id'),
    period: formData.get('period'),
    year: formData.get('year'),
    listening: formData.get('listening'),
    reading: formData.get('reading'),
    writing: formData.get('writing'),
    speaking: formData.get('speaking'),
    grammar_vocab: formData.get('grammar_vocab'),
    project: formData.get('project'),
    conversation: formData.get('conversation'),
    teacher_comment: formData.get('teacher_comment'),
    student_id: formData.get('student_id'),
    classroom_id: formData.get('classroom_id')
  });

  try {
    const attendance = await prisma.grading.create({
      data: {
        grading_id: grading_id,
        period: period,
        year: year,
        listening: listening,
        reading: reading,
        writing: writing,
        speaking: speaking,
        grammar_vocab: grammar_vocab,
        project: project,
        conversation: conversation,
        teacher_comment: teacher_comment,
        student_id: student_id,
        classroom_id: classroom_id
      }
    })

  } catch(error) {
    console.log("Error during process", error)
    return { error: "Couldn't record grading" }
  }

  revalidatePath('/dashboard/grading');
  revalidatePath('/');
  redirect('/dashboard/grading');
}