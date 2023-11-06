const Skills = ({ jobDetails }) => {
  return (
    <div className="bg-[#E8F3FF] rounded-xl w-full py-4 px-6 drop-shadow flex flex-col gap-4">
      <h1 className="font-semibold text-center md:text-left text-lg">Job match score</h1>
      <div className="w-full flex flex-wrap gap-2 mt-4">
        {jobDetails.skills.map((item, index) => (
          <div key={index} className="bg-white px-5 capitalize py-2 rounded-full text-neutral-700 text-lg font-semibold">
            {item}
          </div>
        ))}
      </div>
      <div className="w-full border-b border-neutral-300 mt-4" />
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-[80%]">
          <h1 className="font-semibold text-lg">
            <span className="text-red-500">1 Essential Skills</span> That Make You Stand Out from Other Candidates
          </h1>
        </div>
        <div className="w-full md:w-[20%] flex items-center justify-center mt-4 md:mt-0">
          <button className="rounded-full bg-[#3234bb] px-6 py-3 text-white">
            Upskill now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
