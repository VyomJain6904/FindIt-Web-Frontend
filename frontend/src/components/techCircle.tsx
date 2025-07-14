import { RotatingCircle } from "@/components/ui/rotatingCircle";

export default function TechCircle() {
	return (
		<div className="relative flex items-center justify-center h-[500px] w-full">
			<RotatingCircle path={true} iconSize={60} radius={250}>
				<img src="typescript.svg" alt="Typescript" />
				<img src="golang.svg" alt="Golang" />
				<img src="python.svg" alt="Python" />
				<img src="nextjs.svg" alt="NextJS" />
				<img src="nmap.svg" alt="Nmap" />
			</RotatingCircle>
			<RotatingCircle radius={150} path={true} reverse iconSize={60}>
				<img src="tailwind.svg" alt="TailWindCSS" />
				<img src="postgresql.svg" alt="PostgreSQL" />
				<img src="ubuntu.svg" alt="Ubuntu" />
				<img src="react.svg" alt="React" />
			</RotatingCircle>
		</div>
	);
}
