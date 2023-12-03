import React from "react";

function Search({ onSearch, onClearSearch }: any) {
  // Handle the case when user search anything like name, email, role
  const handleSearchChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(event.currentTarget.value.trim().toLowerCase());
    }
  };

  // Handle the case when the search field is cleared
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value.trim().toLowerCase();
    if (searchValue === "") {
      onClearSearch();
    }
  };

  return (
    <>
      <input
        placeholder="Search Value..."
        type="search"
        className="text-black outline-none h-10 px-4 rounded-md text-xs w-1/3 bg-transparent border-[1px] border-gray-300"
        onKeyDown={handleSearchChange}
        onChange={handleInputChange}
      />
    </>
  );
}

export default Search;
