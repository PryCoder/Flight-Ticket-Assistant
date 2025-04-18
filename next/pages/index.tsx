import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Carousel, CarouselItem } from '@/components/ui/carousel';
import { Alert } from '@/components/ui/alert';
import Head from 'next/head'; // Import Next.js Head component

// Dynamically load the Spline component and disable SSR
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function Odysey() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center font-sans">

      {/* Using Next.js Head component to add Google Fonts */}
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&display=swap"
        />
      </Head>

      {/* Navigation Bar */}
      <nav className="w-full fixed top-0 left-0 bg-black text-white p-6 shadow-lg z-50">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-wide font-poppins">Travel Odyssey</h1>
          <div className="space-x-6">
            <a href="#services" className="hover:underline font-roboto">Services</a>
            <a href="#testimonials" className="hover:underline font-roboto">Testimonials</a>
            <a href="#contact" className="hover:underline font-roboto">Contact</a>
            <Link href="/SignIn">  {/* Define the target route here */}
      <Button variant="outline" className="px-6 py-2 font-roboto">
        Sign In
      </Button>
    </Link>
    <Link href="/SignUp">  {/* Define the target route here */}
      <Button variant="outline" className="px-6 py-2 font-roboto">
        Sign Up
      </Button>
    </Link>
          </div>
        </div>
      </nav>

      {/* Alert Section */}
      <Alert
        title="Welcome to Travel Adventures"
        description="Discover exciting journeys around the world!"
        type="success"
        className="my-24 mx-6 px-8 py-4 bg-white/20 backdrop-blur-lg text-white rounded-xl shadow-xl border border-white/30 transition-transform transform hover:scale-105"
      />

      {/* Header Section */}
      <header className="w-full py-40 bg-gradient-to-t from-black via-gray-900 to-black text-white relative flex flex-col items-center justify-center z-20">
        <div className="container mx-auto text-center px-6 z-10">
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-wide mb-6 animate__animated animate__fadeIn animate__delay-1s font-poppins">
            Explore the World Your Way
          </h1>
          <p className="text-lg sm:text-xl opacity-80 mb-8 animate__animated animate__fadeIn animate__delay-2s font-roboto">
            Whether by air, land, or sea, your next adventure starts here.
          </p>
          <Button variant="primary" className="px-12 py-5 text-lg bg-gradient-to-r from-teal-500 to-blue-600 hover:scale-110 transition duration-300 ease-in-out shadow-xl">
            Book Your Journey
          </Button>
        </div>

        {/* Background Animation - Spline Scene */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <Spline
            scene="https://prod.spline.design/zYxPa2iOD7AfSzo5/scene.splinecode"
            style={{ width: '100vw', height: '100vh' }} // Increase size by 150%
          />
        </div>

        {/* Overlay Gradient to blend Spline */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10"></div>
      </header>

      {/* Services Section */}
      <section id="services" className="my-16 w-full max-w-7xl mx-auto px-6 z-10 mt-40">
        <h2 className="text-4xl sm:text-5xl text-center font-extrabold mb-12 font-poppins">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Air Travel Card */}
          <Card className="bg-white/20 backdrop-blur-lg text-white shadow-2xl rounded-xl hover:scale-105 transition-all duration-300 ease-in-out p-8 border border-white/30">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 font-poppins">Air Travel</h3>
            <p className="text-gray-300 mb-6 font-roboto">Fly to your dream destinations with ease and comfort. Choose from a variety of flights to top locations worldwide.</p>
            <Button variant="secondary" className="text-white bg-black hover:bg-gray-700 transition duration-300 ease-in-out">
              Explore Flights
            </Button>
          </Card>

          {/* Road Trips Card */}
          <Card className="bg-white/20 backdrop-blur-lg text-white shadow-2xl rounded-xl hover:scale-105 transition-all duration-300 ease-in-out p-8 border border-white/30">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 font-poppins">Road Trips</h3>
            <p className="text-gray-300 mb-6 font-roboto">Hit the open road and explore new places with scenic routes and comfortable vehicles tailored for your journey.</p>
            <Button variant="secondary" className="text-white bg-black hover:bg-gray-700 transition duration-300 ease-in-out">
              Start Your Journey
            </Button>
          </Card>

          {/* Cruises Card */}
          <Card className="bg-white/20 backdrop-blur-lg text-white shadow-2xl rounded-xl hover:scale-105 transition-all duration-300 ease-in-out p-8 border border-white/30">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 font-poppins">Cruises</h3>
            <p className="text-gray-300 mb-6 font-roboto">Set sail on luxurious cruise ships to exotic destinations with everything you need on board.</p>
            <Button variant="secondary" className="text-white bg-black hover:bg-gray-700 transition duration-300 ease-in-out">
              Explore Cruises
            </Button>
          </Card>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="testimonials" className="my-16 w-full max-w-4xl mx-auto px-6 z-10 mt-40">
        <h2 className="text-4xl sm:text-5xl text-center font-extrabold mb-12 font-poppins">What Our Customers Say</h2>
        <Carousel className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl p-6">
          <CarouselItem className="text-center">
            <p className="text-2xl sm:text-3xl font-semibold text-gray-200 mb-4 font-roboto">"Travel Adventures made our honeymoon unforgettable!"</p>
            <Badge className="bg-gradient-to-r from-gray-700 to-gray-500 text-white p-2 rounded-full">Customer</Badge>
          </CarouselItem>
          <CarouselItem className="text-center">
            <p className="text-2xl sm:text-3xl font-semibold text-gray-200 mb-4 font-roboto">"The road trip experience was amazing!"</p>
            <Badge className="bg-gradient-to-r from-gray-700 to-gray-500 text-white p-2 rounded-full">Customer</Badge>
          </CarouselItem>
        </Carousel>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 w-full text-center mt-auto z-10">
        <p className="font-roboto text-lg">© 2025 Travel Adventures. All rights reserved.</p>
      </footer>
    </div>
  );
}
