import React, { SVGProps, useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Spinner,
  User,
  Pagination,
  Selection,
  SortDescriptor,
} from "@heroui/react";
import { db } from "../pages/firebase";
import { capitalize } from "lodash";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";
// import AddStudentModal from "./Additem";
import Modalcompo from "./Modal";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Student = {
  id: string;
  name: string;
  gender: string;
  phone: string;
  age: number;
  email: string;
  address: string;
  isActive: boolean;
};

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "AGE", uid: "age", sortable: true },
  { name: "GENDER", uid: "gender" },
  { name: "PHONE", uid: "phone" },
  { name: "EMAIL", uid: "email" },
  { name: "ADDRESS", uid: "address",sortable: true },
  { name: "STATUS", uid: "isActive", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Inactive", uid: "inactive" },
];

const INITIAL_VISIBLE_COLUMNS = ["name", "gender","age", "phone", "email", "address", "isActive", "actions"];

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => {
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
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SearchIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};
export const PlusIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => {
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
export default function StudentTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Student[];
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsLoading(false); // Stop loading after fetching data
      }
    };
  
    fetchStudents();
  }, []);

  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

  const updateStudent = async (id: string, updatedStudent: Omit<Student, "id">) => {
    const studentDoc = doc(db, "students", id);
    await updateDoc(studentDoc, updatedStudent);
    setStudents(students.map((student) => (student.id === id ? { id, ...updatedStudent } : student)));
  };


  const editStudent = (id: string) => {
    const student = students.find((student) => student.id === id);
    if (student) {
      setCurrentStudent(student);
      setIsModalOpen(true);
    }
  };
  const addStudent = async (student: Omit<Student, "id">) => {
    const docRef = await addDoc(collection(db, "students"), student);
    setStudents([...students, { id: docRef.id, ...student }]);
  };

  const deleteStudent = async (id: string) => {
    await deleteDoc(doc(db, "students", id));
    setStudents(students.filter((student) => student.id !== id));
  };
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredStudents = [...students];
  
    if (hasSearchFilter) {
      filteredStudents = filteredStudents.filter((student) =>
        student.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        student.address.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
  
    if (statusFilter !== "all") {
      filteredStudents = filteredStudents.filter((student) =>
        statusFilter.has("active") ? student.isActive : !student.isActive
      );
    }
  
    return filteredStudents;
  }, [students, filterValue, statusFilter, hasSearchFilter]);
  

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Student];
      const second = b[sortDescriptor.column as keyof Student];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((student: Student, columnKey: string) => {
    const cellValue = student[columnKey as keyof Student];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?ga=GA1.1.1343520097.1717989475&semt=ais_hybrid" + student.id }}
            // description={student.email}
            name={capitalize(cellValue as string)}
          >
            {student.email}
          </User>
        );
      case "isActive":
        return (
          <Chip className="capitalize" color={student.isActive ? "success" : "danger"}  size="sm" variant="dot">
            {student.isActive ? "Active" : "Inactive"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-900" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="edit" onPress={()=> editStudent(student.id)}>Edit</DropdownItem>
                <DropdownItem key="delete" onPress={() => deleteStudent(student.id)}>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, [deleteStudent, editStudent]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            variant="underlined"
            className="w-full sm:max-w-[44%] rounded-md"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button className="bg-gray-200" endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button className="bg-gray-200" endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button  className="text-white bg-teal-800 transition" endContent={<PlusIcon />} onPress={() => { setCurrentStudent(null); setIsModalOpen(true)}}>Add New</Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {students.length} students</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    students.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
       <span className="w-[30%] text-small text-default-500">
       <span className="w-[30%] text-small text-default-500">
          {selectedKeys === "all"
            ? "All items selected" :` ${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        </span>
        <Pagination
      key={page} 
      isCompact
      showControls
      initialPage={page}
      showShadow={false}
      page={page}
      variant="light"
      total={pages}
      onChange={setPage}
      classNames={{
        wrapper: "gap-0 overflow-visible h-8 rounded border border-divider",
        item: "w-8 h-8 text-small rounded-none bg-transparent",
        cursor:
          "bg-gradient-to-b shadow-lg from-teal-900 to-teal-800 dark:from-teal-300 dark:to-teal-100 text-white font-bold",
      }}
    />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" className="bg-teal-900 text-white" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" className="bg-teal-900 text-white" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div>
       
          <Table
            isHeaderSticky
            aria-label="Example table with custom cells, pagination and sorting"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
              wrapper: "h-[382px] bg-white shadow-lg rounded-lg",
                td: "bg-white  font-semibold ",
                th: "bg-zinc-200 text-white font-semibold",
                tr: "bg-white  font-semibold hover:bg-black ",
            }}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            disableAnimation={false}
            sortDescriptor={sortDescriptor}
            
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={headerColumns} className="text-black" >
              {(column) => (
                <TableColumn
                  key={column.uid}
                  className="text-black"
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={`No students found`} items={sortedItems} isLoading={isLoading} loadingContent={<Spinner label="Loading...." />}>
              
              {(item) => (
                <TableRow key={item.id} className="text-black bg-opacity-4 hover:bg-[#475569] rounded-lg hover:text-black">
                  {(columnKey) => <TableCell>{renderCell(item, columnKey as string)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        
          <Modalcompo
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onAddStudent={addStudent}
      onUpdateStudent={updateStudent}
      studentData={currentStudent}
      />
        </div>
  );
}