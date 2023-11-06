"use client"
import { ModalClose, Sheet } from "@mui/joy";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import QuillEditor from "../Inputs/QuillEditor";
import Image from "next/image";
import { RiCloseFill } from 'react-icons/ri'
import { useMutation } from "@tanstack/react-query";
import { postJob } from "@/services/jobs";
import toast from "react-hot-toast";
import DateModal from "./DateModal";
import { useRouter } from "next/navigation";

const sectorData = ["css", "html", "javascript"];

const CreateJobModal = ({ createJobModal, setCreateJobModal }) => {

  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isVisible, setIsVisible] = useState(false)

  const handleModalClose = () => {
    setCreateJobModal(false)
  };

  const { userInfo } = useSelector(state => state.user)

  const [details, setDetails] = useState({
    title: "",
    work_type: "on-site",
    location: "",
    job_type: "full-time",
    mode: "full-time",
    description: "",
    skills: [],
    deadline: Date.now()
  })

  useEffect(() => {
    setDetails({ ...details, location: userInfo?.location })
  }, [userInfo])

  const handleChange = (e) => {
    const { name, value } = e.target
    setDetails({ ...details, [name]: value });
  }

  const [searchTermSector, setSearchTermSector] = useState("");

  const [selectedSectorList, setSelectedSectorList] = useState([]);
  const [sectorList, setSectorList] = useState(sectorData);
  const [filteredSectorList, setFilteredSectorList] = useState([]);

  const handleSectorSelect = (val) => {
    if (selectedSectorList.includes(val)) {
      setSelectedSectorList(selectedSectorList.filter((c) => c !== val));
    } else {
      setSelectedSectorList([...selectedSectorList, val]);
    }
    setSearchTermSector("");
  };

  const handleSectorRemove = (index) => {
    setSelectedSectorList((selectedSectorList) =>
      selectedSectorList.filter((img, i) => i !== index)
    );
  };

  useEffect(() => {
    if (searchTermSector) {
      setFilteredSectorList(
        sectorList?.filter((message) =>
          message.toLowerCase().includes(searchTermSector.toLowerCase())
        )
      );
    } else {
      setFilteredSectorList([]);
    }
  }, [searchTermSector]);

  useEffect(() => {
    setDetails({ ...details, skills: selectedSectorList })
  }, [selectedSectorList])

  const { mutate, isLoading } = useMutation({
    mutationFn: (details) => postJob(details),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Job successfully created")
      setCreateJobModal(false)
      setDetails({
        title: "",
        work_type: "on-site",
        location: "",
        job_type: "full-time",
        mode: "full-time",
        description: "",
        skills: [],
        deadline: Date.now()
      })
      setStep(1)
      router.refresh()
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message)
    }
  })

  const handleSubmit = () => {
    // console.log(details);
    mutate(details)
  }

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={createJobModal}
      onClose={handleModalClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        sx={{
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          outline: "none"
        }}
      >
        <ModalClose
          onClick={handleModalClose}
          variant="outlined"
          sx={{
            zIndex: "999",
            bgcolor: "background.surface",
          }}
        />
        <div className="lg:w-[40vw] md:w-[80vw] w-[90vw]">
          {step === 1 ? (
            <div className="w-full">
              <h1 className="font-semibold text-3xl">Post a job for free</h1>
              <h4 className="text-lg mt-2">Rated #1 in increasing quality of hire.1</h4>
              <div className="flex flex-col gap-1 mt-6">
                <h1 className="text-neutral-600 font-medium">Job title</h1>
                <input value={details.title} onChange={handleChange} type="text" name="title" placeholder="Add the title you are hiring for" className="border-2 border-neutral-400 rounded-sm w-full px-2 py-1" />
              </div>
              <div className="flex flex-col gap-1 mt-6">
                <h1 className="text-neutral-600 font-medium">Workplace type</h1>
                <FormControl sx={{ width: "100%" }} size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={details.work_type}
                    onChange={handleChange}
                    name="work_type"
                    className="capitalize"
                  >
                    <MenuItem className="capitalize text-neutral-600" value={"on-site"}>on-site</MenuItem>
                    <MenuItem className="capitalize text-neutral-600" value={"remote"}>remote</MenuItem>
                    <MenuItem className="capitalize text-neutral-600" value={"hybrid"}>hybrid</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="flex flex-col gap-1 mt-6">
                <h1 className="text-neutral-600 font-medium">Job location</h1>
                <input value={details.location} onChange={handleChange} type="text" name="location" className="border-2 border-neutral-400 rounded-sm w-full px-2 py-1" />
              </div>
              <div className="flex flex-col gap-1 mt-6">
                <h1 className="text-neutral-600 font-medium">Job type</h1>
                <FormControl sx={{ width: "100%" }} size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={details.mode}
                    onChange={handleChange}
                    name="mode"
                    className="capitalize"
                  >
                    <MenuItem className="capitalize text-neutral-600" value={"full-time"}>full-time</MenuItem>
                    <MenuItem className="capitalize text-neutral-600" value={"part-time"}>part-time</MenuItem>
                    <MenuItem className="capitalize text-neutral-600" value={"contract"}>contract</MenuItem>
                    <MenuItem className="capitalize text-neutral-600" value={"internship"}>internship</MenuItem>
                    <MenuItem className="capitalize text-neutral-600" value={"other"}>other</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-[#36518F] w-full rounded-md text-white mt-6 font-medium"
              >
                Next
              </button>
            </div>
          ) : (
            <div className="w-full max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="w-full sticky top-0 bg-white z-20">
                <h1 className="font-semibold text-xl md:text-3xl">Tell us about the role</h1>
              </div>
              <div className="w-full relative my-4 py-2">
                <div
                  className={`font-semibold capitalize text-neutral-700`}
                >
                  <h1 className="font-semibold">Application deadline</h1>
                  <div className="mt-4 cursor-pointer rounded-sm w-full truncate font-normal border border-neutral-500 px-4 py-2"
                    onClick={() => setIsVisible(true)}
                  >{new Date(details.deadline).toDateString()}</div>
                </div>
                <DateModal
                  isVisible={isVisible}
                  setIsVisible={setIsVisible}
                  details={details}
                  setDetails={setDetails}
                />
              </div>
              <div className="flex flex-col gap-1 mt-6">
                <h1 className="text-neutral-600 font-medium">Job description</h1>
                <QuillEditor value={details.description} setValue={value => setDetails(prevDetails => ({ ...prevDetails, description: value }))} />
              </div>
              <div className="w-full mt-6">
                <h2 className="font-semibold">Skills</h2>
                <div className="relative flex border border-neutral-500 rounded-sm w-full px-3 mt-4">
                  <Image
                    src="/assets/search.svg"
                    width={100}
                    height={100}
                    alt="search"
                    className="w-4"
                  />
                  <input
                    type="text"
                    className="w-full px-3 py-2 rounded-md focus:outline-none "
                    placeholder="Preferred Work Sector"
                    value={searchTermSector}
                    onChange={(e) => setSearchTermSector(e.target.value)}
                  />
                  <div className="absolute top-[120%] overflow-y-auto left-0 right-0 max-h-56 w-full flex flex-col gap-1 custom-scrollbar scroll-smooth">
                    {filteredSectorList.map((item, index) => (
                      <div
                        className="text-white bg-blue-600 px-4 py-2 text-center text-sm font-semibold uppercase hover:cursor-pointer rounded-md"
                        key={index}
                        onClick={(e) => handleSectorSelect(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap mt-4 gap-2 mb-20">
                  {selectedSectorList.map((item, index) => (
                    <div
                      className="text-white bg-blue-600 px-4 py-2 text-center rounded-full flex items-center gap-1 justify-center"
                      key={index}
                    >
                      <h1 className="text-sm font-semibold uppercase">{item}</h1>
                      <RiCloseFill
                        className="hover:cursor-pointer font-semibold"
                        color="white"
                        size={20}
                        onClick={(e) => handleSectorRemove(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="sticky bottom-0 flex items-center gap-2 mt-6 bg-white z-30">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 border-2 border-[#36518F] flex-1 rounded-md text-[#36518F] font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#36518F] flex-1 rounded-md text-white  font-medium"
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>
      </Sheet>
    </Modal>
  );
};

export default CreateJobModal;
