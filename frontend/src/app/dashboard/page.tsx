import { DashboardSideBar } from "@/components/dashboardPageUI/dashboardSideBar";

export default function Home() {
	return (
		<div className="relative min-h-screen">
			<div className="flex flex-col items-center justify-center min-h-screen space-y-8 px-4 bg-black">
				<DashboardSideBar />
			</div>
		</div>
	);
}
