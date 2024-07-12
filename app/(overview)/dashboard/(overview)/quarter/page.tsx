'use client'

import NavButton from "@/app/components/nav-button";
import { useEffect } from 'react';
import { useQuarter } from '@/app/context/quarterContext';
import { toast } from "react-hot-toast";

const fetchQuartersData = async () => {
    try {
        const response = await fetch('/api/quarters');
        if (!response.ok) {
        throw new Error('Failed to fetch quarters');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching quarters:', error);
}
}

export default function Page() {
  const { quarters, setQuarters, setSelectedQuarter } = useQuarter();

  useEffect(() => {
    const getData = async () => {
      const quartersData = await fetchQuartersData();
      setQuarters(quartersData);
    };

    getData();
  }, [setQuarters]);

  const handleSetSelectedQuarter = (quarter: any) => {
    setSelectedQuarter(quarter);
    toast.success(`${quarter.name} has been selected`)
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Quarters</h1>
      <div className="flex flex-row justify-end items-center">
        <div className="mr-2 mb-2">
          <NavButton text="Add New" linkPath="quarter/new-quarter" />
        </div>
      </div>
      <div className="flex flex-col space-y-6 pt-8 pb-8 md:hidden">
        {quarters.map((data) => (
          <div className="p-2 bg-slate-100 border rounded-md">
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="flex flex-col justify-center items-center">
                <p className="text-lg font-semibold">{data.name}</p>
                <span className="text-xs">Start Date: {new Date(data.start_date).toDateString()}</span>
                <span className="text-xs">End Date: {new Date(data.end_date).toDateString()}</span>
              </div>
              <p className="text-sm text-center">
                <span className="text-red-500">Break: </span>
                {data.break.map((date) => `${new Date(date).toDateString()} `)}
              </p>
              <div className="self-center space-x-2">
                <NavButton text="Edit" linkPath="" />
                <button 
                    onClick={() => handleSetSelectedQuarter(data)}
                    className="bg-violet-500 hover:bg-violet-600 text-sm text-white font-semibold py-2 px-4 rounded"    
                >Select</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <table className="hidden w-full divide-y divide-gray-200 md:table">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Break
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quarters.map((data) => (
              <tr>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{data.name}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{new Date(data.start_date).toDateString()}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{new Date(data.end_date).toDateString()}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">{data.break.map((date) => `${new Date(date).toDateString()} `)}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <NavButton text="Edit" linkPath="" />
                  <button 
                    onClick={() => handleSetSelectedQuarter(data)}
                    className="ml-2 bg-violet-500 hover:bg-violet-600 text-sm text-white font-semibold py-2 px-4 rounded"
                    >Select</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
