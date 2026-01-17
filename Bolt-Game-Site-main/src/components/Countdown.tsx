import { useEffect, useMemo, useState, useCallback } from "react";
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
const Countdown = ({date}) => {
  const targetDate = useMemo(
    () => new Date(`2026-01-${date}T24:00:00`).getTime(),
    []
  );
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
      minutes: Math.floor(difference % (1000 * 60 * 60) / (1000 * 60)),
      seconds: Math.floor(difference % (1000 * 60) / 1000)
    };
  }, [targetDate]);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);
  const TimeUnit = ({
    value,
    label
  }: {
    value: number;
    label: string;
  }) => <div className="flex flex-col items-center">
      <div className="bg-card border-2 border-primary/30 rounded-lg p-4 md:p-6 min-w-[70px] md:min-w-[100px] glow-primary mx-0 px-[5px]">
        <div className="text-3xl md:text-5xl font-heading font-black text-primary">
          {value.toString().padStart(2, "0")}
        </div>
      </div>
      <div className="text-xs md:text-sm font-medium text-muted-foreground mt-2 uppercase tracking-wider">
        {label}
      </div>
    </div>;
  return <div className="flex justify-center gap-2 md:gap-6">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>;
};
export default Countdown;