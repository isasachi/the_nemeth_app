-- CreateTable
CREATE TABLE "_classroomsTostudents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_classroomsTostudents_AB_unique" ON "_classroomsTostudents"("A", "B");

-- CreateIndex
CREATE INDEX "_classroomsTostudents_B_index" ON "_classroomsTostudents"("B");

-- AddForeignKey
ALTER TABLE "_classroomsTostudents" ADD CONSTRAINT "_classroomsTostudents_A_fkey" FOREIGN KEY ("A") REFERENCES "classrooms"("classroom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_classroomsTostudents" ADD CONSTRAINT "_classroomsTostudents_B_fkey" FOREIGN KEY ("B") REFERENCES "students"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;
