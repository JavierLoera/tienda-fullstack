import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Mousewheel, Keyboard } from "swiper";
import useStyles from "./Slider.styles";
import { ProductType } from "../../types/ProductType";
import Product from "../products/Product";

type Props = {
  products: ProductType[] | undefined;
};

const Slider = ({ products }: Props) => {
  const classes = useStyles();

  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Mousewheel, Keyboard]}
        // modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          500: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: "auto",
            spaceBetween: 50,
          },
        }}
      >
        {products?.map((product: ProductType, idx) => {
          return (
            <SwiperSlide key={idx} className={classes.sliderItem}>
              <Product product={product}></Product>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Slider;
