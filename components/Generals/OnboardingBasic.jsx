import { useState } from "react";
import { Upload } from "../Generals/UploadModal";

const genders = ["male", "female", "others"];
const companyCategory = [
  "Proprietor",
  "Partnership",
  "Limited Liability Partnership",
  "Private Company",
  "Public Company",
];

const OnboardingBasic = ({ details, setDetails, user }) => {

  const [fileLink, setFileLink] = useState();
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };


  const handleChangeName = (e) => {
    setDetails((prevDetails) => ({ ...prevDetails, companyName: e.target.value }));
  };

  const addFileLink = (link) => {
    setFileLink(link);

    setDetails((prevDetails) => ({
      ...prevDetails,
      companyLogo: link,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
        <div className="w-full md:w-full md:flex-1">
          <h1 className="text-neutral-500">Full name</h1>
          <input
            type="text"
            name="name"
            value={user ? user.name : details.name}
            onChange={handleChange}
            className="w-full border px-6 py-3 rounded-full mt-2 text-lg"
          />
        </div>
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Email ID</h1>
          <input
            type="email"
            name="email"
            value={user ? user.email : details.email}
            onChange={handleChange}
            className="border w-full px-6 py-3 rounded-full mt-2 text-lg"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 md:flex-row flex-col w-full md:mt-4">
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Mobile Number</h1>
          <input
            type="text"
            placeholder="Enter you Mobile Number"
            name="phone"
            value={user ? user.phone : details.phone}
            onChange={handleChange}
            className="border w-full px-6 py-3 rounded-full mt-2 text-lg"
          />
        </div>
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Current location</h1>
          <input
            type="text"
            name="location"
            placeholder="Select location"
            value={details.location}
            onChange={handleChange}
            className="w-full border px-6 py-3 rounded-full mt-2 text-lg"
          />
        </div>
      </div>
      <div className="w-full mt-4">
        <h1 className="text-neutral-500">Gender</h1>
        <div className="flex flex-wrap gap-4">
          {genders.map((gender, index) => (
            <div
              key={index}
              className={`px-4 hover:cursor-pointer font-medium py-2 border-[#36518F] border-2 rounded-full mt-4 ${details.gender.toLowerCase() === gender.toLowerCase()
                ? "text-white bg-[#36518F]"
                : "text-[#36518F] bg-white"
                } capitalize`}
              onClick={() =>
                setDetails({ ...details, gender: gender.toLowerCase() })
              }
            >
              {gender}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mt-4">
        <h1 className="text-neutral-500">Choose your Category</h1>
        <div className="flex flex-wrap gap-4 mt-4">
          {companyCategory.map((company, index) => (
            <div
              key={index}
              className={`px-4 hover:cursor-pointer font-medium py-2 border-[#36518F] border-2 rounded-full ${details.category.toLowerCase() === company.toLowerCase()
                ? "text-white bg-[#36518F]"
                : "text-[#36518F] bg-white"
                } capitalize`}
              onClick={() =>
                setDetails({ ...details, category: company.toLowerCase() })
              }
            >
              {company}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-10 md:flex-row flex-col w-full md:mt-4">
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Company Name</h1>
          <input
            type="text"
            placeholder=""
            name="name"
            onChange={handleChangeName}
            className="border w-full px-6 py-3 rounded-full mt-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="w-full md:flex-1">
          <h1 className="text-neutral-500">Upload Logo</h1>
          <div className="flex flex-row items-center gap-x-3">
            <Upload onAddFileLink={addFileLink} />
            <a className="text-[#B8B8B8]" href={fileLink} target="_blank">
              {fileLink ? fileLink.split('/').pop().substring(0, 40) + "..." : 'company_logo.png'}
            </a>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col items-center gap-4 w-full mt-4">
        <div className="w-full md:w-full md:flex-1">
          <h1 className="text-neutral-500">About Company (Employer)</h1>
          <textarea
            rows={6}
            type="text"
            name="about"
            value={details.about}
            onChange={handleChange}
            placeholder="Medorn, a Medi-Tech Platform that enables employees working in pharmaceutical companies to maintain a record of their work and track it in the best possible manner. Populated with tons of features, enhanced UI/UX, it emerges as one of the best applications that a firm can use."
            className="focus:outline-none focus:border-blue-500 w-full border px-6 pt-3 pb-6 rounded-[24px] mt-2 text-lg resize-none placeholder:font-light placeholder:text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingBasic;
