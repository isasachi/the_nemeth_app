'use client';

import DatePicker, { Value } from "react-multi-date-picker";
import { createQuarter } from "@/app/lib/actions";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Page: React.FC = () => {

    const [startDate, setStartDate] = useState<Value>('');
    const [endDate, setEndDate] = useState<Value>('');
    const [breakDate, setBreakDate] = useState<Value>([]);

    const handleCreateQuarter = async (formData: FormData) => {
        const res = await createQuarter(formData);
        if (res?.error) {
          toast.error(res.error)
        } else {
          toast.success('Quarter created successfully')
        }
      }

    return(
        <div className="mt-6 pb-6 mx-2 text-sm md:max-w-[450px] md:mx-auto">
            <h2 className="text-xl font-semibold mb-5">Create Quarter</h2>
            <form action={handleCreateQuarter} className="flex flex-col grow space-y-5">
                <label htmlFor="name">
                    Name  
                </label>
                <input name="name" type="text" className="px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500"/>
                <label htmlFor="start_date">
                    Start Date
                </label>
                <DatePicker
                        value={startDate}
                        onChange={setStartDate} 
                        name="start_date"
                        format='MMMM DD YYYY'
                        sort
                        className='purple'
                        inputClass='px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500'
                    />
                <label htmlFor="end_date">
                    End Date
                </label>
                <DatePicker
                        value={endDate}
                        onChange={setEndDate} 
                        name="end_date"
                        format='MMMM DD YYYY'
                        sort
                        className='purple'
                        inputClass='px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500'
                    />
                <label htmlFor="break">
                    Break
                </label>
                <DatePicker
                        value={breakDate}
                        onChange={setBreakDate}
                        name="break"
                        format='MMMM DD YYYY'
                        multiple
                        sort
                        className='purple'
                        inputClass='px-4 py-2 w-full border rounded-md border-slate-400 focus:outline-none focus:border-violet-500'
                    />
                    <input 
                        type="submit" 
                        value="Create" 
                        className="w-full px-4 py-2 bg-violet-500 text-white font-bold rounded-md hover:bg-violet-600 focus:outline-none focus:bg-violet-600" 
                />
            </form>
        </div>
    )
}

export default Page;