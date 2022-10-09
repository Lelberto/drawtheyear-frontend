import React, { useEffect, useState } from "react";

type Day = {
    nb: number;
};

type Month = {
    name: string;
};

export default function MonthComponent({ name }: Month) {
    const [day, setDay] = useState([] as Day[]);

    useEffect(() => {
        const arr = [] as Day[];
        for (let index = 1; index < 31; index++) {
            arr.push({
                nb: index,
            });
        }
        setDay(arr);
    }, []);

    return (
        <div className="p-10 mx-36 my-0">
            <div className="p-5 text-2xl text-white font-semibold">{name}</div>
            <div className="grid grid-cols-8 grid-flow-row gap-4 skew-x-12">
                {day.map((d) => (
                    <DayComponent nb={d.nb} />
                ))}
            </div>
        </div>
    );
}

function DayComponent(day: Day) {
    return (
        <div className="border-solid border-2 border-sky-500 rounded-md">
            <div className="text-lg text-white text-center font-semibold">
                {day.nb}
            </div>
        </div>
    );
}
