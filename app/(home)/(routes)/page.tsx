import Image from "next/image";

import { Button } from "@/components/ui/button";
import mainCharacterImage from "../../../public/images/home/home-page-main-character.png";
import "../_components/home.css";
import SwiperCarousel from "@/components/swiper-carousel";
import Catalog from "../_components/catalog";
import VerticalCarousel from "../_components/verticle-carousel";

export default function Home() {
  return (
    <>
      <div className="background-home-div relative bg-black h-max">
        <div className="mx-auto container">
          <div className="absolute ">
            <Image
              src={mainCharacterImage}
              alt="Main Character"
              height={1070}
            />
          </div>

          <div className="pt-[125px] pl-[65px]">
            <p className="font-primaryFont text-[130px] font-medium text-white leading-none">
              BLACK MYTH
            </p>
            <p className="font-primaryFont  text-[149px] font-bold text-white leading-none">
              WUKONG
            </p>
            <div className="h-1 w-[1000px] bg-white mt-8"></div>
            <p className="text-white font-primaryFont font-semibold text-[16px] w-[600px] leading-tight mt-6 mb-8">
              Black Myth: Wukong is an action RPG rooted in Chinese mythology.
              You shall set out as the Destined One to venture into the
              challenges and marvels ahead, to uncover the obscured truth
              beneath the veil of a glorious legend from the past.
            </p>

            <Button className="bg-[#FB5A00] px-12 text-[30px] font-primaryFont font-medium py-8">
              Buy Noww
            </Button>
          </div>
        </div>

        <div className="reduce-background-brightness"></div>
      </div>
      <SwiperCarousel />

      <Catalog />
    </>
  );
}
