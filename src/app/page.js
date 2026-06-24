import BannerSlider from "@/components/Banner";
import EbookGenres from "@/components/EbookGenres";
import ShowcasePage from "@/components/ShowcasePage";
import TopWriters from "@/components/TopWriters";
import TrendingBooks from "@/components/TrendingBooks";

export default function Home() {
  return (
    <div>
      <BannerSlider/>
      <ShowcasePage/>
      <TrendingBooks/>
      <TopWriters/>
      <EbookGenres></EbookGenres>
    </div>
  );
}
