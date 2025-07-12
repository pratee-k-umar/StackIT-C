// "use client";

// import { useState, ChangeEvent } from "react";

// export default function StackItPage(): JSX.Element {
//   const [search, setSearch] = useState<string>("");
//   const [answers, setAnswers] = useState<Record<number, string>>({});
//   const [submittedAnswers, setSubmittedAnswers] = useState<
//     Record<number, string>
//   >({});

//   const handleAnswerChange = (index: number, value: string): void => {
//     setAnswers((prev) => ({ ...prev, [index]: value }));
//   };

//   const handleAnswerSubmit = (index: number): void => {
//     if (answers[index]) {
//       setSubmittedAnswers((prev) => ({ ...prev, [index]: answers[index] }));
//       setAnswers((prev) => ({ ...prev, [index]: "" }));
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-[black] text-white font-sans px-4 py-6">
//       {/* Navbar */}
//       <header className="flex justify-between items-center mb-8 px-4 pb-3 border-b-2 border-purple-300 rounded-xl shadow-md">
//         <h1 className="text-xl font-bold text-purple-300">Q&A Forum</h1>
//         <div className="flex gap-4 items-center">
//           <input
//             type="text"
//             placeholder="Search"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="px-4 py-2 rounded-full text-sm bg-[#2A273C] placeholder-purple-300 border-none focus:outline-none"
//           />
//           <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
//             Add Question
//           </button>
//           <div className="w-8 h-8 bg-purple-300 rounded-full" />
//         </div>
//       </header>

//       {/* Question Feed */}
//       <main className="space-y-10 px-4 md:px-12 lg:px-32">
//         {[1, 2].map((_, index) => (
//           <div
//             key={index}
//             className="bg-[#1A172E] rounded-xl p-6 space-y-4 hover:bg-[#1a172e]/80 transition-all duration-300 ease-in-out"
//           >
//             {/* Question */}
//             <div>
//               <h2 className="font-semibold text-lg text-white">
//                 Remote Team Collaboration
//               </h2>
//               <p className="text-sm text-purple-200">
//                 What are the best practices for remote team collaboration?{" "}
//                 <br />
//                 <span className="text-xs">Asked by Olivia Bennett</span>
//               </p>
//             </div>

//             {/* Answer Textarea */}
//             <textarea
//               placeholder="Write your answer here..."
//               rows={4}
//               className="w-full p-4 rounded-xl bg-[#2A273C] text-white placeholder-purple-400 focus:outline-none"
//               value={answers[index] || ""}
//               onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
//                 handleAnswerChange(index, e.target.value)
//               }
//             ></textarea>

//             <div className="flex justify-end">
//               <button
//                 onClick={() => handleAnswerSubmit(index)}
//                 className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-full font-semibold"
//               >
//                 Submit Answer
//               </button>
//             </div>

//             {/* Submitted Answer */}
//             {submittedAnswers[index] && (
//               <div className="mt-6">
//                 <h3 className="text-white font-semibold text-base mb-2">
//                   Answers
//                 </h3>
//                 <div className="flex items-start gap-3">
//                   <div className="w-8 h-8 bg-purple-300 rounded-full" />
//                   <div>
//                     <p className="font-semibold text-white text-sm">You</p>
//                     <p className="text-sm text-purple-200 mt-1">
//                       {submittedAnswers[index]}
//                     </p>
//                     <div className="flex items-center gap-2 mt-2 text-purple-400 text-xs">
//                       <span>👍 0</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </main>
//     </div>
//   );
// }
"use client";

import { useState, ChangeEvent } from "react";

interface Question {
  title: string;
  description: string;
  tags: string;
}

export default function StackItPage(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<
    Record<number, string>
  >({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      title: "Remote Team Collaboration",
      description: "What are the best practices for remote team collaboration?",
      tags: "team, remote, collaboration",
    },
    {
      title: "State Management in React",
      description:
        "How to effectively manage state in large React applications?",
      tags: "react, state, redux",
    },
  ]);

  const handleAnswerChange = (index: number, value: string): void => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleAnswerSubmit = (index: number): void => {
    if (answers[index]) {
      setSubmittedAnswers((prev) => ({ ...prev, [index]: answers[index] }));
      setAnswers((prev) => ({ ...prev, [index]: "" }));
    }
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = { title, description, tags };
    setQuestions((prev) => [...prev, newQuestion]);
    setTitle("");
    setDescription("");
    setTags("");
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[black] text-white font-sans px-4 py-6">
      {/* Modal for Add Question */}
      {isModalOpen && (
        <div className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/10 border border-purple-700 backdrop-blur-lg rounded-xl p-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-purple-300 mb-4">
              Add a New Question
            </h2>
            <div className="mb-4">
              <label className="block mb-2 text-purple-200">Title</label>
              <input
                type="text"
                placeholder="Enter question title"
                className="w-full p-3 rounded-lg bg-[#2A273C] text-white placeholder-purple-400 focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-purple-200">Description</label>
              <textarea
                rows={4}
                placeholder="Describe your question..."
                className="w-full p-3 rounded-lg bg-[#2A273C] text-white placeholder-purple-400 focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-purple-200">Tags</label>
              <input
                type="text"
                placeholder="e.g. react, javascript, nextjs"
                className="w-full p-3 rounded-lg bg-[#2A273C] text-white placeholder-purple-400 focus:outline-none"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddQuestion}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <header className="flex justify-between items-center mb-8 px-4 pb-3 border-b-2 border-purple-300 rounded-xl shadow-md">
        <h1 className="text-xl font-bold text-purple-300">Q&A Forum</h1>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-full text-sm bg-[#2A273C] placeholder-purple-300 border-none focus:outline-none"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            Add Question
          </button>
          <div className="w-8 h-8 bg-purple-300 rounded-full" />
        </div>
      </header>

      {/* Question Feed */}
      <main className="space-y-10 px-4 md:px-12 lg:px-32">
        {questions.map((question, index) => (
          <div key={index} className="bg-[#1A172E] rounded-xl p-6 space-y-4">
            {/* Question */}
            <div>
              <h2 className="font-semibold text-lg text-white">
                {question.title}
              </h2>
              <p className="text-sm text-purple-200">
                {question.description} <br />
                <span className="text-xs">Asked by Olivia Bennett</span>
              </p>
            </div>

            {/* Answer Textarea */}
            <textarea
              placeholder="Write your answer here..."
              rows={4}
              className="w-full p-4 rounded-xl bg-[#2A273C] text-white placeholder-purple-400 focus:outline-none"
              value={answers[index] || ""}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleAnswerChange(index, e.target.value)
              }
            ></textarea>

            <div className="flex justify-end">
              <button
                onClick={() => handleAnswerSubmit(index)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-full font-semibold"
              >
                Submit Answer
              </button>
            </div>

            {/* Submitted Answer */}
            {submittedAnswers[index] && (
              <div className="mt-6">
                <h3 className="text-white font-semibold text-base mb-2">
                  Answers
                </h3>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-300 rounded-full" />
                  <div>
                    <p className="font-semibold text-white text-sm">You</p>
                    <p className="text-sm text-purple-200 mt-1">
                      {submittedAnswers[index]}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-purple-400 text-xs">
                      <span>👍 0</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
