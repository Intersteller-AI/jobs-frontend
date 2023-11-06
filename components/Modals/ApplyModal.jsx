"use client"
import { ModalClose, Sheet } from "@mui/joy";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { UploadPdf } from "../Generals/UploadPdf";
import { useMutation } from "@tanstack/react-query";
import { postApplications } from "@/services/applications";
import toast from "react-hot-toast";

const ApplyModal = ({ applyModal, setApplyModal, jobId }) => {

  const router = useRouter()
  const [step, setStep] = useState(1)

  const handleModalClose = () => {
    setApplyModal(false)
  };

  const { userInfo } = useSelector(state => state.user)

  const [details, setDetails] = useState({
    email: "",
    number: "",
    resume_link: "",
  })

  useEffect(() => {
    setDetails({ ...details, location: userInfo?.location })
  }, [userInfo])

  const handleChange = (e) => {
    const { name, value } = e.target
    setDetails({ ...details, [name]: value });
  }

  const [fileLink, setFileLink] = useState();

  const { mutate, isLoading } = useMutation({
    mutationFn: (details) => postApplications(details),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Application successfully submitted")
      setApplyModal(false)
      setDetails({
        email: "",
        number: "",
        resume_link: "",
        jobId: ""
      })
      router.refresh()
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message)
    }
  })


  const handleApply = () => {
    console.log({ ...details, jobId });
    mutate({ ...details, jobId })
  }

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={applyModal}
      onClose={handleModalClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
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
          <div className="w-full">
            <h1 className="font-semibold text-3xl">Apply for the job</h1>

            <div className="flex flex-col gap-1 mt-6">
              <h1 className="text-neutral-600 font-medium">Email</h1>
              <input value={details.email} onChange={handleChange} type="text" name="email" placeholder="give email" className="border-2 border-neutral-400 rounded-sm w-full px-2 py-1 mt-2" />
            </div>
            <div className="flex flex-col gap-1 mt-6">
              <h1 className="text-neutral-600 font-medium">Number</h1>
              <input value={details.number} onChange={handleChange} type="text" name="number" placeholder="give number" className="border-2 border-neutral-400 rounded-sm w-full mt-2 px-2 py-1" />
            </div>
            <div className="w-full mt-6">
              <h1 className="text-neutral-600 font-semibold">Upload Resume</h1>
              <div className="flex flex-row items-center gap-x-3">
                <UploadPdf setDetails={setDetails} />
                <a className="text-[#B8B8B8]" href={fileLink} target="_blank">
                  {details.resume_link ? details.resume_link : 'resume.pdf'}
                </a>
              </div>
            </div>

            <button
              onClick={handleApply}
              className="px-6 py-2 bg-[#36518F] w-full rounded-md text-white mt-6 font-medium"
            >
              {isLoading ? "Loading" : "Apply"}
            </button>
          </div>

        </div>
      </Sheet>
    </Modal >
  );
};

export default ApplyModal;
