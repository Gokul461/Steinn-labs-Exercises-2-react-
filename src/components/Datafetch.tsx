import { useEffect, useState } from "react";
import { db } from '../pages/firebase';
import { collection, getDocs } from "firebase/firestore";

export interface Student {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  department: string;
  address: string;
  status: string;
}

export function getdata() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Student[];
        setStudents(studentList);
      } catch (err) {
        setError("Error fetching students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return { students, loading, error };
}
