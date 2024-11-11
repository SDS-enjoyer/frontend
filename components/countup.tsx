"use client";
import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  value: number; // Define the type of value as a number
}

const CountUp: React.FC<CountUpProps> = ({ value }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // Track if the element is visible
  const ref = useRef<HTMLDivElement>(null); // Ref to the component

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const duration = 2000; // Duration of the animation in milliseconds
      const increment = (value / duration) * 10; // Control speed of the count

      const animateCount = () => {
        start += increment;
        if (start < value) {
          setCount(Math.floor(start));
          requestAnimationFrame(animateCount);
        } else {
          setCount(value); // Ensure we reach the exact value
        }
      };

      animateCount();
    }
  }, [isVisible, value]);

  return (
    <div ref={ref}>
      <dd className="text-5xl font-semibold tracking-tight text-gray-900">
        {count}
      </dd>
    </div>
  );
};

export default CountUp;
