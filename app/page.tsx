import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { fetchCars } from "@/utils";
import Image from "next/image";

//next.js allows for extracting all the search params straight from the props of a specific page
//will update when search params update

//Next.js allows you to set component as asynchronous
export default async function Home({ searchParams }: any) {
  const allCars = await fetchCars({
    make: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel_type: searchParams.fuel || "",
    limit: searchParams.limit || 5,
    model: searchParams.model || "",
  });

  const isCarDataEmpty =
    !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  //if you do a simple console log without specify that this component is a client component,
  //then by default all components/page in next.js will be server side component- so the fetchCars func is execute by server and not by browser
  //so log shows up in terminal in vscode and not in browser console.
  // console.log(allCars);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width " id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        <div>
          {!isCarDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car, idx) => (
                  <CarCard key={idx} car={car} />
                ))}
              </div>
              <ShowMore
                pageNumber={(searchParams.limit || 5) / 5}
                isNext={(searchParams.limit || 5) > allCars.length}
              />
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">
                Oops... no results found.
                {typeof allCars === "string" && <p>{allCars}</p>}
              </h2>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
