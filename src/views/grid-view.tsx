import React, { useEffect, useState } from "react";
import MonthComponent from "../components/month-component";

type Month = {
    name: string;
};

function GridView() {
    const [months, setMonths] = useState([] as Month[]);

    useEffect(() => {
        const arr = [] as Month[];
        const tempMonths = [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Joint",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre",
        ];
        for (let index = 0; index < 12; index++) {
            arr.push({
                name: tempMonths[index],
            });
        }
        setMonths(arr);
    }, []);

    return (
        <div className="">
            <div>
                {months.map((m) => (
                    <MonthComponent name={m.name} />
                ))}
            </div>
        </div>
    );
}

export default GridView;
