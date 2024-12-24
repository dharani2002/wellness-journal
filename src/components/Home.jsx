import React from 'react'
import useDailyQuotes from '../hooks/useDailyQuotes'

export default function Home() {

    const {quote, author}= useDailyQuotes()

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover p-8 ">
      <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg max-w-lg w-full hover:bg-white hover:text-gray-800 transition duration-300">
          <p className="text-center text-xl italic">"{quote}"</p>
          <p className="text-center text-xl italic">-{author}</p>
      </div>
    </div>
  )
}
