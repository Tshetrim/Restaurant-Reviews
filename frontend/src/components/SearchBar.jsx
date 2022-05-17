import React from "react";

function SearchBar(props) {
  const { valueName, searchValue, onChangeSearchValue, findByValue } = props;
  return (
    <div className="input-group col-lg-4">
      <input
        type="text"
        className="form-control"
        placeholder={"Search by " + valueName}
        value={searchValue}
        onChange={onChangeSearchValue}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={findByValue}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
