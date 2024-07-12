import prisma from "../db/prisma-client";

const fetchClassrooms = async () => {
    const classrooms = await prisma.classrooms.findMany();
    console.log(classrooms)
    return classrooms;
}

const fetchClassroomsByTeacher = async (teacher_id:string) => {
    const classrooms = await prisma.classrooms.findMany({
        where: {
            teacher_id: teacher_id
        }
    });
    return classrooms;
}

const fetchClassroomById = async (classroom_id:string) => {
    const classroom = await prisma.classrooms.findUnique({
        where: {
            classroom_id: classroom_id
        }
    });
    console.log(classroom);
    return classroom;
}

const fetchClassroomByName = async (name:string) => {
    const classroom = await prisma.classrooms.findFirst({
        where: {
            name: name
        }
    });
    console.log(classroom);
    return classroom;
}

const fetchClassroomsNames = async (teacher_id:string) => {
    const names = await prisma.classrooms.findMany({
        select: {
            name: true
        },
        where: {
            teacher_id
        }
    });
    return names.map(name => name.name);
}

const fetchteacherId = async (email:string) => {
    const teacher_id = prisma.users.findUnique({
        where: {
            email: email,
          },
          select: {
            teachers: {
              select: {
                teacher_id: true,
              },
            },
          },
    })
    return teacher_id;
}

export {
    fetchClassrooms,
    fetchClassroomsByTeacher,
    fetchClassroomById,
    fetchClassroomByName,
    fetchClassroomsNames,
    fetchteacherId
};