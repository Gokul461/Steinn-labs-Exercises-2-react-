import { useState, SVGProps } from "react";
import { db } from "../pages/firebase";
import { collection, addDoc } from "firebase/firestore";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";

interface StudentData {
    name: string;
    email: string;
    age: number | "";
    phone: string;
    address: string;
    gender: string;
    isActive: boolean;
}

interface CustomSVGProps extends SVGProps<SVGSVGElement> {
    size?: number;
}

export const PlusIcon = ({ size = 24, width, height, ...props }: CustomSVGProps) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            >
                <path d="M6 12h12" />
                <path d="M12 18V6" />
            </g>
        </svg>
    );
};


const AddStudent: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
 
    const [formData, setFormData] = useState<StudentData>({
        name: "",
        email: "",
        age: "",
        phone: "",
        address: "",
        gender: "",
        isActive: false,
    });

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "number" ? Number(value) || "" :
                name === "isActive" ? value === "true" :
                value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const { name, email, age, phone, address, gender } = formData;
        if (!name || !email || !age || !phone || !address || !gender) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await addDoc(collection(db, "students"), formData);
            alert("Data submitted successfully!");
            setFormData({ name: "", email: "", age: "", phone: "", address: "", gender: "", isActive: false });
            setIsOpen(false);
        } catch (error) {
            console.error("Error adding document:", error);
          
            alert("Error submitting data: " + error);
            
        }
          
    };

    return (
        <>
            <Button className="bg-teal-700 text-white hover:bg-teal-600 rounded-lg px-4 py-2" onClick={() => setIsOpen(true)} endContent={<PlusIcon />}>
                Add New 
            </Button>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen} radius="lg">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-center text-xl font-bold text-gray-800">
                                Add New Student
                            </ModalHeader>

                            <ModalBody>
                                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 rounded-lg shadow-lg text-gray-800">
                                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-blue-500" required />
                                    <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-blue-500" required />
                                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-blue-500" required />
                                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-blue-500" required />
                                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-blue-500" required />
                                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-blue-500" required>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <label className="block text-gray-800">Active Status
                                        <select name="isActive" value={formData.isActive.toString()} onChange={handleChange} className="w-full p-2 border mt-2 border-gray-300 rounded-md bg-white text-gray-800 focus:outline-blue-500">
                                            <option value="false">Inactive</option>
                                            <option value="true">Active</option>
                                        </select>
                                    </label>
                                    <button type="submit" className="bg-blue-600 text-white mt-7 rounded-md hover:bg-blue-700 transition w-[160px] h-[45px]">
                                        Submit
                                    </button>
                                </form>
                            </ModalBody>

                            <ModalFooter>
                                <Button onClick={onClose} className="bg-gray-400 text-white hover:bg-gray-500">Close</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddStudent;
