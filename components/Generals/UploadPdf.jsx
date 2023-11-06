"use client"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import axios from "axios";
import { HOST } from "@/services/server";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@tanstack/react-query";


const fileUpload = async (formData) => {
  try {
    const { data } = await axios.post(`${HOST}/api/applications/upload/file`, formData, {
      withCredentials: true
    });

    return data
  } catch (error) {
    console.error('Error in deleting the file:', error);
  }
}

function FileUpload({ onFileUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      // Handle the dropped files
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);

        const formData = new FormData();
        formData.append("pdfFile", file);

        try {
          onFileUpload(formData);
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`p-4 border-2 border-dashed rounded-lg ${isDragActive ? "bg-blue-100" : "bg-gray-100"
        }`}
    >
      <input {...getInputProps()} />
      <p className="text-lg text-gray-500 cursor-pointer">
        {isDragActive
          ? "Drop the file here"
          : "Drag and drop a PDF file here, or click to select one"}
      </p>
      {selectedFile && (
        <p className="text-blue-500">Selected File: {selectedFile.name}</p>
      )}
    </div>
  );
}


export function UploadPdf({ setDetails }) {
  const [fileUploadResponse, setFileUploadResponse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => fileUpload(formData),
    onSuccess: (data) => {
      if (data) {
        setDetails((prevDetails) => ({
          ...prevDetails,
          resume_link: data.user.pdfFile,
        }));
        setFileUploadResponse(data.user.pdfFile)
      }
    },
    onError: (err) => {
      console.log(err);
    }
  })

  const handleFileLinkChange = async (formData) => {
    mutate(formData)
  }
  const handleAddClick = () => {
    // setDetails((prevDetails) => ({
    //   ...prevDetails,
    //   resume_link: fileUploadResponse,
    // }));

    console.log(fileUploadResponse);
    // onAddFileLink(fileUploadResponse);
    setModalOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" rounded-md text-white">
          <div className="flex flex-row items-center">
            <button className="px-6 py-3 bg-[#36518F] rounded-md mt-2 text-white font-medium" onClick={() => setModalOpen(true)}>
              Upload
            </button>
          </div>
        </div>
      </DialogTrigger>
      {modalOpen && (
        <DialogContent>
          <div className="grid">
            <div className="">
              <Label htmlFor="videoLink" className="text-left text-lg">
                Upload
              </Label>
              <div className="mt-6 z-[9999]">
                <FileUpload onFileUpload={handleFileLinkChange} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-[#36518F] text-white hover:bg-[#36518F]"
              onClick={() => {
                setModalOpen(false);
                handleAddClick();
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}