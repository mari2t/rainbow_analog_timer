"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type ColorSegment = {
  color: string;
  start: number;
  end: number;
};

type ColorPattern = ColorSegment[];

const colorPatterns: { name: string; pattern: ColorPattern }[] = [
  {
    name: "Pastel",
    pattern: [
      { color: "#9ea6e9", start: 75, end: 100 },
      { color: "#9cefc0", start: 50, end: 75 },
      { color: "#e7f569", start: 25, end: 50 },
      { color: "#f5bd98", start: 0, end: 25 },
    ],
  },
  {
    name: "Tropical",
    pattern: [
      { color: "#40E0D0", start: 75, end: 100 },
      { color: "#aaff00", start: 50, end: 75 },
      { color: "#ffea00", start: 25, end: 50 },
      { color: "#ff8447", start: 0, end: 25 },
    ],
  },
  {
    name: "Dark",
    pattern: [
      { color: "#4682B4", start: 75, end: 100 },
      { color: "#556B2F", start: 50, end: 75 },
      { color: "#DAA520", start: 25, end: 50 },
      { color: "#8B0000", start: 0, end: 25 },
    ],
  },
  {
    name: "Monotone",
    pattern: [
      { color: "#000000", start: 75, end: 100 },
      { color: "#000000", start: 50, end: 75 },
      { color: "#000000", start: 25, end: 50 },
      { color: "#000000", start: 0, end: 25 },
    ],
  },
];

export default function RainbowAnalogTimer() {
  const [isClient, setIsClient] = useState(false);
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timerName, setTimerName] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [maxTime, setMaxTime] = useState<number>(3600);
  const [inputMinutes, setInputMinutes] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [colorPattern, setColorPattern] = useState<ColorPattern>(
    colorPatterns[0].pattern
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [displayedTimerName, setDisplayedTimerName] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout);
            setIsRunning(false);
            setShowAlert(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, time]);

  const startTimer = () => {
    if (time > 0) {
      setIsRunning(true);
      setError(null);
    } else {
      setError("タイマーを開始するには、1分以上の時間を設定してください。");
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    setError(null);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(maxTime);
    setError(null);
  };

  const setTimerMinutes = (minutes: string | number) => {
    try {
      const parsedMinutes =
        typeof minutes === "string" ? parseInt(minutes, 10) : minutes;
      setInputMinutes(parsedMinutes.toString());
      if (isNaN(parsedMinutes)) {
        setMaxTime(0);
        setTime(0);
        setError("無効な入力です。1から60の間の数字を入力してください。");
      } else {
        const newTime = Math.min(Math.max(parsedMinutes, 1), 60) * 60;
        setMaxTime(newTime);
        setTime(newTime);
        setError(null);
      }
    } catch (err) {
      console.error("Error setting timer minutes:", err);
      setError("タイマーの設定中にエラーが発生しました。");
    }
  };

  const formatTime = (seconds: number): string => {
    if (seconds === 0 || typeof seconds !== "number") return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const presetButtonsRow1 = [5, 15, 25, 45];

  const percentage = (time / maxTime) * 100;

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  //　タイマー名変更関数
  const handleChangeTimerName = () => {
    setDisplayedTimerName(timerName);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {displayedTimerName || "4色タイマー"}
        </h1>
        <div className="relative w-64 h-64 mx-auto mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#ebe9e9"
              strokeWidth="16"
            />
            {colorPattern.map((segment, index) => {
              const startAngle = 360 * (segment.start / 100);
              const endAngle = 360 * (Math.min(percentage, segment.end) / 100);
              if (startAngle < endAngle) {
                return (
                  <path
                    key={index}
                    d={describeArc(50, 50, 40, startAngle, endAngle)}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="16"
                  />
                );
              }
              return null;
            })}
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">
            {formatTime(time)}
          </div>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="timerMinutes"
            className="block text-sm font-semibold text-gray-700"
          >
            タイマー設定（1-60分）
          </Label>
          <Input
            id="timerMinutes"
            type="number"
            min="1"
            max="60"
            value={inputMinutes}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTimerMinutes(e.target.value)
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            disabled={isRunning}
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-center gap-2 mb-2">
            {presetButtonsRow1.map((minutes) => (
              <Button
                key={minutes}
                onClick={() => setTimerMinutes(minutes)}
                disabled={isRunning}
                className="w-12 h-12 border-2 bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-100 disabled:opacity-50"
              >
                {minutes}
              </Button>
            ))}
          </div>
        </div>
        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        <div className="flex justify-center space-x-2">
          <Button
            onClick={startTimer}
            disabled={isRunning || time === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            開始
          </Button>
          <Button
            onClick={stopTimer}
            disabled={!isRunning}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            停止
          </Button>
          <Button
            onClick={resetTimer}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            リセット
          </Button>
        </div>
        <div className="mt-12 mb-4">
          <Label
            htmlFor="colorPattern"
            className="block text-sm font-semibold text-gray-700"
          >
            オプション：タイマー色設定
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2">
            {colorPatterns.map((patternObj, index) => (
              <Button
                key={index}
                onClick={() => setColorPattern(patternObj.pattern)}
                className="w-full h-16 p-1 overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 border-[0.2px]"
              >
                <div className="w-full h-full flex flex-col">
                  <div className="flex-grow flex">
                    {patternObj.pattern.map((segment, segmentIndex) => (
                      <div
                        key={segmentIndex}
                        className="flex-grow"
                        style={{ backgroundColor: segment.color }}
                      />
                    ))}
                  </div>
                  <div className="text-xs font-medium text-center py-1 bg-white text-gray-800">
                    {patternObj.name}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>{" "}
        <Label
          htmlFor="colorPattern"
          className="block text-sm font-semibold text-gray-700"
        >
          オプション：タイマー名を設定
        </Label>
        <div className="flex items-center space-x-2">
          <Input
            id="timerName"
            type="text"
            value={timerName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTimerName(e.target.value)
            }
            placeholder="タイマー名を入力"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            disabled={isRunning}
          />
          <Button
            onClick={handleChangeTimerName}
            disabled={isRunning}
            className="mt-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            変更
          </Button>
        </div>
      </div>
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>タイマー終了！</AlertDialogTitle>
            <AlertDialogDescription>
              {displayedTimerName
                ? `${displayedTimerName}のタイマーが終了しました。`
                : "タイマーが終了しました。"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlert(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
