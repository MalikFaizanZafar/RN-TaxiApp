import axios from "axios";
import { SERVER_URL } from "../constants";
const URL = SERVER_URL;

export const getNearestFranchises = (data, type) => {
  const dataArr = [];
  const d = data
    .filter(item => item.type === type)
    .map(item => item.id)
    .filter((val, index, self) => self.indexOf(val) === index);
  d.forEach(i => {
    const filteredRes = data.filter(
      item => i === item.id && item.type === type
    )[0];
    dataArr.push(filteredRes);
  });
  return dataArr;
};

export const LandingTabClickHandler = (data, tabIndex) => {
  if (tabIndex === 0) {
    return getNearestFranchises(data, "franchise");
  }
  if (tabIndex === 1) {
    return getNearestFranchises(data, "deal");
  }
};

export const LandingSearchHandler = (
  latitude,
  longitude,
  distance,
  searchKey,
  tabIndex
) => {
  return new Promise((resolve, reject) => {
    if (!searchKey) {
      axios
        .get(
          `${URL}/api/filter?lat=${latitude}&long=${longitude}&distance=${distance}`
        )
        .then(searchResponse => {
          resolve(
            getNearestFranchises(
              searchResponse.data.data,
              tabIndex === 0 ? "franchise" : "deal"
            )
          );
        })
        .catch(searchError => {
          console.log("searchError is : ", searchError);
          reject(searchError);
        });
    } else {
      axios
        .get(
          `${URL}/api/filter?lat=${latitude}&long=${longitude}&distance=${distance}&filter=${searchKey}`
        )
        .then(searchResponse => {
          resolve(
            getNearestFranchises(
              searchResponse.data.data,
              tabIndex === 0 ? "franchise" : "deal"
            )
          );
        })
        .catch(searchError => {
          console.log("searchError is : ", searchError);
          reject(searchError);
        });
    }
  });
};

export const getUniqueFranchiseCategories = itemArray => {
  const categories = [{ id: -1, name: "All" }];
  const d = itemArray
    .map(item => item.category.id)
    .filter((val, index, self) => self.indexOf(val) === index);
  d.forEach(i => {
    const filteredRes = itemArray.filter(item => i === item.category.id)[0];
    categories.push({
      id: filteredRes.category.id,
      name: filteredRes.category.name
    });
  });
  return categories;
};

export const getGroupedOrders = ordersArray => {
  let groupedOrders = [];
  const d = ordersArray
    .map(item => item.franchiseId)
    .filter((val, index, self) => self.indexOf(val) === index);
  console.log(d);
  d.forEach(i => {
    const items = [];
    let deals = [];
    ordersArray
      .filter(item => i === item.franchiseId)
      .forEach(f => {
        if(f.type === 'deal'){
          deals.push({ id: f.id, quantity: f.quantity });
        }else {
          items.push({ id: f.id, quantity: f.quantity });
        }
      });
    groupedOrders.push({ franchiseId: i, items: items, deals: deals });
  });
  return groupedOrders;
};
