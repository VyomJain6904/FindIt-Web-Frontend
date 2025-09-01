import { ResultSideBar } from "@/components/resultPageUI/resultSideBar";

export default function Home() {
	return (
		<div className="relative h-full w-full ">
			<div className="flex flex-col items-center justify-center h-full w-full bg-black">
				<ResultSideBar />
			</div>
		</div>
	);
}
