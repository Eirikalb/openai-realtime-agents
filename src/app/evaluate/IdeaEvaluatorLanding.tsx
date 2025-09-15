"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface IdeaEvaluatorLandingProps {}

const IdeaEvaluatorLanding: React.FC<IdeaEvaluatorLandingProps> = () => {
  const router = useRouter();
  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStartEvaluation = () => {
    if (!inputPrompt.trim()) return;
    
    setIsLoading(true);
    
    // Navigate to the main app with the ideaEvaluator agent and the user's prompt
    const params = new URLSearchParams({
      agentConfig: 'ideaEvaluator',
      initialPrompt: inputPrompt.trim()
    });
    
    router.push(`/?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleStartEvaluation();
    }
  };

  const examplePrompts = [
    "I spend hours every day manually categorizing customer support emails",
    "Our team processes hundreds of invoices monthly and it's very time-consuming",
    "We need to automatically qualify sales leads from our website forms",
    "I want to automate our monthly financial reporting process",
    "We manually review and moderate user-generated content daily"
  ];

  const handleExampleClick = (example: string) => {
    setInputPrompt(example);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/openai-logomark.svg"
                alt="OpenAI Logo"
                width={32}
                height={32}
                className="mr-3"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Idea Evaluator
                </h1>
                <p className="text-sm text-gray-500">
                  AI-Powered Automation Assessment
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← All Agents
              </button>
              <div className="text-gray-300">|</div>
              <span className="text-sm text-gray-500">Idea Evaluator</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Evaluate Your Automation Ideas
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get a comprehensive scoring matrix and implementation roadmap for any business process you want to automate. 
            Our AI will assess feasibility, ROI, complexity, and risk to recommend the perfect solution tier.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <label htmlFor="automation-idea" className="block text-lg font-medium text-gray-900 mb-3">
              What process or task would you like to automate?
            </label>
            <textarea
              id="automation-idea"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe the task or process you're thinking about automating. For example: 'I spend 2 hours every day manually categorizing customer support emails and routing them to the right team members...'"
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Press Enter to start evaluation
            </div>
            <button
              onClick={handleStartEvaluation}
              disabled={!inputPrompt.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Starting Evaluation...
                </>
              ) : (
                'Start Evaluation'
              )}
            </button>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Need inspiration? Try these examples:
          </h3>
          <div className="space-y-3">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="w-full text-left p-4 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-gray-700 hover:text-blue-700"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Comprehensive Scoring
            </h3>
            <p className="text-gray-600">
              Get detailed scores across 6 key dimensions: frequency, time impact, complexity, risk, AI feasibility, and ROI potential.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tier Recommendations
            </h3>
            <p className="text-gray-600">
              Receive clear recommendations for Low, Mid, or Premium tier solutions with realistic timelines and budgets.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Implementation Roadmap
            </h3>
            <p className="text-gray-600">
              Get detailed phase-by-phase implementation plans with specific activities, tools, and next steps.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How It Works
          </h3>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Describe</h4>
              <p className="text-sm text-gray-600">Tell us about your automation idea</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Assess</h4>
              <p className="text-sm text-gray-600">Answer detailed evaluation questions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Analyze</h4>
              <p className="text-sm text-gray-600">Get comprehensive scoring matrix</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                4
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Recommend</h4>
              <p className="text-sm text-gray-600">Receive tier recommendation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                5
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Plan</h4>
              <p className="text-sm text-gray-600">Get implementation roadmap</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaEvaluatorLanding;
