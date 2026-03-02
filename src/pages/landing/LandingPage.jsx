import { useNavigate } from "react-router-dom"
import {Section} from  "../../components/ui/Section"
import Hero from "../../components/landingpage/Hero"
import ValueProposition from "../../components/landingpage/ValueProposition"
import Features from "../../components/landingpage/Features"
import Showcase from "../../components/landingpage/Showcase"
import CTA from "../../components/landingpage/CTA"

export default function LandingPage () {
  const navigate = useNavigate()
    return <>
    <Section variant='default' size='md'>
        <Hero />
        <ValueProposition />
        <Features />
        <Showcase />
        <CTA />
      </Section>
    </>
}
