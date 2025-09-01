import FuzzyText from "@/components/custom/TextAnimations/FuzzyText/FuzzyText";

export default function NotFound() {
	return (
		<>
			<div className="text-5xl text-center flex items-center justify-center h-screen w-screen">
				<FuzzyText baseIntensity={0.2} hoverIntensity={0.3} enableHover={true}>
					404! Not Found
				</FuzzyText>
			</div>
		</>
	);
}
