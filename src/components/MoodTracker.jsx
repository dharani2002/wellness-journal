import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);

  const moodEmojis = [
    { label: 'Happy', emoji: '😊', value: 5, color: 'bg-yellow-400' },
    { label: 'Sad', emoji: '😞', value: 1, color: 'bg-blue-400' },
    { label: 'Stressed', emoji: '😫', value: 2, color: 'bg-red-400' },
    { label: 'Excited', emoji: '😃', value: 4, color: 'bg-green-400' },
    { label: 'Angry', emoji: '😡', value: 3, color: 'bg-orange-400' },
    { label: 'Meh', emoji: '😐', value: 2, color: 'bg-gray-400' },
  ];

  // Handle mood selection
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const today = new Date();
    setMoodHistory((prevState) => [
      ...prevState,
      { date: today.toISOString(), mood: mood.emoji, value: mood.value, color: mood.color },
    ]);
  };

  // Handle deleting mood history
  const handleDeleteHistory = (index) => {
    const updatedHistory = [...moodHistory];
    updatedHistory.splice(index, 1); // Remove the entry at the specified index
    setMoodHistory(updatedHistory); // Update the state with the modified history
  };

  // Filter mood history to include only today's moods
  const filterMoodHistory = () => {
    const now = new Date();
    return moodHistory.filter((entry) => {
      const entryDate = new Date(entry.date);
      // Only include moods from today (ignoring time part)
      return entryDate.toDateString() === now.toDateString();
    });
  };

  // Prepare trend data for chart
  const getMoodTrendData = () => {
    const filteredHistory = filterMoodHistory();

    // Group moods by the time of the day and calculate average mood value for each entry
    const groupedData = filteredHistory.reduce((acc, entry) => {
      const entryTime = new Date(entry.date).toLocaleTimeString(); // Group by time of the day
      if (!acc[entryTime]) {
        acc[entryTime] = { totalValue: 0, count: 0 };
      }
      acc[entryTime].totalValue += entry.value;
      acc[entryTime].count += 1;
      return acc;
    }, {});

    // Prepare data for the chart
    const labels = Object.keys(groupedData);
    const dataValues = labels.map((label) => groupedData[label].totalValue / groupedData[label].count);

    return {
      labels,
      datasets: [
        {
          label: 'Mood Trend (Today)',
          data: dataValues,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-950 from-10% via-red-400 via-30% to-slate-700 '>
    <div className="max-w-7xl mx-auto p-4 bg-gray-800 shadow-lg rounded-lg text-white">
      <h2 className="text-xl font-semibold mb-4">Mood Tracker</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mood Selection and Selected Mood Div (Left) */}
        <div className="flex flex-col w-full md:w-1/2 p-4 space-y-6">
          {/* Mood Selection */}
          <h3 className="text-lg font-semibold mb-4">Select Your Mood</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {moodEmojis.map((mood, index) => (
              <button
                key={index}
                className={`p-4 rounded-full text-2xl ${mood.color} ${selectedMood === mood ? 'ring-4 ring-blue-500' : ''}`}
                onClick={() => handleMoodSelect(mood)}
              >
                {mood.emoji}
              </button>
            ))}
          </div>

          {/* Selected Mood */}
          {selectedMood && (
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Today's Mood</h3>
              <p className="text-4xl">{selectedMood.emoji}</p>
            </div>
          )}

          {/* Mood History */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Mood History</h3>
            <div className="space-y-2">
              {moodHistory.map((entry, index) => (
                <div key={index} className={`p-2 rounded-md ${entry.color} flex justify-between items-center`}>
                  <div>
                    <p className="text-sm font-medium">{new Date(entry.date).toLocaleTimeString()}</p>
                    <p className="text-xl">{entry.mood}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteHistory(index)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mood Trend Chart (Right) */}
        <div className="w-full md:w-1/2 p-4">
          <h3 className="text-lg font-semibold mb-4">Mood Trend for Today</h3>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <Line data={getMoodTrendData()} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MoodTracker;
