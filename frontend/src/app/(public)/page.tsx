import { MovingGlobe } from "@/components/aceternity/MovingGlobe";
import { GridBackground } from "@/components/ui/gridBackground";
import { Tooltip } from "@/components/custom/toolTip";
import CustomSpotlightCard from "@/components/aceternity/SpotlightCard";
import { ResizableNavbar } from "@/components/aceternity/ResizableNavbar";
import { Banner } from "@/components/aceternity/Banner";
import { Footer } from "@/components/custom/Footer";
import ContactUs from "@/components/custom/ContactUs";
import { PricingSection } from "@/components/custom/PricingSection";

export default function Home() {
	return (
		<div className="relative min-h-screen bg-background text-foreground overflow-hidden">
			<Banner />
			<ResizableNavbar hasBanner={true} />
			<div className="flex flex-col items-center justify-start space-y-12 px-4 pt-10 pb-20">
				<MovingGlobe />
				<CustomSpotlightCard />
				<GridBackground />
				<PricingSection />
				<Tooltip />
				<ContactUs />
			</div>
			<Footer />
		</div>
	);
}
