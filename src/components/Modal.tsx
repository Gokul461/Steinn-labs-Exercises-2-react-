import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";

type Student = {
  id: string;
  age: number;
  name: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  isActive: boolean;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: Omit<Student, "id">) => void;
  onUpdateStudent: (id: string, student: Omit<Student, "id">) => void;
  studentData?: Student | null;
};

const Modalcompo: React.FC<ModalProps> = ({ isOpen, onClose, onAddStudent, onUpdateStudent, studentData }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (studentData) {
      setName(studentData.name);
      setGender(studentData.gender);
      setPhone(studentData.phone);
      setAge(studentData.age.toString());
      setEmail(studentData.email);
      setAddress(studentData.address);
      setIsActive(studentData.isActive);
    } else {
    if(isOpen){
      setName("");
      setGender("");
      setPhone("");
      setAge("");
      setEmail("");
      setAddress("");
      setIsActive(true);
    }
}
  }, [studentData,isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !gender || !phone || !email || !address || !age) {
      alert("All fields are required.");
      return;
    }

    const student = { name, gender, phone, age: Number(age), email, address, isActive };

    if (studentData) {
      onUpdateStudent(studentData.id, student);
    } else {
      onAddStudent(student);
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {studentData ? "Edit Student" : "Add New Student"}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  value={name}
                  labelPlacement="outside"
                  onChange={(e) => setName(e.target.value)}
                  isRequired
                />
                <Select
                  isRequired
                  label="Gender"
                  labelPlacement="outside"
                  selectedKeys={gender ? [gender] : []}
                  placeholder="Select gender"
                  onSelectionChange={(selected) => {
                    const value = Array.from(selected)[0] as string;
                    if (value) setGender(value);
                  }}
                >
                  <SelectItem key="male">Male</SelectItem>
                  <SelectItem key="female">Female</SelectItem>
                  <SelectItem key="other">Other</SelectItem>
                </Select>
                <Input
                  label="Phone"
                  placeholder="Enter phone"
                  value={phone}
                  labelPlacement="outside"
                  onChange={(e) => setPhone(e.target.value)}
                  isRequired
                  type="tel"
                />
                <Input
                  label="Age"
                  placeholder="Enter Age"
                  value={age}
                  labelPlacement="outside"
                  onChange={(e) => setAge(e.target.value.replace(/\D/g, ""))}
                  isRequired
                  type="text"
                />
                <Input
                  label="Email"
                  placeholder="Enter email"
                  value={email}
                  labelPlacement="outside"
                  onChange={(e) => setEmail(e.target.value)}
                  isRequired
                  type="email"
                />
                <Input
                  label="Address"
                  placeholder="Enter address"
                  value={address}
                  labelPlacement="outside"
                  onChange={(e) => setAddress(e.target.value)}
                  isRequired
                />

                <Select
                  isRequired
                  label="Is Active"
                  labelPlacement="outside"
                  selectedKeys={isActive ? ["active"] : ["inactive"]}
                  placeholder="Select one"
                  onSelectionChange={(selected) => {
                    const value = Array.from(selected)[0] as string;
                    setIsActive(value === "active");
                  }}
                >
                  <SelectItem key="active">Active</SelectItem>
                  <SelectItem key="inactive">Inactive</SelectItem>
                </Select>

                <button
                  type="submit"
                  className="bg-teal-700 text-white mt-2 absolute bottom-4 right-8 mx-auto p-2 rounded-lg hover:bg-teal-500 transition w-[100px]"
                >
                  Submit
                </button>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="default" className="mr-32 w-[80px]"variant="solid" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Modalcompo;
