import Checkbox from "@mui/material/Checkbox";

const Security = ({ meetingDetails, setMeetingDetails, handleChange }) => {
  return (
    <div className="w-full mt-4">
      <div className="flex md:flex-row flex-col text-base py-4 px-2">
        <div className="md:flex-[0.2] w-full">
          <h1 className="font-medium">Security</h1>
        </div>
        <div className="md:flex-1 w-full flex flex-col gap-4 md:mt-0 mt-2">
          <div className="w-full flex gap-2 items-start">
            <Checkbox disabled checked />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h1 className="font-medium text-neutral-600 cursor-not-allowed ">
                  Passcode
                </h1>
                <input
                  className="w-full max-w-[200px] border border-neutral-600 rounded-xl px-4 py-1.5 focus:outline-blue-500 mx-2"
                  onChange={handleChange}
                  value={meetingDetails.passcode}
                  placeholder="Passcode"
                  name="Passcode"
                />
              </div>
              <h1 className="text-neutral-500 text-sm max-w-md">
                Only users who have the invite link or passcode can join the
                meeting
              </h1>
            </div>
          </div>
          <div className="w-full flex gap-2 items-start">
            <Checkbox
              checked={meetingDetails.isWaiting}
              onChange={() =>
                setMeetingDetails({
                  ...meetingDetails,
                  isWaiting: !meetingDetails.isWaiting,
                })
              }
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h1 className="font-medium cursor-not-allowed ">
                  Waiting Room
                </h1>
              </div>
              <h1 className="text-neutral-400 text-sm max-w-md">
                Only users admitted by the host can join the meeting
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Security