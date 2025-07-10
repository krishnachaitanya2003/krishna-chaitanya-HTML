import React, { useState } from 'react';
import { CheckCircle, Circle, AlertTriangle, Code, FileText, Shield, Zap, Users } from 'lucide-react';

const CodeReviewAssistant = () => {
  const [activeTab, setActiveTab] = useState('checklist');
  const [checkedItems, setCheckedItems] = useState({});
  const [reviewNotes, setReviewNotes] = useState('');
  const [language, setLanguage] = useState('general');

  const toggleCheck = (category, item) => {
    const key = `${category}-${item}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isChecked = (category, item) => {
    const key = `${category}-${item}`;
    return checkedItems[key] || false;
  };

  const reviewCategories = {
    functionality: {
      icon: <Code className="w-5 h-5" />,
      title: "Functionality & Logic",
      items: [
        "Does the code solve the intended problem?",
        "Are edge cases handled properly?",
        "Is error handling comprehensive?",
        "Are null/undefined values handled?",
        "Does the logic flow make sense?"
      ]
    },
    readability: {
      icon: <FileText className="w-5 h-5" />,
      title: "Code Quality & Readability",
      items: [
        "Are variable/function names descriptive?",
        "Is the code properly formatted and indented?",
        "Are functions/methods appropriately sized?",
        "Is the code self-documenting?",
        "Are comments helpful and up-to-date?"
      ]
    },
    security: {
      icon: <Shield className="w-5 h-5" />,
      title: "Security & Safety",
      items: [
        "Are user inputs validated/sanitized?",
        "Are sensitive data properly protected?",
        "Are authentication/authorization checks in place?",
        "Are there any potential injection vulnerabilities?",
        "Are secrets/credentials properly handled?"
      ]
    },
    performance: {
      icon: <Zap className="w-5 h-5" />,
      title: "Performance",
      items: [
        "Are there any obvious performance bottlenecks?",
        "Are database queries optimized?",
        "Is memory usage reasonable?",
        "Are loops and iterations efficient?",
        "Are large datasets handled appropriately?"
      ]
    },
    maintainability: {
      icon: <Users className="w-5 h-5" />,
      title: "Maintainability",
      items: [
        "Does the code follow established patterns?",
        "Are dependencies reasonable and up-to-date?",
        "Is the code modular and reusable?",
        "Are there adequate tests?",
        "Is documentation sufficient?"
      ]
    }
  };

  const quickTemplates = {
    general: [
      "Overall looks good! A few minor suggestions:",
      "Nice work on the implementation. Consider:",
      "This is a solid approach. Some thoughts:",
      "Good solution! A couple of improvements:"
    ],
    positive: [
      "Excellent error handling!",
      "Great use of descriptive variable names",
      "Nice clean implementation",
      "Good test coverage",
      "Well-structured code"
    ],
    suggestions: [
      "Consider extracting this into a separate function",
      "This could benefit from some comments",
      "Might want to add error handling here",
      "Consider using a more descriptive variable name",
      "This logic could be simplified"
    ]
  };

  const getCompletionPercentage = () => {
    const totalItems = Object.values(reviewCategories).reduce((sum, cat) => sum + cat.items.length, 0);
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checkedCount / totalItems) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Code Review Assistant</h1>
        <p className="text-gray-600">Speed up your code reviews with systematic checklists and templates</p>
      </div>

      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'checklist' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Review Checklist
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'templates' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Comment Templates
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'notes' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Review Notes
          </button>
        </div>
      </div>

      {activeTab === 'checklist' && (
        <div>
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">{getCompletionPercentage()}%</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Review Progress</h3>
                  <p className="text-sm text-gray-600">
                    {Object.values(checkedItems).filter(Boolean).length} of {Object.values(reviewCategories).reduce((sum, cat) => sum + cat.items.length, 0)} items checked
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCheckedItems({})}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Reset All
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(reviewCategories).map(([key, category]) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  {category.icon}
                  <h3 className="font-semibold text-gray-900">{category.title}</h3>
                </div>
                <div className="space-y-2">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <button
                        onClick={() => toggleCheck(key, index)}
                        className="mt-0.5 text-blue-600 hover:text-blue-700"
                      >
                        {isChecked(key, index) ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>
                      <span className={`text-sm ${isChecked(key, index) ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Review Openers
            </h3>
            <div className="space-y-2">
              {quickTemplates.general.map((template, index) => (
                <button
                  key={index}
                  onClick={() => setReviewNotes(prev => prev + template + '\n\n')}
                  className="block w-full text-left p-2 text-sm bg-white rounded border hover:bg-gray-50 text-gray-700"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Positive Feedback
            </h3>
            <div className="space-y-2">
              {quickTemplates.positive.map((template, index) => (
                <button
                  key={index}
                  onClick={() => setReviewNotes(prev => prev + '• ' + template + '\n')}
                  className="block w-full text-left p-2 text-sm bg-white rounded border hover:bg-gray-50 text-gray-700"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Constructive Suggestions
            </h3>
            <div className="space-y-2">
              {quickTemplates.suggestions.map((template, index) => (
                <button
                  key={index}
                  onClick={() => setReviewNotes(prev => prev + '• ' + template + '\n')}
                  className="block w-full text-left p-2 text-sm bg-white rounded border hover:bg-gray-50 text-gray-700"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div>
          <div className="mb-4">
            <label htmlFor="review-notes" className="block text-sm font-medium text-gray-700 mb-2">
              Review Notes & Comments
            </label>
            <textarea
              id="review-notes"
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="Click templates to add them here, or write your own review comments..."
              className="w-full h-64 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setReviewNotes('')}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Clear
            </button>
            <button
              onClick={() => navigator.clipboard.writeText(reviewNotes)}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeReviewAssistant;