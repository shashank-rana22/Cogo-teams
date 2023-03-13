import React from 'react';

// import useGetAllocationKamExpertiseDashboard from '../../../hooks/useGetAllocationKamExpertiseDashboard';

function ThisMonth({ params }) {
	// const {
	// 	loading,
	// 	// DashboardData,
	// } = useGetAllocationKamExpertiseDashboard(params);

	// if (loading) {
	// 	return (
	// 		<div>
	// 			loading ...
	// 		</div>
	// 	);
	// }

	return (
		<div>
			<div>
				start_date =
				{' '}
				{params.start_date}
			</div>
			<div>
				end_date =
				{' '}
				{params.end_date}
			</div>
		</div>
	);
}

export default ThisMonth;
