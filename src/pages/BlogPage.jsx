import { BlogHero } from "@/components/MediniEdutech/blog/BlogHero"
import BlogGrid from "@/components/MediniEdutech/blog/BlogGrid"
import NewsletterSection from "@/components/MediniEdutech/blog/NewsLetter"

function BlogPage() {
  return (
    <div className="flex flex-col w-full">
      <BlogHero />
      <BlogGrid />
      <NewsletterSection />
    </div>
  )
}

export default BlogPage

