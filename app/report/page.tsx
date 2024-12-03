'use client';
import { useState } from 'react';

const CHOICES = [
  { symbol: 'Investing', name: 'Investing in Stocks' },
{ symbol: 'Business', name: 'Starting a Business' },
{ symbol: 'Sidehustle', name: 'Building a Side Hustle' },
{ symbol: 'RecurringIncome', name: 'Recurring Income Generation' },
{ symbol: 'PassiveIncome', name: 'Creating Passive Income Streams' },
{ symbol: 'Crypto', name: 'Cryptocurrency Investments' },
{ symbol: 'MutualFunds', name: 'Mutual Funds' },
{ symbol: 'Budgeting', name: 'Effective Budgeting' },
{ symbol: 'FinancialEducation', name: 'Continuous Financial Education' }
].sort((a, b) => a.name.localeCompare(b.name));

interface Choice {
  symbol: string;
  name: string;
}

export default function StockAnalysisPage() {
  const [selectedChoices, setselectedChoices] = useState<Choice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [, setIsLoading] = useState(false);
  const [report, setReport] = useState('');
  const [stage, setStage] = useState<'input' | 'loading' | 'report'>('input');

  const handleChoiceSelect = (choice: Choice) => {
    if (selectedChoices.length >= 3) {
      setError('Maximum 3 choices allowed');
      return;
    }
    if (selectedChoices.some(t => t.symbol === choice.symbol)) {
      setError('Choice already selected');
      return;
    }
    setselectedChoices([...selectedChoices, choice]);
    setError('');
  };

  const handleRemoveChoice = (symbol: string) => {
    setselectedChoices(selectedChoices.filter(t => t.symbol !== symbol));
    setError('');
  };

  const handleGenerateReport = async () => {
    if (selectedChoices.length === 0) {
      setError('Please select at least one choice');
      return;
    }

    setStage('loading');
    setIsLoading(true);

    try {
      const choicesList = selectedChoices.map(t => `${t.name} (${t.symbol})`).join(', ');
      const prompt = `You are a wealth-building strategist. Analyze the following pathway to creating a sustainable income and achieving success: ${choicesList}). 
Provide a comprehensive report of no more than 200 words that includes:
1. The exact benefits of this approach, with examples or scenarios showing how these benefits can be practically realized.
2. Specific, actionable strategies that can be implemented immediately, detailing step-by-step processes for maximizing income through this method.
3. Tailored advice for overcoming common challenges or obstacles associated with this pathway, ensuring the individual can maintain consistent progress.
4. Real-world examples or analogies to inspire confidence and clarity in adopting this strategy.

Write in a tone that is engaging, authoritative, and motivational, ensuring the report inspires the reader to act decisively and effectively.`;


      const aiResponse = await fetch('https://gemini-api-worker.waibhav204.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(prompt)
      });

      if (!aiResponse.ok) {
        throw new Error('Failed to generate report');
      }

      const reportData = await aiResponse.json();
      setReport(reportData);
      setStage('report');
    } catch {
      setError('Failed to generate report. Please try again.');
      setStage('input');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-yellow-50">
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-8 sm:py-12 lg:py-16">
          <div className="text-center mb-8">
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-600 sm:text-7xl">
  Achieve Financial Freedom.
</h1>
<p className="mt-8 text-pretty text-lg font-medium text-gray-600 sm:text-xl/8">
  Explore various options to learn about achieving financial freedom. Choose up to 3 options for personalized insights.
</p>

          </div>

          <div className="space-y-8">
            {stage === 'input' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CHOICES.map((choice) => (
                  <button
                    key={choice.symbol}
                    onClick={() => handleChoiceSelect(choice)}
                    disabled={selectedChoices.some(t => t.symbol === choice.symbol)}
                    className={`p-4 rounded-xl text-left transition-all duration-200
                      ${selectedChoices.some(t => t.symbol === choice.symbol)
                        ? 'bg-purple-100 text-purple-700 cursor-not-allowed'
                        : 'bg-white border border-gray-200 hover:border-purple-400 hover:shadow-md'
                      }`}
                  >
                    <div className="font-semibold text-black">{choice.symbol}</div>
                    <div className="text-sm text-gray-600">{choice.name}</div>
                  </button>
                ))}
              </div>
            )}

            {selectedChoices.length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl">
                <h2 className="font-semibold mb-4 text-gray-700">Selected Choices:</h2>
                <div className="flex flex-wrap gap-3">
                  {selectedChoices.map((choice) => (
                    <div
                      key={choice.symbol}
                      className="group flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
                    >
                      <span className="font-medium text-gray-700">{choice.symbol}</span>
                      <button
                        onClick={() => handleRemoveChoice(choice.symbol)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-center text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerateReport}
              disabled={selectedChoices.length === 0}
              className={`w-full p-4 rounded-xl font-medium text-lg transition-all duration-200
                ${selectedChoices.length === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                }`}
            >
              Generate Analysis
            </button>

            {stage === 'loading' && (
              <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
                <p className="text-gray-500">Generating report...</p>
              </div>
            )}

            {/* Report Section */}
            {stage === 'report' && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="font-semibold text-lg text-gray-700">Analysis Report</h2>
                <p className="mt-4 text-gray-600">{report}</p>
                <button
                  onClick={() => setStage('input')}
                  className="mt-6 w-full p-4 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Generate Another Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}