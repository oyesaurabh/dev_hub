"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useCreateFeedback, FeedbackInput } from "@/hooks/useFeedback";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const FeedbackForm = () => {
  const { mutate: createFeedback, isPending } = useCreateFeedback();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() && !description.trim()) {
      setError(true);
      setTimeout(() => setError(false), 5000);
      return;
    }
    const feedbackData: FeedbackInput = { title, description };
    createFeedback(feedbackData);
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 border rounded-xl border-zinc-700 p-4"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold">Feedback</h2>
        <p className="text-sm text-zinc-400">
          Request a feature or report a bug.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Input
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="relative">
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={isPending} variant={"secondary"}>
        {isPending ? (
          <div className="flex items-center justify-center">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : (
          "Submit Feedback"
        )}
      </Button>
    </form>
  );
};

export default FeedbackForm;
