import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { fetchCars } from "@/utils";
import Image from "next/image";

//Next.js allows you to set component as asynchronous
export default async function Home() {
  const allCars = await fetchCars();

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
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
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
