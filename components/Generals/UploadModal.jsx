"use client"
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import FileUpload from "./FileUpload";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import axios from "axios";
import { HOST } from "@/services/server";
export function Upload({ onAddFileLink }) {
  const [fileUploadResponse, setFileUploadResponse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFileLinkChange = async (formData) => {

    try {
      const { data } = await axios.post(`${HOST}/api/users/company/upload`, formData, {
        withCredentials: true
      });
      setFileUploadResponse(data.companyLogo);
    } catch (error) {
      console.error('Error in deleting the question:', error);
    }
  }

  const handleAddClick = () => {

    onAddFileLink(fileUploadResponse);
    setModalOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" rounded-md text-white">
          <div className="flex flex-row items-center">
            <button className="px-6 py-3 bg-[#36518F] rounded-full mt-2 text-white font-medium" onClick={() => setModalOpen(true)}>
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
              <div className="mt-6">
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