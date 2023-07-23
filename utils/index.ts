//code to use rapidApis cars api - reusable utility function
import axios from "axios";

export async function fetchCars(params: any = { model: "corolla" }) {
  const headers = {
    "X-RapidAPI-Key": "16e57c0df1msh015c9bdfab5984ep124f14jsn4f03e1a7ad04",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const options = {
    method: "GET",
    url: "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars",
    params,
    headers,
  };

  try {
    const response = await axios.request(options);
    const cars = response.data;
    return cars;
  } catch (error) {
    console.error(error);
  }
}

//func to mock calculate rental price per vehicle based on year, mileage, etc.
export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};
