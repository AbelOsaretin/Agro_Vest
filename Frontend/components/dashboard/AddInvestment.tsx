/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

import useCreateInvestment from "@/hooks/WriteHooks/useCreateInvestment";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { uploadImageToIPFS } from "@/utils/uploadToIPFS";
// import { datetimeToEpochTime } from "datetime-epoch-conversion";

const AddInvestment = () => {
  const { address } = useAccount();

  const createInvestment = useCreateInvestment();

  const [farmID, setFarmID] = useState<any>("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [investmentImage, setInvestmentImage] = useState<any>("");
  const [investmentName, setInvestmentName] = useState("");
  const [aboutInvestment, setAboutInvestment] = useState("");
  const [investmentTarget, setInvestmentTarget] = useState("");
  const [investmentEndDate, setInvestmentEndDate] = useState("");

  const handleSelectImage = async ({ target }: { target: any }) => {
    setSelectedFile(target.files[0]);
    const imageHash = await uploadImageToIPFS(target.files[0]);
    setInvestmentImage(imageHash);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createInvestment(
        Number(farmID),
        investmentImage,
        investmentName,
        aboutInvestment,
        Number(investmentTarget),
        Number(investmentEndDate),
        address!
      );
      toast.dismiss();
      toast.success("Product added Successfully!");
      setInvestmentName("");
      setAboutInvestment("");
      setInvestmentTarget("");
      onOpenChange();
    } catch (error) {
      toast.dismiss();
      toast.error("Error Adding farm product. Please try again.");
      console.error(error);
    }
  };
  return (
    <section className="w-full flex flex-col gap-6 py-4">
      <div className="w-full flex justify-end items-center gap-4">
        <Button
          onPress={onOpen}
          className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base"
        >
          Create Investment
        </Button>
      </div>

      {/* modal  */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray-800 capitalize">
                Investment Profile
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4 py-3">
                <form className="w-full grid gap-4" onSubmit={handleSubmit}>
                  <div className="w-full flex flex-col items-center">
                    <div className="w-[80px] h-[80px] border-[0.5px] border-darkgreen rounded relative ">
                      {selectedFile ? (
                        <Image
                          src={URL.createObjectURL(selectedFile)}
                          alt="profile"
                          className="w-full h-full object-cover"
                          width={440}
                          height={440}
                          priority
                          quality={100}
                        />
                      ) : (
                        <span className="relative flex justify-center items-center w-full h-full text-darkgreen">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 relative text-6xl inline-flex rounded text-gray-300"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                            />
                          </svg>
                        </span>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        className="hidden"
                        id="selectFile"
                        onChange={handleSelectImage}
                      />
                      <label
                        htmlFor="selectFile"
                        className=" absolute -right-1 p-1 rounded-full -bottom-1 cursor-pointer bg-darkgreen border-[0.5px] border-gray-700/50 font-Bebas tracking-wider text-gray-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="farmID"
                      className="text-gray-700 font-medium ml-1"
                    >
                      Farm ID
                    </label>
                    <input
                      type="number"
                      name="farmID"
                      id="farmID"
                      placeholder="Enter Farm ID"
                      className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-gray-700"
                      value={farmID}
                      onChange={(e) => setFarmID(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="investmentName"
                      className="text-gray-700 font-medium ml-1"
                    >
                      Investment Name
                    </label>
                    <input
                      type="text"
                      name="investmentName"
                      id="investmentName"
                      placeholder="Enter Investment Name"
                      className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-gray-700"
                      value={investmentName}
                      onChange={(e) => setInvestmentName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="aboutInvestment"
                      className="text-gray-700 font-medium ml-1"
                    >
                      Investment Description
                    </label>
                    <input
                      type="text"
                      name="aboutInvestment"
                      id="aboutInvestment"
                      placeholder="Enter Investment Description"
                      className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-gray-700"
                      value={aboutInvestment}
                      onChange={(e: any) => setAboutInvestment(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="investmentTarget"
                      className="text-gray-700 font-medium ml-1"
                    >
                      Investment Target
                    </label>
                    <input
                      type="number"
                      name="investmentTarget"
                      id="investmentTarget"
                      placeholder="Enter Investment Target"
                      className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-gray-700"
                      value={investmentTarget}
                      onChange={(e) => setInvestmentTarget(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="investmentEndDate"
                      className="text-gray-700 font-medium ml-1"
                    >
                      Investment Duration
                    </label>
                    <input
                      type="number"
                      name="investmentEndDate"
                      id="investmentEndDate"
                      placeholder="Enter Investment Duration"
                      className="w-full caret-color1 py-3 px-4 outline-none rounded-lg border border-color1 text-sm bg-color1/5 text-gray-700"
                      value={investmentEndDate}
                      onChange={(e) => setInvestmentEndDate(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-darkgreen text-lightgreen py-2.5 px-6 rounded-[7px] text-base mt-3"
                  >
                    Submit
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default AddInvestment;
