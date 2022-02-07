/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import * as dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
const Timer = ({ time }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const remaindate = dayjs.utc(time ).format();

  //   const date = `${remaindate.slice(
  //     0,
  //     remaindate.length - 1
  //   )}.000+0000", "YYYY-MM-DDTHH:mm:ss.000ZZ`;
  //   console.log(days, hours, remaindate, date);
  const difference =
    +dayjs.utc(
      `${remaindate.slice(0, remaindate.length - 1)}.000+0000`,
      "YYYY-MM-DDTHH:mm:ss.000ZZ"
    ) - +new Date();

  useEffect(() => {
    const id = setTimeout(() => {
      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((difference / 1000 / 60) % 60));
        setSeconds(Math.floor((difference / 1000) % 60));
      }
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  return (
    <div>
      <p>
        {days} Days {hours} hours
      </p>
    </div>
  );
};

export default Timer;
