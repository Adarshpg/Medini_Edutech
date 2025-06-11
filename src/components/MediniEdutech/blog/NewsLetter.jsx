import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function NewsletterSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tight">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground">
            Stay updated with the latest technology trends, industry insights, and company news. We'll send you valuable
            content directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button type="submit">Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection