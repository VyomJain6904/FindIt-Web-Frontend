export default async function DashboardPage({
	params,
}: {
	params: Promise<{ dashboardId: string }>;
}) {
	const { dashboardId } = await params;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">
				Dashboard: {dashboardId}
			</h1>
			<p>Dashboard details will be available here.</p>
		</div>
	);
}
