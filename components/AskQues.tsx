"use client"

import React, { useState } from "react";
import {
  X,
  Plus,
  Globe,
  Users,
  Lock,
  ChevronDown,
  Tag,
  Edit3,
  MessageCircle,
} from "lucide-react";

interface QuestionData {
  title: string;
  description: string;
  tags: string[];
  visibility: "public" | "followers" | "private";
  allowComments: boolean;
  anonymous: boolean;
}

const suggestedTags = [
  "JavaScript",
  "React",
  "TypeScript",
  "Python",
  "Node.js",
  "Web Development",
  "Machine Learning",
  "Data Science",
  "Programming",
  "Technology",
  "Career",
  "Startup",
  "Design",
  "Mobile Development",
  "DevOps",
  "AI",
  "Software Engineering",
];

export default function AskQues() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionData>({
    title: "",
    description: "",
    tags: [],
    visibility: "public",
    allowComments: true,
    anonymous: false,
  });

  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [showVisibilityDropdown, setShowVisibilityDropdown] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setShowTagSuggestions(false);
    setShowVisibilityDropdown(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuestionData((prev) => ({ ...prev, description: e.target.value }));
  };

  const addTag = (tag: string) => {
    if (
      tag &&
      !questionData.tags.includes(tag) &&
      questionData.tags.length < 5
    ) {
      setQuestionData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput("");
      setShowTagSuggestions(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setQuestionData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    setShowTagSuggestions(e.target.value.length > 0);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput.trim());
    }
  };

  const filteredTags = suggestedTags.filter(
    (tag) =>
      tag.toLowerCase().includes(tagInput.toLowerCase()) &&
      !questionData.tags.includes(tag)
  );

  const handleSubmit = () => {
    console.log("Question submitted:", questionData);
    alert("Question posted successfully!");

    // Reset form
    setQuestionData({
      title: "",
      description: "",
      tags: [],
      visibility: "public",
      allowComments: true,
      anonymous: false,
    });
    closeModal();
  };

  const visibilityOptions = [
    {
      value: "public",
      label: "Public",
      icon: Globe,
      description: "Anyone can see this question",
    },
    {
      value: "followers",
      label: "Followers",
      icon: Users,
      description: "Only your followers can see this",
    },
    {
      value: "private",
      label: "Private",
      icon: Lock,
      description: "Only you can see this question",
    },
  ];

  const selectedVisibility = visibilityOptions.find(
    (option) => option.value === questionData.visibility
  );

  return (
    <div className="text-white">
      <div className="max-w-4xl mx-auto">
        {/* Small Ask Question Component */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8 hover:border-gray-600 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Edit3 size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <button
                onClick={openModal}
                className="w-full text-left bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-gray-400 hover:bg-gray-600 hover:text-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                What would you like to know?
              </button>
            </div>
            <button
              onClick={openModal}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Plus size={16} />
              Ask Question
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Ask a Question
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Question Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Question Title
                  </label>
                  <input
                    type="text"
                    value={questionData.title}
                    onChange={handleTitleChange}
                    placeholder="What would you like to know?"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Be specific and imagine you're asking a question to another
                    person
                  </p>
                </div>

                {/* Question Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Description (Optional)
                  </label>
                  <textarea
                    value={questionData.description}
                    onChange={handleDescriptionChange}
                    placeholder="Include any additional context, background information, or details that would help others provide better answers..."
                    rows={4}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Tags (up to 5)
                  </label>

                  {/* Selected Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {questionData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-blue-200 hover:text-white transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Tag Input */}
                  <div className="relative">
                    <div className="flex items-center gap-2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                      <Tag size={16} className="text-gray-400" />
                      <input
                        type="text"
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyDown={handleTagInputKeyDown}
                        placeholder="Add a tag..."
                        className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                        disabled={questionData.tags.length >= 5}
                      />
                    </div>

                    {/* Tag Suggestions */}
                    {showTagSuggestions && filteredTags.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
                        {filteredTags.slice(0, 8).map((tag, index) => (
                          <button
                            key={index}
                            onClick={() => addTag(tag)}
                            className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Settings */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-4">
                    Question Settings
                  </h3>

                  {/* Visibility */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Visibility
                      </label>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowVisibilityDropdown(!showVisibilityDropdown)
                          }
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            {selectedVisibility && (
                              <>
                                <selectedVisibility.icon
                                  size={16}
                                  className="text-gray-400"
                                />
                                <span>{selectedVisibility.label}</span>
                              </>
                            )}
                          </div>
                          <ChevronDown size={16} className="text-gray-400" />
                        </button>

                        {showVisibilityDropdown && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-10">
                            {visibilityOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setQuestionData((prev) => ({
                                    ...prev,
                                    visibility: option.value as any,
                                  }));
                                  setShowVisibilityDropdown(false);
                                }}
                                className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors flex items-center gap-3"
                              >
                                <option.icon size={16} />
                                <div>
                                  <div className="font-medium">
                                    {option.label}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {option.description}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Settings */}
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={questionData.allowComments}
                          onChange={(e) =>
                            setQuestionData((prev) => ({
                              ...prev,
                              allowComments: e.target.checked,
                            }))
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-300">
                          Allow comments on answers
                        </span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={questionData.anonymous}
                          onChange={(e) =>
                            setQuestionData((prev) => ({
                              ...prev,
                              anonymous: e.target.checked,
                            }))
                          }
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-300">
                          Post anonymously
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Live Preview */}
                {questionData.title && (
                  <div className="bg-gray-700 rounded-lg border border-gray-600 p-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-3">
                      Preview
                    </h3>
                    <div className="bg-gray-600 rounded-lg p-3">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {questionData.title}
                      </h4>
                      {questionData.description && (
                        <p className="text-gray-300 mb-3 text-sm whitespace-pre-wrap">
                          {questionData.description}
                        </p>
                      )}
                      {questionData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {questionData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-500 text-gray-200 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-700">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!questionData.title.trim()}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:hover:scale-100"
                >
                  Post Question
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
