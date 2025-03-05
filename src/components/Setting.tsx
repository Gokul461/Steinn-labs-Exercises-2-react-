import { db } from '../pages/firebase';
import { collection, addDoc } from "firebase/firestore";
import { useState } from 'react';

const Setting: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [age, setAge] = useState<number | ''>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents page reload

    if (!name || !email || !age || !phone || !address || !gender) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "students"), {
        name,
        age,
        email,
        phone,
        address,
        isactive: isActive,
        gender,
      });

      alert("Data submitted successfully!");
      setName('');
      setAge('');
      setEmail('');
      setPhone('');
      setAddress('');
      setIsActive(false);
      setGender('');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting data: " + error);
    }
  };

  return (
    <div className="flex items-center h-[500px] overflow-y justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">User Registration</h2>
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-blue-500"
        />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
          className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-blue-500"
        />
        <input type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-blue-500"
        />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-blue-500"
        />
        <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-blue-500"
        />
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-blue-500"
        />
        <label className="block text-gray-600 font-medium">Active Status</label>
        <select value={isActive.toString()} onChange={(e) => setIsActive(e.target.value === "true")}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-blue-500"
        >
          <option value="false">Inactive</option>
          <option value="true">Active</option>
        </select>

        <button type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
        <button
                  type="submit"
                  className="bg-teal-700 text-white mt-2 absolute bottom-4 right-8 p-2 rounded-lg hover:bg-teal-500 transition w-[100px]"
                >
                  Submit
                </button>
      </form>
    </div>
    
  );
};

export default Setting;
