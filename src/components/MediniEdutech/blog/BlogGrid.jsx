import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User, Tag } from "lucide-react"
// import { Link } from "react-router-dom"

function BlogGrid() {
  const posts = [
    {
      title: "The Future of BIM: How Digital Twins Are Transforming Construction",
      excerpt: "Explore how Building Information Modeling (BIM) and digital twins are enhancing efficiency, reducing costs, and improving project management in modern construction.",
      category: "BIM for Construction",
      date: "March 26, 2025",
      author: "John Anderson",
      image: "https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg",
      readTime: "5 min read"
    },
    {
      title: "Revit vs. AutoCAD: Which One Should You Learn for AEC?",
      excerpt: "A comparison of Revit and AutoCAD, their use cases in architecture, engineering, and construction, and how professionals can leverage them for better design workflows.",
      category: "AEC",
      date: "March 18, 2025",
      author: "Sophia Lee",
      image: "https://images.pexels.com/photos/442574/pexels-photo-442574.jpeg",
      readTime: "7 min read"
    },
    {
      title: "How SOLIDWORKS and Fusion 360 Are Revolutionizing Product Design",
      excerpt: "A deep dive into SOLIDWORKS vs. Fusion 360, their strengths in product design, and which one suits your manufacturing needs.",
      category: "Product Design",
      date: "March 10, 2025",
      author: "David Martinez",
      image: "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg",
      readTime: "6 min read"
    },
    {
      title: "Smart Cities: How Civil 3D and InfraWorks Are Shaping Urban Development",
      excerpt: "Learn how Civil 3D and InfraWorks are transforming urban planning, transportation networks, and smart city development.",
      category: "Infrastructure",
      date: "March 5, 2025",
      author: "Emma Wilson",
      image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg",
      readTime: "8 min read"
    },
    {
      title: "Water Infrastructure Planning with Bentley's WaterGEMS & SewerGEMS",
      excerpt: "How WaterGEMS and SewerGEMS help engineers design efficient water distribution and wastewater management systems.",
      category: "Water Services",
      date: "February 28, 2025",
      author: "Liam Patel",
      image: "https://images.pexels.com/photos/2409022/pexels-photo-2409022.jpeg",
      readTime: "6 min read"
    },
    {
      title: "The Rise of BIM for Construction: Why It's a Game-Changer",
      excerpt: "Learn how BIM for Construction is improving collaboration, cost estimation, and risk management on large construction sites.",
      category: "BIM for Construction",
      date: "February 20, 2025",
      author: "Olivia Chen",
      image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg",
      readTime: "5 min read"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "BIM for Construction": "bg-customBlue/10 text-customBlue border-customBlue/20",
      "AEC": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
      "Product Design": "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400",
      "Infrastructure": "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400",
      "Water Services": "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400"
    };
    return colors[category] || "bg-gray-500/10 text-gray-600 border-gray-500/20 dark:text-gray-400";
  };

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest <span className="text-customBlue">Articles</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover insights, tutorials, and industry trends from our expert team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card key={index} className="group bg-card/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <div className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md ${getCategoryColor(post.category)}`}>
                    <Tag className="h-3 w-3" />
                    {post.category}
                  </div>
                </div>

                {/* Read Time */}
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full px-3 py-1 text-xs text-white font-medium">
                  {post.readTime}
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold leading-tight group-hover:text-customBlue transition-colors duration-300">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More Button */}
                {/* <div className="pt-2">
                  <Button 
                    asChild 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 p-0 h-auto font-medium text-customBlue hover:text-customBlue/80 hover:bg-transparent group/btn"
                  >
                    <a href="/blog/post">
                      Read More 
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </a>
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-16">
          <Button 
            asChild 
            size="lg" 
            className="bg-customBlue hover:bg-customBlue/90 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default BlogGrid;