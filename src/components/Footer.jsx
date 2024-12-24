import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} Wellness Journal. All rights reserved.
      </p>
      <p className="text-xs mt-2">
        Made with ❤️ using React and Tailwind CSS.
      </p>
    </div>
  </footer>
  )
}
