import AskQues from "@/components/AskQues";
import QA from "@/components/QA";
import React from "react";

const Page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-5xl">
        <AskQues />
        <QA />
      </div>
    </main>
  );
};

export default Page;
