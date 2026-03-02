import { useNavigate } from "react-router-dom"
import {Section} from  "../../components/ui/Section"
import {Hero} from "../../components/landingpage/Hero"
import {ValueProposition} from "../../components/landingpage/ValueProposition"
import {Features} from "../../components/landingpage/Features"

export default function LandingPage () {
  const navigate = useNavigate()
    return <>
    <Section variant='default' size='md'>
        <Hero />
        <ValueProposition />
        <Features />
      </Section>
    </>
}
