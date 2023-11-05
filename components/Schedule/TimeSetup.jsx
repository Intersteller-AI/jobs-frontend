"use client";
import dayjs from "dayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TIMEZONES } from "@/public/constants";
import StableSelect from "@/components/Generals/StableSelect";

const TimeSetup = ({ meetingDetails, setMeetingDetails, handleChange }) => {
  return (
    <>
      <div className="w-full">
        <div className="flex md:flex-row flex-col text-base py-4 px-2 items-center">
          <div className="md:flex-[0.2] w-full">
            <h1 className="font-medium">When</h1>
          </div>
          <div className="md:flex-1 w-full md:mt-0 mt-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                minDate={dayjs(Date.now())}
                value={dayjs(meetingDetails.time)}
                onChange={(e) =>
                  setMeetingDetails({
                    ...meetingDetails,
                    time: e.toISOString(),
                  })
                }
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex md:flex-row flex-col text-base py-4 px-2 items-center">
          <div className="md:flex-[0.2] w-full">
            <h1 className="font-medium">Duration</h1>
          </div>
          <div className="md:flex-1 w-full flex items-center gap-2 md:mt-0 mt-2">
            <div className="flex items-center gap-1">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={meetingDetails.durationHours}
                  onChange={handleChange}
                  label="durationHours"
                  name="durationHours"
                >
                  {Array.from({ length: 25 }, (_, i) => i).map(
                    (item, index) => (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
              <h1 className="font-medium">hr</h1>
            </div>
            <div className="flex items-center gap-1">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={meetingDetails.durationMinutes}
                  onChange={handleChange}
                  label="durationMinutes"
                  name="durationMinutes"
                >
                  {[0, 15, 30, 45].map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <h1 className="font-medium">min</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex md:flex-row flex-col text-base py-4 px-2 items-center">
          <div className="md:flex-[0.2] w-full">
            <h1 className="font-medium">Time Zone</h1>
          </div>
          <div className="md:flex-1 w-full md:mt-0 mt-2">
            <div className="flex items-center">
              <StableSelect
                className="basic-single w-full max-w-md"
                classNamePrefix="select"
                defaultValue={meetingDetails.timeZone}
                name="timeZone"
                options={TIMEZONES}
                onChange={(e) =>
                  setMeetingDetails({
                    ...meetingDetails,
                    timeZone: e?.target?.value,
                  })
                }
                value={meetingDetails.timeZone}
              />
              <div
                style={{
                  color: "hsl(0, 0%, 40%)",
                  display: "inline-block",
                  fontSize: 12,
                  marginTop: "1em",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default TimeSetup