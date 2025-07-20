import RestaurantCard, { localPromotedLabel } from './RestaurantCard';

import { useState, useEffect } from 'react';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';

import useOnlineStatus from '../../util/useOnlineStatus';

const Body = () => {
  const [listofRestaurants, setListOfRestaurants] = useState([]);
  const [filteredlistofRestaurants, setFilteredListOfRestaurants] = useState(
    []
  );
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1605529&lng=72.8478554&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'
    );
    const json = await data.json();
    console.log(json);

    setListOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredListOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    console.log('r');
  };
  const onlineStatus = useOnlineStatus();
  // Conditional Rendering
  if (onlineStatus === false) {
    return <h1>Looks Like you are online, check your internet connection</h1>;
  }
  const RestaurantCardPromoted = localPromotedLabel(RestaurantCard);

  return listofRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter-cont flex ">
        <div className="search m-4 p-4  ">
          <input
            type="text"
            className="input-box border border-solid border-black m-2"
            value={searchText}
            placeholder="...Search"
            data-testid="searchInput"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-6  py-2 bg-green-100 rounded-lg  border-0 shadow"
            onClick={() => {
              const searchList = listofRestaurants.filter((res) =>
                res?.info?.name
                  ?.toLowerCase()
                  ?.includes(searchText.toLowerCase())
              );
              setFilteredListOfRestaurants(searchList);
              console.log(searchList);
            }}>
            Search
          </button>
        </div>

        <button
          className="px-4 m-8 py-2  bg-gray-100 rounded-lg border-0 shadow"
          onClick={() => {
            const filteredList = listofRestaurants.filter(
              (res) => res.info.avgRating > 4.2
            );
            setFilteredListOfRestaurants(filteredList);
            console.log(filteredList);
          }}>
          Top Rated Restaurants
        </button>
      </div>

      <div className="flex flex-wrap">
        {filteredlistofRestaurants.map((restaurant) => {
          return (
            <Link
              className="link"
              to={'/restaurant/' + restaurant.info.id}
              key={restaurant.info.id}>
              {restaurant.info.areaName === 'Goregaon West' ? (
                <RestaurantCardPromoted {...restaurant.info} />
              ) : (
                <RestaurantCard {...restaurant.info} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Body;
