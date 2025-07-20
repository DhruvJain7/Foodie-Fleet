import { useContext } from 'react';
import { CDN_URL } from '../../util/constants';
import UserContext from '../../util/UserContext';

const RestaurantCard = (props) => {
  const { loggedInUser } = useContext(UserContext);
  const { name, cuisines, avgRating, sla, cloudinaryImageId, costForTwo } =
    props;

  return (
    <div
      className="m-4 p-4 w-[250px] hover:bg-gray-200 bg-gray-100 "
      data-testid="resCard">
      <img
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
        className="rounded-lg w-full h-54 "
      />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(', ')}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo} </h4>
      <h4>{sla.deliveryTime} minutes</h4>
      <h4>{loggedInUser}</h4>
    </div>
  );
};
export default RestaurantCard;

export const localPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
          Local
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
