import React from 'react'

const Topic = ({ handleChange, details }) => {
  return (
    <div className="w-full">
      <div className="flex md:flex-row flex-col text-base py-4 px-2 items-center">
        <div className="md:flex-[0.2] w-full">
          <h1 className="font-medium">Topic</h1>
        </div>
        <div className="md:flex-1 w-full md:mt-0 mt-2">
          <input
            className="w-full max-w-md border border-neutral-600 rounded-md px-4 py-1.5 focus:outline-blue-500"
            onChange={handleChange}
            value={details.topic}
            placeholder="Topic"
            name='topic'
          />
        </div>
      </div>
    </div>
  )
}

export default Topic