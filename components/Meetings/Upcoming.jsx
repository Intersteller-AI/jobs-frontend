import Link from "next/link";

const Upcoming = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 mt-36">
      <h1 className="text-2xl font-medium">Welcome to Mooz Meetings!</h1>
      <p className="max-w-xl font-medium mt-4">
        Schedule new and manage existing meetings all in one place. You are
        currently limited to 40 hours per meeting. Upgrade now if you need more
        time.{" "}
        <Link href="/" className="text-blue-500">
          Learn More
        </Link>
      </p>
      <div className="flex items-center justify-center gap-4 text-[14px] font-amalde mt-4">
        <Link href="/meetings/schedule">
          <button className="px-3 py-1 rounded-lg bg-dullBlue text-white">
            Schedule a Meeting
          </button>
        </Link>
        <button className="px-3 py-1 rounded-lg border border-neutral-400 hover:border-neutral-600">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default Upcoming;
