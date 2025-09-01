import { LoginButton } from "@/components/loginButton";
import { MovingGlobe } from "@/components/movingGlobe";
import { SearchDomainBox } from "@/components/searchBox";
import { GridBackground } from "@/components/ui/gridBackground";
import { Tooltip } from "@/components/toolTip";
import CustomSpotlightCard from "@/components/spotLightCard";
import TechCircle from "@/components/techCircle";

export default function Home() {
	return (
		<div className="relative min-h-screen bg-black">
			<LoginButton />
			<div className="flex flex-col items-center justify-center min-h-screen space-y-8 px-4">
				<MovingGlobe />
				<SearchDomainBox />
				<CustomSpotlightCard />
				<GridBackground />
				<TechCircle />
				<Tooltip />
			</div>
		</div>
	);
}
