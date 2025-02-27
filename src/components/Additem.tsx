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

// Define TypeScript interface for form data
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

    // Handle input changes
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

    // Handle form submission
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
            {/* Button to Open Modal */}
            <Button color="secondary" onClick={() => setIsOpen(true)} endContent={<PlusIcon />}>
                Add New 
            </Button>

            {/* Modal for Adding Student */}
            <Modal
                backdrop="opaque"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                radius="lg"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-center text-xl font-bold text-gray-300">
                                Add New Student
                            </ModalHeader>

                            <ModalBody>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 rounded-md bg-[#2d2d44] text-white focus:outline-none"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="age"
                                        placeholder="Age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 rounded-md bg-[#2d2d44] text-white focus:outline-none"
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 rounded-md bg-[#2d2d44] text-white focus:outline-none"
                                        required
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 rounded-md bg-[#2d2d44] text-white focus:outline-none"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 rounded-md bg-[#2d2d44] text-white focus:outline-none"
                                        required
                                    />
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 rounded-md bg-[#2d2d44] text-white focus:outline-none"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <label className="block text-gray-300">Active Status</label>
                                    <select
                                        name="isActive"
                                        value={formData.isActive.toString()}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 rounded-md bg-[#2d2d44] text-white focus:outline-none"
                                    >
                                        <option value="false">Inactive</option>
                                        <option value="true">Active</option>
                                    </select>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </ModalBody>

                            <ModalFooter>
                                <Button variant="light" onClick={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddStudent;
