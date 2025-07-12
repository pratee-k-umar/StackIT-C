"use client"

import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

interface Answer {
  id: string;
  author: string;
  authorTitle: string;
  content: string;
  upvotes: number;
  timestamp: string;
  isUpvoted: boolean;
  isDownvoted: boolean;
}

interface Question {
  id: string;
  title: string;
  tags: string[];
  answers: Answer[];
  totalAnswers: number;
  followers: number;
}

const data: Question[] = [
  {
    id: "1",
    title: "What are the best practices for React performance optimization?",
    tags: ["React", "JavaScript", "Performance", "Web Development"],
    totalAnswers: 12,
    followers: 245,
    answers: [
      {
        id: "1-1",
        author: "Sarah Chen",
        authorTitle: "Senior Frontend Engineer at Meta",
        content:
          "React performance optimization involves several key strategies:\n\n1. **Use React.memo() for functional components** - This prevents unnecessary re-renders when props haven't changed.\n\n2. **Implement useMemo() and useCallback()** - These hooks help optimize expensive calculations and prevent function recreation on every render.\n\n3. **Code splitting with React.lazy()** - Load components only when needed to reduce initial bundle size.\n\n4. **Virtual scrolling for large lists** - Use libraries like react-window for rendering large datasets efficiently.\n\n5. **Optimize state management** - Keep state as local as possible and avoid unnecessary global state updates.\n\nThese techniques can significantly improve your app's performance, especially as it scales.",
        upvotes: 156,
        timestamp: "2 days ago",
        isUpvoted: false,
        isDownvoted: false,
      },
      {
        id: "1-2",
        author: "Mike Rodriguez",
        authorTitle: "Full Stack Developer",
        content:
          "Building on Sarah's answer, I'd also recommend:\n\n• **Use the React DevTools Profiler** to identify performance bottlenecks\n• **Implement proper key props** when rendering lists\n• **Consider using Suspense** for better loading states\n• **Bundle analysis** with tools like webpack-bundle-analyzer\n\nOne thing that really helped our team was setting up performance budgets and monitoring core web vitals in production.",
        upvotes: 89,
        timestamp: "1 day ago",
        isUpvoted: true,
        isDownvoted: false,
      },
    ],
  },
  {
    id: "2",
    title: "How do you handle state management in large React applications?",
    tags: ["React", "State Management", "Redux", "Context API"],
    totalAnswers: 8,
    followers: 189,
    answers: [
      {
        id: "2-1",
        author: "Alex Thompson",
        authorTitle: "Lead Developer at Stripe",
        content:
          "For large React applications, I recommend a layered approach to state management:\n\n**Local State**: Use useState and useReducer for component-specific state that doesn't need to be shared.\n\n**Context API**: Perfect for theme, authentication, and other app-wide settings that don't change frequently.\n\n**Redux/Zustand**: For complex state logic, time-travel debugging, and when you need predictable state updates across the app.\n\n**Server State**: Use React Query or SWR for caching and synchronizing server data.\n\nThe key is choosing the right tool for each type of state rather than forcing everything into one solution.",
        upvotes: 203,
        timestamp: "3 days ago",
        isUpvoted: false,
        isDownvoted: false,
      },
    ],
  },
  {
    id: "3",
    title: "What are the differences between TypeScript and JavaScript?",
    tags: ["TypeScript", "JavaScript", "Programming Languages"],
    totalAnswers: 15,
    followers: 412,
    answers: [
      {
        id: "3-1",
        author: "Emily Watson",
        authorTitle: "TypeScript Team Member at Microsoft",
        content:
          "Great question! Here are the key differences:\n\n**Type Safety**: TypeScript adds static typing, catching errors at compile time rather than runtime.\n\n**Better IDE Support**: Enhanced autocomplete, refactoring, and navigation thanks to type information.\n\n**Modern JavaScript Features**: TypeScript supports latest ECMAScript features and compiles to older JavaScript versions.\n\n**Interfaces and Advanced Types**: Union types, generics, and interfaces provide powerful abstraction capabilities.\n\n**Gradual Adoption**: You can incrementally adopt TypeScript in existing JavaScript projects.\n\nThe learning curve is worth it for larger projects where type safety becomes crucial.",
        upvotes: 287,
        timestamp: "5 days ago",
        isUpvoted: true,
        isDownvoted: false,
      },
      {
        id: "3-2",
        author: "David Kumar",
        authorTitle: "Software Engineer",
        content:
          "To add to Emily's comprehensive answer:\n\n**Compilation Step**: TypeScript needs to be compiled to JavaScript, adding a build step to your workflow.\n\n**Learning Curve**: There's additional syntax and concepts to learn, especially around advanced types.\n\n**Runtime vs Compile Time**: Types are erased at runtime, so you still need runtime validation for external data.\n\n**Team Benefits**: Types serve as documentation and make code more maintainable in team environments.\n\nFor small projects, vanilla JavaScript might be sufficient, but TypeScript really shines in larger, long-term projects.",
        upvotes: 124,
        timestamp: "4 days ago",
        isUpvoted: false,
        isDownvoted: false,
      },
    ],
  },
  {
    id: "4",
    title: "How do you implement authentication in a React app?",
    tags: ["React", "Authentication", "Security", "JWT"],
    totalAnswers: 6,
    followers: 156,
    answers: [
      {
        id: "4-1",
        author: "Jennifer Lee",
        authorTitle: "Security Engineer at Auth0",
        content:
          "Authentication in React apps typically involves several components:\n\n**1. Authentication Provider**: Create a context to manage auth state globally.\n\n**2. Protected Routes**: Implement route guards that redirect unauthenticated users.\n\n**3. Token Management**: Store JWT tokens securely (httpOnly cookies preferred over localStorage).\n\n**4. Automatic Token Refresh**: Implement logic to refresh tokens before they expire.\n\n**5. Logout Handling**: Clear tokens and redirect appropriately.\n\n**Security Best Practices**:\n- Use HTTPS in production\n- Implement proper CORS policies\n- Validate tokens on the server\n- Use secure cookie flags\n\nConsider using established solutions like Auth0, Firebase Auth, or AWS Cognito for production apps.",
        upvotes: 198,
        timestamp: "1 week ago",
        isUpvoted: false,
        isDownvoted: false,
      },
    ],
  },
];

