const Actions = () => {
  return (
    <div className="sticky bottom-0 left-0 w-full flex items-center gap-2 py-4 px-10 z-40 bg-white md:border-none border-t border-neutral-300">
      <button className="px-4 py-1 text-lg rounded-lg bg-blue-500 text-white">
        Save
      </button>
      <button className="px-4 py-1 text-lg rounded-lg border-neutral-400 border text-neutral-800">
        Cancel
      </button>
    </div>
  )
}

export default Actions