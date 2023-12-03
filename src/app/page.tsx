"use client";

import { useEffect, useState } from "react";
import { ArrowLeft2, ArrowRight2, BagCross } from "iconsax-react";
import Search from "@/components/Search";
import Table from "@/components/Table";

export default function Home() {
  const [users, setUsers] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // const [displayedUsers, setDisplayedUsers] = useState([]);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedUsers = users.slice(startIndex, endIndex);

  // useEffect(() => {
  //   setDisplayedUsers(users.slice(startIndex, endIndex));
  // }, [startIndex, endIndex]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCheckboxChange = (userId: number) => {
    const updatedSelectedRows = selectedRows.includes(userId)
      ? selectedRows.filter((id) => id !== userId)
      : [...selectedRows, userId];
    setSelectedRows(updatedSelectedRows);
  };

  const handleDeleteSelectedRows = () => {
    const updatedUsers = users.filter(
      (user: any) => !selectedRows.includes(user.id)
    );
    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  const handleEditRow = (userId: number) => {
    setEditRowId(userId);
  };

  const handleDeleteRow = (userId: number) => {
    const updatedUsers = users.filter((user: any) => user.id !== userId);
    setUsers(updatedUsers);
    setSelectedRows(selectedRows.filter((id) => id !== userId));
  };

  const handleSelectAllRows = () => {
    const allRowIds = displayedUsers.map((user: any) => user.id);
    const updatedSelectedRows =
      selectedRows.length === allRowIds.length ? [] : allRowIds;
    setSelectedRows(updatedSelectedRows);
  };

  const filteredUsers = users.filter((user: any) => {
    const { name, email, role } = user;
    const query = searchQuery.toLowerCase();
    return (
      name.toLowerCase().includes(query) ||
      email.toLowerCase().includes(query) ||
      role.toLowerCase().includes(query)
    );
  });

  // Function to handle search value change
  const handleSearch = (searchValue: string) => {
    // Update search query in lowercase
    setSearchQuery(searchValue.toLowerCase());
  };

  // Function to clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleSaveChanges = (updatedUsers: any) => {
    // Assuming editRowId is the ID of the object you want to remove
    const filteredUsers = users.filter((user: any) => user.id !== editRowId);
    setUsers([...updatedUsers, ...filteredUsers]);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Search onSearch={handleSearch} onClearSearch={clearSearch} />
        <button
          onClick={handleDeleteSelectedRows}
          className="p-2 bg-red-400 rounded-md"
        >
          <BagCross size="16" color="white" />
        </button>
      </div>

      <Table
        users={searchQuery ? filteredUsers : displayedUsers}
        selectedRows={selectedRows}
        editRowId={editRowId}
        onCheckboxChange={handleCheckboxChange}
        onDeleteSelectedRows={handleDeleteSelectedRows}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
        onSelectAllRows={handleSelectAllRows}
        onSaveChanges={handleSaveChanges}
      />

      {/* pagination  */}
      {!searchQuery && (
        <div className="flex flex-row items-center justify-between">
          <div>
            <p className="text-xs text-gray-600 font-medium">
              {selectedRows.length} of {users.length} row(s) selected
            </p>
          </div>

          <div className="flex flex-row items-center gap-6">
            <p className="text-xs text-gray-600 font-medium">
              page 1 of {totalPages}
            </p>

            <div className="flex flex-row items-center gap-1">
              {/* Previous page button */}
              <button
                className="p-2 border-2 rounded-md relative"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <ArrowLeft2
                  size="12"
                  color={currentPage === 1 ? "gray" : "black"}
                />
                <ArrowLeft2
                  size="12"
                  color={currentPage === 1 ? "gray" : "black"}
                  className="absolute top-2 right-0 left-1"
                />
              </button>
              {/* Previous page button */}
              <button
                className="p-2 border-2 rounded-md"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ArrowLeft2
                  size="12"
                  color={currentPage === 1 ? "gray" : "black"}
                />
              </button>

              {/* Page numbers */}
              <div className="flex items-center">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={` aspect-square w-8 border-2 rounded-md mx-1 cursor-pointer text-xs font-semibold ${
                      currentPage === page ? "bg-gray-300" : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next page button */}
              <button
                className="p-2 border-2 rounded-md"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ArrowRight2
                  size="12"
                  color={currentPage === totalPages ? "gray" : "black"}
                />
              </button>
              {/* Next page button */}
              <button
                className="p-2 border-2 rounded-md relative"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ArrowRight2
                  size="12"
                  color={currentPage === totalPages ? "gray" : "black"}
                />
                <ArrowRight2
                  size="12"
                  color={currentPage === totalPages ? "gray" : "black"}
                  className="absolute left-1 top-2 bottom-0 right-0"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