export default function QA() {
  const [questions, setQuestions] = useState<Question[]>(data);

  const handleVote = (
    questionId: string,
    answerId: string,
    voteType: "up" | "down"
  ) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((a) =>
                a.id === answerId
                  ? {
                      ...a,
                      isUpvoted: voteType === "up" ? !a.isUpvoted : false,
                      isDownvoted: voteType === "down" ? !a.isDownvoted : false,
                      upvotes:
                        voteType === "up"
                          ? a.isUpvoted
                            ? a.upvotes - 1
                            : a.upvotes + 1
                          : a.isDownvoted
                          ? a.upvotes + 1
                          : a.upvotes - 1,
                    }
                  : a
              ),
            }
          : q
      )
    );
  };

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-4xl mx-auto space-y-6">

        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
          >
            {/* Question Header */}
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold mb-3 text-white hover:text-blue-400 transition-colors cursor-pointer">
                {question.title}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Question Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{question.totalAnswers} answers</span>
                <span>•</span>
                <span>{question.followers} followers</span>
              </div>
            </div>

            {/* Answers */}
            <div className="divide-y divide-gray-700">
              {question.answers.map((answer) => (
                <div key={answer.id} className="p-6">
                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {answer.author.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {answer.author}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {answer.authorTitle}
                      </p>
                    </div>
                    <div className="ml-auto text-sm text-gray-400">
                      {answer.timestamp}
                    </div>
                  </div>

                  {/* Answer Content */}
                  <div className="mb-4 text-gray-300 leading-relaxed whitespace-pre-line">
                    {answer.content}
                  </div>

                  {/* Answer Actions */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVote(question.id, answer.id, "up")}
                        className={`p-2 rounded-full transition-colors ${
                          answer.isUpvoted
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        <ChevronUp size={16} />
                      </button>
                      <span className="text-sm font-medium text-gray-300">
                        {answer.upvotes}
                      </span>
                      <button
                        onClick={() =>
                          handleVote(question.id, answer.id, "down")
                        }
                        className={`p-2 rounded-full transition-colors ${
                          answer.isDownvoted
                            ? "bg-red-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>

                    <button className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors">
                      <MessageCircle size={16} />
                      <span className="text-sm">Comment</span>
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors">
                      <Share2 size={16} />
                      <span className="text-sm">Share</span>
                    </button>

                    <button className="p-2 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors">
                      <Bookmark size={16} />
                    </button>

                    <button className="p-2 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 transition-colors ml-auto">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Answers */}
            {question.totalAnswers > question.answers.length && (
              <div className="p-4 border-t border-gray-700 bg-gray-800">
                <button className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  View {question.totalAnswers - question.answers.length} more
                  answers
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
