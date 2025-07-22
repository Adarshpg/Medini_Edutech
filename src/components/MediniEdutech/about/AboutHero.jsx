const connectingImage = new URL('../../../../public/images/connecting.png', import.meta.url).href

export function AboutHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-customBlue/5 to-transparent dark:from-customBlue/10"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-customBlue/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center rounded-full border border-customBlue/20 bg-customBlue/5 px-6 py-2 text-sm font-medium backdrop-blur-sm">
              <span className="text-customBlue font-semibold">About Us</span>
              <div className="mx-3 h-1.5 w-1.5 rounded-full bg-customBlue"></div>
              <span className="text-gray-600 dark:text-gray-300">Our Story</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
              Innovating{" "}
              <span className="text-customBlue bg-gradient-to-r from-customBlue to-blue-600 bg-clip-text text-transparent">
                Technology
              </span>{" "}
              Solutions Since 2008
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              Medini Technologies has been a trusted partner for businesses seeking to leverage technology for growth. For over a decade, we have continued to innovate and deliver exceptional solutions, driven by a commitment to our client's long-term success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group inline-flex items-center justify-center rounded-lg bg-customBlue px-8 py-4 text-white font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Learn More
                <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 px-8 py-4 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-white/5 backdrop-blur-sm">
              <img 
                src={connectingImage} 
                alt="Connecting technology and education"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-customBlue/20 rounded-full filter blur-2xl -z-10"></div>
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-blue-500/10 rounded-full filter blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
    </section>
  )
}