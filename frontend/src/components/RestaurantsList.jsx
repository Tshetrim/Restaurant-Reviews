import React, { useState, useEffect, useRef } from "react";
//import { v4 as uuidv4 } from "uuid";

import RestaurantDataService from "../services/restaurant.js";

import SearchBar from "./SearchBar.jsx";
import DropSearch from "./DropSearch.jsx";
import Card from "./RestaurantCard.jsx";

export default function RestaurantsList(props) {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (!hasFetchedData.current) {
      retrieveRestaurants();
      retrieveCuisines();
      hasFetchedData.current = true;
    }
  });

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = (e) => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then((response) => {
        //console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log("Problem trying to retrieve restaurants");
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then((response) => {
        //console.log(response.data);
        setCuisines([...cuisines, ...response.data]); //merge with data
      })
      .catch((e) => {
        console.log("Problem trying to retrieve cuisines");
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const findByName = () => {
    find(searchName, "name");
  };

  const findByZip = () => {
    find(searchZip, "zipcode");
  };

  const findByCuisine = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then((response) => {
        //console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="row pb-1">
        <SearchBar
          valueName={"name"}
          searchValue={searchName}
          onChangeSearchValue={onChangeSearchName}
          findByValue={findByName}
        ></SearchBar>

        <SearchBar
          valueName={"zip"}
          searchValue={searchZip}
          onChangeSearchValue={onChangeSearchZip}
          findByValue={findByZip}
        ></SearchBar>

        <DropSearch
          searchValues={cuisines}
          onChangeSearchValue={onChangeSearchCuisine}
          findByValue={findByCuisine}
        ></DropSearch>
      </div>

      <div className="row">
        {restaurants.map((restaurant) => {
          return <Card key={restaurant._id} restaurant={restaurant} ></Card>;
        })}
      </div>
    </div>
  );
}
