"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../../../@/components/ui/dialog.jsx";
import { Input } from "../../../@/components/ui/input";
import { Button } from "../../../@/components/ui/button";
import { Textarea } from "../../../@/components/ui/textarea";
import { chatSession } from "../../../utils/GeminiAi.js";
import { LoaderCircle, SignalHighIcon } from "lucide-react";


import { v4 as uuidv4 } from "uuid";
import { db } from "../../../utils/db.js";
import { MockInterview } from "../../../utils/schema.js";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview({ jobTitle = "", jobDescription = "" }) {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  console.log(jobTitle);
  useEffect(() => {
    if (jobTitle) {
      setJobPosition(jobTitle);
      setOpenDialog(true);
    }
    if (jobDescription) {
      setJobDesc(jobDescription);
      setOpenDialog(true);
    }
  }, [jobTitle, jobDescription]);

  const { user } = useUser();

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("Job Details : ", jobDesc, jobExperience, jobPosition);

    const InputPrompt = `Job Position: ${jobPosition} , Job Description: ${jobDesc} , Job Experience: ${jobExperience} Depends on Job Position , Job Description and Job Experience give us 10 interview questions that can be asked in an Interview along with probable answers to that questions in JSON format.Give us questions and answer field on JSON`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MOCKJSONResponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", "")
        .trim();
      console.log(JSON.parse(MOCKJSONResponse));

      setJsonResponse(MOCKJSONResponse);

      if (MOCKJSONResponse) {
        const res = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MOCKJSONResponse,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
          })
          .returning({ mockId: MockInterview.mockId });
        console.log("Inserted ", res);
        if (res) {
          setOpenDialog(false);
          router.push("/dashboard/interview/" + res[0]?.mockId);
        }
      } else {
        console.log("Error inserting in Database");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error generating response:", error);
      setLoading(false);
    }

    // setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h1 className="font-bold text-lg text-center">+ Add New</h1>
      </div>
      <Dialog open={openDailog} onOpenChange={setOpenDialog}>
        <DialogContent className="fixed inset-48 flex items-center justify-center p-4">
          <div
          className="bg-white rounded-lg shadow-lg "
          >
            <DialogHeader>
              <DialogTitle
              className="font-bold text-2xl"
              >
                Tell us more about your job Interviewing
              </DialogTitle>

              <DialogDescription>
                <form onSubmit={onSubmit} className="p-6">
                  <div>
                    <p>
                      Add details about your job position/role, job description,
                      and years of experience
                    </p>
                    <div className="mt-7 my-3">
                      <label className="block text-sm font-medium">
                        Job Role/Job Position
                      </label>
                      <Input
                        placeholder="Ex. Full Stack Developer"
                        required
                        value={jobPosition}
                        onChange={(e) => setJobPosition(e.target.value)}
                      />
                    </div>
                    <div className="my-3">
                      <label className="block text-sm font-medium">
                        Job Description/Tech Stack (In short)
                      </label>
                      <Textarea
                        placeholder="Ex. React, Angular, NodeJs, MySql etc"
                        required
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                      />
                    </div>
                    <div className="my-3">
                      <label className="block text-sm font-medium">
                        Years of Experience
                      </label>
                      <Input
                        placeholder="Ex. 0-5 years"
                        // type="number"
                        // min="1"
                        // max="70"
                        required
                        onChange={(e) => setJobExperience(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-5 justify-end">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <LoaderCircle className="animate-spin" /> Generating
                          from AI
                        </>
                      ) : (
                        "Start Interview"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>

      
    </div>
  );
}

export default AddNewInterview;
