import React from "react";

function DropSearch(props) {
  const { searchValues, onChangeSearchValue, findByValue } = props;
  return (
    <div className="input-group col-lg-4">
      <select onChange={onChangeSearchValue}>
        {searchValues.map((value) => {
          return (
            <option value={value} key={value}>
              {value.substr(0, 20)}
            </option>
          );
        })}
      </select>
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

export default DropSearch;
