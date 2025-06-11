import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

export function FaqSection() {
    const faqs = [
        {
          question: "What courses does Medini Technologies offer?",
          answer:
            "Medini Technologies offers a wide range of courses in CAD, BIM, MEP, Structural Engineering, Manufacturing Design, and more. Our programs cover tools like AutoCAD, Revit, STAAD Pro, SolidWorks, and other industry-standard software.",
        },
        {
          question: "Are the courses suitable for beginners?",
          answer:
            "Yes! We offer courses for beginners, intermediate learners, and advanced professionals. Our structured curriculum ensures that students with no prior experience can start from the basics and gradually advance.",
        },
        {
          question: "Do you provide certifications upon course completion?",
          answer:
            "Yes, all our courses come with industry-recognized certifications that can boost your career prospects. Our certifications validate your expertise in the respective domain and are widely accepted by employers.",
        },
        {
          question: "Can I take courses online, or are they only available in person?",
          answer:
            "Medini Technologies offers both online and offline training options. Our online courses provide live sessions, recorded content, and hands-on projects, while in-person classes allow for interactive, instructor-led learning.",
        },
        {
          question: "What is the duration of the courses?",
          answer:
            "The course duration varies based on the program. Short-term courses last 4-6 weeks, while comprehensive programs can take 3-6 months. We also offer customized corporate training based on company requirements.",
        },
        {
          question: "Do you provide job assistance after course completion?",
          answer:
            "Yes, we offer placement assistance, resume-building support, and mock interviews to help our students secure jobs. Many of our graduates work in top design, engineering, and manufacturing firms.",
        },
      ]
    
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Find answers to common questions about our services, process, and approach.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

