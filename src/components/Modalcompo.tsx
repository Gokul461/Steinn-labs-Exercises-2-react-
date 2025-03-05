import React, { useState, useEffect } from "react";
import { useForm,SubmitHandler } from 'react-hook-form';
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

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Student>();
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

  const onSumbit:SubmitHandler<Student> = () => {
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
              <form onSubmit={handleSubmit(onSumbit)} className="flex flex-col gap-2">
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  value={name}
                  labelPlacement="outside"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 3, message: "At least 3 characters" },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Only letters and spaces allowed",
                    },
                  })}
                  onChange={(e) => setName(e.target.value)}
                />{errors.name && <p className="text-red-600">{errors.name.message}</p>}
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
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be exactly 10 digits",
                    },
                  })}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                />
                   {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
                <Input
                  label="Age"
                  placeholder="Enter Age"
                  value={age}
                  labelPlacement="outside"
                  onChange={(e) => setAge(e.target.value.replace(/\D/g, ""))}
                  isRequired
                  type="text"
                />
                 {errors.age && <p className="text-red-600">{errors.age.message}</p>}
                <Input
                  label="Email"
                  placeholder="Enter email"
                  value={email}
                  labelPlacement="outside"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",

                    },
                  })}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
                 {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                <Input
                  label="Address"
                  placeholder="Enter address"
                  value={address}
                  labelPlacement="outside"
                  {...register("address", {
                    required: "Address is required",
                    minLength: { value: 3, message: "At least 3 characters" },
                  })}
                  onChange={(e) => setAddress(e.target.value)}
                /> 
                 {errors.address && <p className="text-red-600">{errors.address.message}</p>}

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
