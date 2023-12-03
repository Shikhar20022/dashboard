import { Edit, BagCross } from "iconsax-react";
import React, { useState } from "react";

const Table = ({
  users,
  selectedRows,
  editRowId,
  onCheckboxChange,
  onDeleteSelectedRows,
  onSelectAllRows,
  onEditRow,
  onDeleteRow,
  onSaveChanges,
}: any) => {
  const [editedUserData, setEditedUserData] = useState<any>({});

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEditedUserData({
      ...editedUserData,
      [field]: e.target.value,
    });
  };

  // const handleSaveChanges = (userId: number) => {
  //   const updatedUsers = users.map((user: any) => {
  //     if (user.id === userId) {
  //       return {
  //         ...user,
  //         ...editedUserData,
  //       };
  //     }
  //     return user;
  //   });

  //   onSaveChanges(updatedUsers);
  //   setEditedUserData({});
  //   onEditRow(null);
  // };

  const handleSaveChanges = (userId: number) => {
    const updatedUser = users.find((user: any) => user.id === editRowId);

    if (!updatedUser) {
      // If the user is not found, return or handle the error
      return;
    }

    const editedUser = [
      {
        ...updatedUser,
        ...editedUserData,
      },
    ];

    onSaveChanges(editedUser);
    setEditedUserData({});
    onEditRow(null);
  };

  return (
    <>
      <table className="text-xs font-medium my-4 w-full">
        <thead>
          <tr className="h-10">
            <th align="center" className="w-20">
              <input
                type="checkbox"
                onChange={onSelectAllRows}
                checked={
                  selectedRows.length === users.length && users.length > 0
                }
              />
            </th>
            <th align="left">Name</th>
            <th align="left">Email</th>
            <th align="left">Role</th>
            <th align="left">Action</th>
          </tr>
        </thead>
        <tbody className="w-full overflow-y-scroll">
          {users.map((user: any) => (
            <tr
              key={user.id}
              className={`h-12 hover:bg-slate-100 ${
                selectedRows.includes(user.id) && "bg-slate-200"
              }`}
            >
              <td align="center">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => onCheckboxChange(user.id)}
                />
              </td>
              <td>
                {editRowId === user.id ? (
                  <div className="flex items-center gap-1">
                    <input
                      className="bg-gray-200 p-2 outline-none rounded-md"
                      type="text"
                      placeholder={user.name}
                      value={editedUserData.name}
                      onChange={(e) => handleEditInputChange(e, "name")}
                    />
                    <button
                      onClick={() => handleSaveChanges(user.id)}
                      className="bg-none border-[1px] rounded-md border-slate-300 ml-1 p-2 text-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => onEditRow(null)}
                      className="bg-none border-[1px] rounded-md border-slate-300 ml-1 p-2 text-green-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  user.name
                )}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <div className="flex flex-row items-center gap-2">
                  <button
                    onClick={() => onEditRow(user.id)}
                    className="p-2 bg-none border-[1px] rounded-md border-slate-300"
                  >
                    <Edit size="10" color="black" />
                  </button>
                  <button
                    onClick={() => onDeleteRow(user.id)}
                    className="p-2 border-[1px] rounded-md border-slate-300"
                  >
                    <BagCross size="10" color="red" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
