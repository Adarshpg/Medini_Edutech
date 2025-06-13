import image from "@/assets/IMAGES/getty-images-82LbsqatQNA-unsplash.jpg"

export function MissionSection() {
    return (
      <section className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-customBlue/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full bg-customBlue/10 dark:bg-customBlue/60 border border-customBlue/20 px-6 py-2 text-sm font-semibold text-customBlue dark:text-white backdrop-blur-sm">
                Our Vision
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                Empowering{" "}
                <span className="text-customBlue bg-gradient-to-r from-customBlue to-blue-600 bg-clip-text text-transparent">
                  Bharat
                </span>{" "}
                by transforming technologies into progress
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                To lead the transformation of individuals, academics, students, and professionals through innovative digital technology. By integrating cutting-edge tools into education and professional development. Our vision is to bridge traditional learning and digital advancements, ensuring that all stakeholders have the skills and knowledge necessary to drive progress and success across diverse industries.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                <div className="group p-6 rounded-xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-customBlue/10 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-customBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Our mission is to provide accessible and transformative digital education and professional development solutions.
                  </p>
                </div>
                
                <div className="group p-6 rounded-xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-customBlue/10 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-customBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Values</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Innovation, excellence, integrity, collaboration, and client success drive everything we do.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 group">
                <div className="absolute -inset-6 bg-gradient-to-r from-customBlue to-blue-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 shadow-2xl">
                  <div className="rounded-xl overflow-hidden">
                    <img 
                      src={`${image}?height=500&width=700`} 
                      alt="Team Collaboration" 
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-customBlue/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>
    )
}