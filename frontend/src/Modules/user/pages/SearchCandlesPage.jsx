import React, { useEffect, useState, useContext } from "react";
import ProductCard from "../../../components/ProductCard";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { SearchQuery } from "../../../components/Context";
import axios from "axios"
import {Link} from "react-router-dom"


const FilterSection = ({ title, options, selected, onChange }) => {
  const [open, setOpen] = useState(true);

  // Special handling for price (numeric input)
  if (title === "Price") {
    const [min, max] = selected;

    return (
      <div className="border-b border-gray-200 py-4">
        <button
          onClick={() => setOpen(!open)}
          className="flex justify-between items-center w-full text-lg font-semibold tracking-wide"
        >
          {title}
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {open && (
          <div className="mt-3 flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={min || ""}
              onChange={(e) =>
                onChange("Price", [
                  e.target.value ? Number(e.target.value) : null,
                  max,
                ])
              }
              className="w-20 px-2 py-1 border rounded"
            />
            <input
              type="number"
              placeholder="Max"
              value={max || ""}
              onChange={(e) =>
                onChange("Price", [
                  min,
                  e.target.value ? Number(e.target.value) : null,
                ])
              }
              className="w-20 px-2 py-1 border rounded"
            />
          </div>
        )}
      </div>
    );
  }

  // Default for checkbox filters
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-lg font-semibold tracking-wide"
      >
        {title}
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {open && (
        <div className="mt-3 flex flex-col gap-2">
          {options.map((opt, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => {
                  let updated = [...selected];
                  if (updated.includes(opt)) {
                    updated = updated.filter((x) => x !== opt);
                  } else {
                    updated.push(opt);
                  }
                  onChange(title, updated);
                }}
                className="w-4 h-4 accent-[#C9A489] cursor-pointer"
              />
              <span className="text-sm tracking-wide">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const SearchCandlesPage = () => {
  const [ productDetails , setProductDetails] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/products",
          {withCredentials: true,}
         );
        setProductDetails(response.data?.products); 
        console.log(response.data)// use response.data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // call the async function
  }, []); 
  const value = useContext(SearchQuery);

  

  // filter state
  const [filters, setFilters] = useState({
    "Aroma Level": [],
    "Aroma Type": [],
    "Product Size": [],
    "Burn Time": [],
    "Wax Type": [],
    "Wick Type": [],
    Color: [],
    "Eco-Friendly": [],
    Rating: [],
    Occasion: [],
    Price: [null, null],
  });

  // handle filter change
  const handleFilterChange = (title, selected) => {
    setFilters((prev) => ({ ...prev, [title]: selected }));
  };

  // apply filters + search term
  const filteredProducts = productDetails.filter((p) => {
    const [minPrice, maxPrice] = filters["Price"];

    if (minPrice !== null && p.price < minPrice) return false;
    if (maxPrice !== null && p.price > maxPrice) return false;

    if (
      filters["Aroma Level"].length > 0 &&
      !filters["Aroma Level"].includes(p.more_details?.aromaLevel)
    )
      return false;

    if (
      filters["Aroma Type"].length > 0 &&
      !filters["Aroma Type"].includes(p.more_details?.aromaType)
    )
      return false;

    if (
      filters["Product Size"].length > 0 &&
      !filters["Product Size"].includes(p.more_details?.size)
    )
      return false;

    if (
      filters["Burn Time"].length > 0 &&
      !filters["Burn Time"].includes(p.more_details?.burnTime)
    )
      return false;

    if (
      filters["Wax Type"].length > 0 &&
      !filters["Wax Type"].includes(p.more_details?.waxType)
    )
      return false;

    if (
      filters["Wick Type"].length > 0 &&
      !filters["Wick Type"].includes(p.more_details?.wickType)
    )
      return false;

    if (filters["Color"].length > 0 && !filters["Color"].includes(p.more_details?.color))
      return false;

    if (
      filters["Eco-Friendly"].length > 0 &&
      !filters["Eco-Friendly"].every((f) => p.more_details?.ecoFriendly.includes(f))
    )
      return false;

    if (filters["Rating"].includes("4★ & up") && p.more_details?.rating < 4) return false;
    if (filters["Rating"].includes("3★ & up") && p.more_details?.rating < 3) return false;

    if (
      filters["Occasion"].length > 0 &&
      !filters["Occasion"].includes(p.more_details?.occasion)
    )
      return false;

    // 🔍 search term filter
    if (value.SearchTerm) {
      const searchLower = value.SearchTerm.toLowerCase();
      if (
        !p.name.toLowerCase().includes(searchLower) &&
        !p.description.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }

    return true;
  });

  const filterConfigs = [
    { title: "Aroma Level", options: ["Soft", "Medium", "Strong"] },
    {
      title: "Aroma Type",
      options: ["Fruits", "Floral", "Nature", "Woody", "Spices", "Parfum"],
    },
    { title: "Product Size", options: ["Small", "Medium", "Large"] },
    { title: "Burn Time", options: ["< 20 hrs", "20–40 hrs", "40+ hrs"] },
    {
      title: "Wax Type",
      options: ["Soy", "Beeswax", "Paraffin", "Coconut", "Blend"],
    },
    {
      title: "Wick Type",
      options: ["Single Wick", "Multi Wick", "Wooden Wick"],
    },
    { title: "Price", options: [] },
    {
      title: "Color",
      options: ["White", "Black", "Red", "Pink", "Green", "Orange"],
    },
    { title: "Eco-Friendly", options: ["Vegan", "Cruelty-Free", "Handmade"] },
    { title: "Rating", options: ["4★ & up", "3★ & up"] },
    {
      title: "Occasion",
      options: ["Gift Sets", "Holiday", "Romantic", "Relaxation", "Luxury"],
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 bg-bg">
      <div className="upper">{/* <Search /> */}</div>

      <div className="main flex gap-6 relative">
        <aside className="sm:w-1/4 w-1/2 bg-[#FDF8F4] p-5 sticky top-0 rounded-lg border border-[#E5E1DC] font-heading">
          <h2 className="text-xl font-bold mb-4">Filters</h2>

          {filterConfigs.map((filter) => (
            <FilterSection
              key={filter.title}
              title={filter.title}
              options={filter.options}
              selected={filters[filter.title]}
              onChange={handleFilterChange}
            />
          ))}
        </aside>
        <div className="cardMainRight h-[77vh] overflow-y-scroll w-3/4 grid  gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {filteredProducts.length === 0 ? (
            <div>No Candles Found</div>
          ) : (
            filteredProducts.map((eachProduct, i) => (
              <Link to={`/search-candles/${eachProduct._id}`} key={i}>
               <ProductCard key={i} eachProduct={eachProduct} /></Link>
            ))
          )}
        </div>
        </div>
      </div>
  );
};

export default SearchCandlesPage;
