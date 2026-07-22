import { useEffect } from 'react'
import AnnouncementBar from '../components/AnnouncementBar'
import Navbar from '../components/Navbar'
import HeroSlider from '../components/HeroSlider'
import CategoryShowcase from '../components/CategoryShowcase'
import IphoneReveal from '../components/IphoneReveal'
import ProductLines from '../components/ProductLines'
import DjiReveal from '../components/DjiReveal'
import DjiLines from '../components/DjiLines'
import OakleyReveal from '../components/OakleyReveal'
import OakleyLines from '../components/OakleyLines'
import FundasReveal from '../components/FundasReveal'
import FundasLines from '../components/FundasLines'
import FeaturedProducts from '../components/FeaturedProducts'
import WhyUs from '../components/WhyUs'
import Footer from '../components/Footer'
import WhatsAppFab from '../components/WhatsAppFab'

export default function Landing() {
  useEffect(() => {
    if (window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <HeroSlider />
      <CategoryShowcase />
      <IphoneReveal />
      <ProductLines defaultTab={0} />
      <DjiReveal />
      <DjiLines />
      <OakleyReveal />
      <OakleyLines />
      <FundasReveal />
      <FundasLines />
      <FeaturedProducts />
      <WhyUs />
      <Footer />
      <WhatsAppFab />
    </>
  )
}
