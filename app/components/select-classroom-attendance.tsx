'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";

type propsType = {
    teacher_id: string,
    value: any,
    setValue: Dispatch<SetStateAction<any>>,
}

const ClassroomSelectAttendance: React.FC<propsType> = (props) => {
    
    const [selectedName, setSelectedName] = useState<string>('');
    const [names, setNames] = useState<string[]>([]);
    const { teacher_id, value, setValue } = props;

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`/api/names_id?teacher_id=${teacher_id}`);
            if (!response.ok) {
            throw new Error('Failed to fetch names');
            }
            const namesData = await response.json();
            setNames(namesData);
            console.log(namesData)
        } catch (error) {
            console.error('Error fetching names:', error);
        }
        };

        fetchData();
        
    }, [])

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        setSelectedName(id);
        if (id) {
          try {
            const response = await fetch(`/api/classroom_attendance?classroom_id=${id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const classroom = await response.json();
            setValue(classroom);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        } else {
          setValue({})
        }
      };

    return(
        <div>
            <label>Select a classroom</label>
            <select value={selectedName} onChange={handleChange} className='px-4 py-2 w-full border border-slate-400 rounded-md focus:outline-none focus:border-violet-500' >
                <option value="">Select a classroom</option>
                {names?.map((name:any) => {
                    return(
                        <option value={name?.classroom_id}>{name?.name}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default ClassroomSelectAttendance;