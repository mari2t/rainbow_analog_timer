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

// 直接型を指定 空のインターフェースだとエラーが出たので変更
export default function RainbowAnalogTimer() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timerName, setTimerName] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [maxTime, setMaxTime] = useState<number>(3600);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
      setShowAlert(true);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, time]);

  const startTimer = () => {
    if (time > 0) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const setTimerMinutes = (minutes: string) => {
    const parsedMinutes = parseInt(minutes, 10);
    if (minutes === "" || isNaN(parsedMinutes)) {
      setMaxTime(0);
      setTime(0);
    } else {
      const newTime = Math.min(parsedMinutes * 60, 3600);
      setMaxTime(newTime);
      setTime(newTime);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Rainbow Analog Timer
        </h1>
        <div className="relative w-64 h-64 mx-auto mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#rainbow)"
              strokeWidth="10"
              strokeDasharray="282.7"
              strokeDashoffset={
                maxTime > 0 ? 282.7 - (282.7 * time) / maxTime : 282.7
              }
              transform="rotate(-90 50 50)"
              className="transition-all duration-1000 ease-linear"
            />
            <defs>
              <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff0000" />
                <stop offset="16.67%" stopColor="#ff8000" />
                <stop offset="33.33%" stopColor="#ffff00" />
                <stop offset="50%" stopColor="#00ff00" />
                <stop offset="66.67%" stopColor="#0000ff" />
                <stop offset="83.33%" stopColor="#8000ff" />
                <stop offset="100%" stopColor="#ff0080" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">
            {formatTime(time)}
          </div>
        </div>
        <div className="mb-4">
          <Label
            htmlFor="timerName"
            className="block text-sm font-medium text-gray-700"
          >
            タイマー名
          </Label>
          <Input
            id="timerName"
            type="text"
            value={timerName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTimerName(e.target.value)
            }
            placeholder="タイマー名を入力"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="timerMinutes"
            className="block text-sm font-medium text-gray-700"
          >
            タイマー設定（分）
          </Label>
          <Input
            id="timerMinutes"
            type="number"
            min="0"
            max="60"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTimerMinutes(e.target.value)
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
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
      </div>
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>タイマー終了！</AlertDialogTitle>
            <AlertDialogDescription>
              {timerName
                ? `${timerName}のタイマーが終了しました。`
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
