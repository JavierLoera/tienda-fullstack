import { useEffect, useState, useRef } from "react";
import { getCategories } from "../../api/categories";
import { Grid } from "@mui/material";
import { ProductType } from "../../types/ProductType";
import ProductGridItem from "../products/ProductGridItem";
import {
  fetchProductsByCategory,
  selectNewCategory,
  incrementPage,
} from "../../redux/slices/productsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";

export const Categories = () => {
  const [categories, setCategories] = useState<
    Array<{ id: number; name: string }>
  >([]);

  const [categorySelected, setCategorySelected] = useState<number | string>(
    "all"
  );

  const dispatch = useAppDispatch();
  const { productsCategorySelected, page } = useAppSelector(
    (state) => state?.products
  );

  const [isIntersected, setIsIntersected] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersected(entry.isIntersecting);
      },
      { rootMargin: "0px", threshold: 0.5 }
    );

    if (isIntersected) {
      dispatch(incrementPage());
    }
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isIntersected, dispatch]);

  useEffect(() => {
    dispatch(fetchProductsByCategory({ categoryId: categorySelected, page }));
  }, [page, dispatch, categorySelected]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);

  const handleSelectCategory = (categoryId: string | number) => {
    dispatch(selectNewCategory());
    setCategorySelected(categoryId);
  };

  return (
    <>
      <div style={{ width: "90%", margin: "0 auto" }}>
        <h3 style={{ textAlign: "center", fontSize: "4vmin" }}>All</h3>
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            listStyle: "none",
            fontSize: "2.5vmin",
          }}
        >
          <li
            onClick={() => handleSelectCategory("all")}
            style={{ textTransform: "uppercase" }}
          >
            All
          </li>
          {categories.map((category, idx) => {
            return (
              <li
                onClick={() => handleSelectCategory(category.id)}
                key={category.id}
              >
                {category.name}
              </li>
            );
          })}
        </ul>
      </div>
      <Grid
        style={{ width: "90%", margin: "0 auto", height: "auto" }}
        container
        rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 5 }}
      >
        {productsCategorySelected.map((product: ProductType) => {
          return (
            <ProductGridItem
              key={product.id}
              product={product}
            ></ProductGridItem>
          );
        })}
      </Grid>
      <div ref={ref} className="footer">
        footer
      </div>
    </>
  );
};

export default Categories;
