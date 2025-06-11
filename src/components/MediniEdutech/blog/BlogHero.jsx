import { Newspaper, TrendingUp } from "lucide-react"

export function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />
      
      <div className="container relative z-10 py-24 md:py-32 lg:py-40">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-customBlue/20 bg-customBlue/5 px-6 py-2 text-sm font-medium backdrop-blur-sm">
            <Newspaper className="h-4 w-4 text-customBlue" />
            <span className="text-customBlue font-semibold">Blog & Insights</span>
            <div className="h-1 w-1 rounded-full bg-customBlue/60" />
            <span className="text-muted-foreground">Latest Updates</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Technology{" "}
              <span className="relative">
                <span className="text-customBlue">Insights</span>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-customBlue/60 via-customBlue to-customBlue/60 rounded-full" />
              </span>
              <br />
              <span className="text-muted-foreground/80">& Trends</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest technology trends, industry insights, and expert perspectives 
            from our team of professionals in AEC, BIM, and digital transformation.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-customBlue" />
              <span className="font-medium">6 Articles</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-4 w-4 rounded-full bg-green-500" />
              <span className="font-medium">Weekly Updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-customBlue/30 to-transparent" />
    </section>
  )
}