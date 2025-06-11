export function CoursesHero() {
    return (
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 z-0"></div>
        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
              <span className="text-primary">Our Courses</span>
              <div className="mx-2 h-1 w-1 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">Comprehensive Solutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Transformative <span className="gradient-text">Technology</span> Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From strategic consulting to implementation and support, our comprehensive services are designed to address
              your most complex business and technology challenges.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      </section>
    )
  }
  
  