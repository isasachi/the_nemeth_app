'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '../db/prisma-client';
import { v4 as uuidv4 } from 'uuid';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { signIn } from 'next-auth/react';
import { format } from 'path';

// const createClassroomSchema = z.object({
//   classroom_id: z.string(),
//   name: z.string(),
//   level: z.string(),
//   days: z.string().array(),
//   time: z.string(),
//   schedule: z.string(),
//   teacher_id: z.string(),
//   students: z.array(z.string())
// })

// export async function createClassroom(formData: FormData) {

//   const {
//     classroom_id,
//     name,
//     level,
//     days,
//     time,
//     schedule,
//     teacher_id,
//     students
//   } = createClassroomSchema.parse({
//     classroom_id: formData.get('classroom_id'),
//     name: formData.get('name'),
//     level: formData.get('level'),
//     days: formData.getAll('days'),
//     time: formData.get('time'),
//     schedule: formData.get('schedule'),
//     teacher_id: formData.get('teacher_id'),
//     students: formData.getAll('students')
//   })

//   console.log(students)

//   try {
//     const classroom = await prisma.classrooms.create({
//       data: {
//         classroom_id: classroom_id,
//         name: name,
//         level: level,
//         days: days,
//         time: time,
//         schedule: schedule.split(',').map(date => {
//           return new Date(date)
//         }),
//         teacher_id: teacher_id,
//         }
//     })

//     const classroomStudents = await Promise.all(
//       students.map(async student_id => {
//         return prisma.classroomStudents.create({
//           data: {
//             classroom_id: classroom_id,
//             student_id: student_id
//           }
//         })
//       })
//     )

//   } catch(error) {
//     console.log("Error during process", error)
//     return { error: "Couldn't create classroom" }
//   }

//   revalidatePath('/dashboard/classroom');
//   revalidatePath('/');
//   redirect('/dashboard/classroom');
// }

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

const registerSchema = z.object({
  user_name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(['coordinator', 'board', 'teacher', 'student'])
        .or(z.literal(''))
        .transform((e) => e === '' ? null : e)
        .nullable()
})

export async function register(formData: FormData) {

  const {
    user_name,
    email,
    password,
    role
  } = registerSchema.parse({
    user_name: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role')
  });

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const newUser = await prisma.users.create({
      data: {
        user_name,
        email,
        password: hashedPassword,
        role
      }
    })

  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('An error has ocurred', error);
      return { error: 'User already exists' }
    }
    console.log('An error has ocurred', error);
    return {error: "Couldn't register new user"}
  }

  revalidatePath('/register');
  revalidatePath('/');
  redirect('/login');

}

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
})

export async function login(formData: FormData) {
  try {
    const { username, password } = loginSchema.parse({
      username: formData.get('username'),
      password: formData.get('password')
    })
    const signin = await signIn('credentials', { 
      username,
      password,
      redirect: false
     })
  } catch (error: any) {
    console.error(error)
    }

  revalidatePath('/login')
  revalidatePath('/')
  redirect('/dashboard')

}

const createQuarterSchema = z.object({
  name: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  break_dates: z.string()
})

export async function createQuarter(formData: FormData) {

  const {
    name,
    start_date,
    end_date,
    break_dates
  } = createQuarterSchema.parse({
    name: formData.get('name'),
    start_date: formData.get('start_date'),
    end_date: formData.get('end_date'),
    break_dates: formData.get('break')
  })

  try {
    const quarter = await prisma.quarters.create({
      data: {
        name,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        break: break_dates.split(',').map(date => {
          return new Date(date)
      })}
    })
  } catch (error) {
    console.log(error)
    return { error: "Couldn't create quarter" }
  }

  revalidatePath('/dashboard/quarter/new-quarter')
  revalidatePath('/')
  redirect('/dashboard/quarter')

}