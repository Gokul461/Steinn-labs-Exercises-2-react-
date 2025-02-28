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
    name: string;
    gender: string;
    phone: string;
    age: string;
    email: string;
    address: string;
    isActive: boolean;
};

type EditStudentModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onUpdateStudent: (id: string, student: Omit<Student, "id">) => void;
    studentData?: Student | null;
};

const EditModal: React.FC<EditStudentModalProps> = ({ isOpen, onClose, onUpdateStudent, studentData }) => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (studentData) {
            setName(studentData.name);
            setGender(studentData.gender);
            setPhone(studentData.phone);
            setAge(studentData.age);
            setEmail(studentData.email);
            setAddress(studentData.address);
            setIsActive(studentData.isActive);
        } else {
            // Reset fields when opening for new student
            setName("");
            setGender("");
            setPhone("");
            setAge("");
            setEmail("");
            setAddress("");
            setIsActive(true);
        }
    }, [studentData]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !gender || !phone || !email || !address) {
            alert("All fields are required.");
            return;
        }
        const student = { name, gender, phone, age, email, address, isActive };

        if (studentData) {
            onUpdateStudent(studentData.id, student);
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
                                    selectedKeys={[gender]}
                                    placeholder="Select gender"
                                    onSelectionChange={(selected) => setGender(Array.from(selected)[0] as string)}
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
                                    type="number"
                                />
                                <Input
                                    label="Age"
                                    placeholder="Enter Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    
                                    isRequired
                                    type="number"
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
                                <label className="block text-gray-800">Active Status
                                        <select name="isActive" value={isActive.toString()} onChange={(e) => setIsActive(e.target.value === "true")} className="w-full p-2 border mt-2 border-gray-300 rounded-md bg-white text-gray-800 focus:outline-blue-500">
                                            <option value="false">Inactive</option>
                                            <option value="true">Active</option>
                                        </select>
                                    </label>
                                <button
                                    type="submit"
                                    className="bg-[#33a5a0] text-white mt-2 mx-auto p-2 rounded-md hover:bg-blue-700 transition w-[120px]">
                                    Submit
                                </button>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default EditModal;
