import { useEffect, useState } from "react";

/**
 *  @name useCountdown
 *  @description custom hook to manage countdown.
 *  @param {string} dayMonth - date in string format 'mm/dd/yyyy'.
 *  @returns {object} return an object with date.
 */
export const useCountdown = (dayMonth) => {
    const [timeRemaining, setTimeRemaining] = useState({});
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = `${mm}/${dd}/${yyyy}`;
    const countDown = new Date(dayMonth).getTime();

    useEffect(() =>{
        const x = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDown - now;
            const remaining = {
                days: Math.floor(distance / (day)),
                hours: Math.floor((distance % (day)) / (hour)),
                minutes: Math.floor((distance % (hour)) / (minute)),
                seconds: Math.floor((distance % (minute)) / second)
            }
            setTimeRemaining(remaining)
            if (distance < 0) clearInterval(x)
        }, 1000);
    }, [])
    return timeRemaining;
}
