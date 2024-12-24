// src/Journal.js
import React, { useState, useEffect } from 'react';

const Journal = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  
  // Load journal entries from localStorage when the component mounts
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setJournalEntries(storedEntries);
  }, []);

  // Save journal entries to localStorage whenever the journalEntries state changes
  useEffect(() => {
    if (journalEntries.length > 0) {
      localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
    }
  }, [journalEntries]);

  const handleAddEntry = () => {
    if (newEntry.trim()) {
      const newJournal = {
        id: Date.now(),
        content: newEntry,
        date: new Date().toLocaleDateString(),
      };
      setJournalEntries([newJournal, ...journalEntries]);
      setNewEntry('');
    }
  };

  const handleDeleteEntry = (id) => {
    const updatedEntries = journalEntries.filter(entry => entry.id !== id);
    setJournalEntries(updatedEntries);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen min-w-full bg-gradient-to-b from-blue-950 from-30% via-pink-700 via-60% to-slate-700">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">My Daily Journal</h1>
      
      {/* Input for adding new entry */}
      <div className="mb-4 mx-60">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write your thoughts..."
          className="w-full p-3 border rounded-md shadow-sm"
          rows="4"
        />
        <button
          onClick={handleAddEntry}
          className="w-full mt-2 bg-orange-700 text-white py-2 rounded-md shadow-md hover:bg-orange-600"
        >
          Add Entry
        </button>
      </div>

      {/* Display journal entries */}
      <div className='mx-60'>
        {journalEntries.length === 0 ? (
          <p className="text-center text-gray-500">No entries yet...</p>
        ) : (
          journalEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 mb-4 bg-white shadow-md rounded-md border"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">{entry.date}</span>
                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
              <p className="mt-2 text-lg">{entry.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
