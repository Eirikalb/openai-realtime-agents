"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MainLanding: React.FC = () => {
  const router = useRouter();

  const agentConfigs = [
    {
      key: 'ideaEvaluator',
      name: 'Idea Evaluator',
      description: 'Evaluate automation opportunities with comprehensive scoring matrices',
      icon: '📊',
      color: 'bg-blue-500',
      href: '/evaluate'
    },
    {
      key: 'chatSupervisor',
      name: 'Chat Supervisor',
      description: 'Customer service with AI supervisor oversight',
      icon: '💬',
      color: 'bg-green-500',
      href: '/?agentConfig=chatSupervisor'
    },
    {
      key: 'norwegianIntake',
      name: 'Norwegian Intake',
      description: 'Healthcare intake and interview system',
      icon: '🏥',
      color: 'bg-purple-500',
      href: '/?agentConfig=norwegianIntake'
    },
    {
      key: 'customerServiceRetail',
      name: 'Customer Service Retail',
      description: 'Retail customer service automation',
      icon: '🛍️',
      color: 'bg-orange-500',
      href: '/?agentConfig=customerServiceRetail'
    },
    {
      key: 'simpleHandoff',
      name: 'Simple Handoff',
      description: 'Basic agent handoff demonstration',
      icon: '🔄',
      color: 'bg-gray-500',
      href: '/?agentConfig=simpleHandoff'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
                  Realtime API Agents
                </h1>
                <p className="text-sm text-gray-500">
                  AI-Powered Agent Demonstrations
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Agent Gallery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your AI Agent
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore different AI agent configurations and see how they handle various scenarios. 
            Each agent is designed to demonstrate specific capabilities and use cases.
          </p>
        </div>

        {/* Agent Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {agentConfigs.map((agent) => (
            <div
              key={agent.key}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer p-6"
              onClick={() => router.push(agent.href)}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${agent.color} rounded-lg flex items-center justify-center text-white text-2xl mr-4`}>
                  {agent.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {agent.name}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {agent.description}
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                Try it out
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Agent */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white mb-12">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white text-2xl mr-4">
                  📊
                </div>
                <h3 className="text-2xl font-bold">Featured: Idea Evaluator</h3>
              </div>
              <p className="text-blue-100 mb-6 text-lg">
                Get comprehensive automation scoring matrices and implementation roadmaps for any business process. 
                Perfect for evaluating automation opportunities with data-driven insights.
              </p>
              <button
                onClick={() => router.push('/evaluate')}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Start Evaluating Ideas
              </button>
            </div>
            <div className="hidden lg:block ml-8">
              <div className="text-right">
                <div className="text-4xl font-bold mb-2">6</div>
                <div className="text-blue-100">Evaluation Dimensions</div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How to Use These Agents
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Choose an Agent</h4>
              <p className="text-gray-600">Select from our collection of specialized AI agents, each designed for specific use cases.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Start Conversation</h4>
              <p className="text-gray-600">Interact with the agent using voice or text. Each agent has specialized capabilities and tools.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Get Results</h4>
              <p className="text-gray-600">Receive intelligent responses, automated actions, and comprehensive analysis from your chosen agent.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLanding;
