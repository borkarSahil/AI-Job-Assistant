"use client";

import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../../../../../../@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { chatSession } from "../../../../../../utils/GeminiAi.js";
import { db } from "../../../../../../utils/db";
import { UserAnswer } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswer({
  mockInterviewQuestion = [],
  activeQuestionIndex,
  interviewData,
}) {
  console.log("Data : ", mockInterviewQuestion);
  const questionText = mockInterviewQuestion[activeQuestionIndex + 1]?.question;
  // console.log(questionText);
  console.log("@", mockInterviewQuestion[activeQuestionIndex]?.question);

  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording) {
      UpdateAnswer();
    }
  }, [userAnswer]);

  const UpdateAnswer = async () => {
    setLoading(true);
    // console.log("@", mockInterviewQuestion[activeQuestionIndex]?.question);
    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, UserAnswer: ${userAnswer}. Depend on the answer to the question, give a rating out of 10 and provide feedback in JSON format with rating and feedback fields.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);

      const MOCKJSONResponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", "")
        .trim();

      const JsonfeedbackResp = JSON.parse(MOCKJSONResponse);
      console.log("Json data : ", JSON.parse(MOCKJSONResponse));

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonfeedbackResp?.feedback,
        rating: JsonfeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      if (resp) {
        //    toast("User Answer recorded successfully");
        console.log(" Record response Successfully");
      } else {
        console.log(" Record response failed");
      }
      setResults([]);
      setUserAnswer("");
      setLoading(false);
    } catch (error) {
      console.error("Error Record response:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-cente items-center flex-col">
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5">
        Image
        <Webcam
          style={{ height: 300, width: "100%", zIndex: 10 }}
          mirrored={true}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 items-center animate-pulse flex gap-2">
            <StopCircle /> Stop Recording...
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>

      {/* 
        To Display what we are speaking
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
      <Button onClick={() => console.log("------", userAnswer)}>
        Show User Answer
      </Button> 
      */}
    </div>
  );
}

export default RecordAnswer;
