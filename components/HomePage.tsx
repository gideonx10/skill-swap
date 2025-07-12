import Landing from '@/components/homepage/Landing';
import HowItWorks from '@/components/homepage/HowItWorks';
import UseCases from '@/components/homepage/UseCases';
import Testimonials from '@/components/homepage/Testimonals';
import Footer from '@/components/homepage/Footer';

export default function HomePage() {
  return (
    <>
      <Landing/>
      <HowItWorks />
    <UseCases />
    <Testimonials />
    <Footer />
      </>
      );
}
