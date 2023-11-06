import { ModalClose } from "@mui/joy";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import React from "react";

const DateModal = ({ details, isVisible, setIsVisible, setDetails }) => {

  const handleChange = (value) => {
    setDetails({ ...details, deadline: value.toISOString() })
    setIsVisible(false)
  }

  return (
    <div
      className={`absolute top-[100%] left-0 z-20 rounded-md bg-white py-2 px-4 drop-shadow-md ${isVisible ? "block" : "hidden"
        } scale-90 md:scale-100`}
    >
      <ModalClose
        onClick={() => setIsVisible(false)}
        variant="outlined"
        sx={{
          bgcolor: "background.surface",
        }}
      />
      {/* calender */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoItem label="Controlled calendar">
          <DateCalendar
            minDate={dayjs(Date.now())}
            value={dayjs(details?.deadline)}
            onChange={handleChange}
          />
        </DemoItem>
      </LocalizationProvider>
    </div>
  );
};

export default DateModal;
