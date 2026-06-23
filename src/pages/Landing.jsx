import AnnouncementBar from '../components/AnnouncementBar'
import Navbar from '../components/Navbar'
import HeroSlider from '../components/HeroSlider'
import IphoneReveal from '../components/IphoneReveal'
import ProductLines from '../components/ProductLines'
import DjiReveal from '../components/DjiReveal'
import DjiLines from '../components/DjiLines'
import CategoryBanners from '../components/CategoryBanners'
import FeaturedProducts from '../components/FeaturedProducts'
import BrandBanners from '../components/BrandBanners'
import WhyUs from '../components/WhyUs'
import Brands from '../components/Brands'
import Footer from '../components/Footer'
import WhatsAppFab from '../components/WhatsAppFab'

export default function Landing() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <HeroSlider />
      <IphoneReveal />
      <ProductLines defaultTab={0} />
      <DjiReveal />
      <DjiLines />
      <CategoryBanners />
      <FeaturedProducts />
      <BrandBanners />
      <WhyUs />
      <Brands />
      <Footer />
      <WhatsAppFab />
    </>
  )
}
