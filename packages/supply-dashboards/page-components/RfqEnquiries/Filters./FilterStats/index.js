import { Placeholder } from '@cogoport/components';
import React, { useEffect, useState } from 'react';

function MissingRateStats({
	loading, stats, filters, setFilters, tab,
}) {
	const [activeTab, setActiveTab] = useState('active');
	const options = [
		{
			label           : `Running(${stats?.total_open || 0})`,
			value           : 'active',
			backgroundColor : '#f6f5fe',
			color           : '#7e63f3',
		},
		{
			label           : `Closed(${stats?.total_closed || 0})`,
			value           : 'inactive',
			backgroundColor : '#f6f5fe',
			color           : '#7e63f3',
		},
	];

	// const handleSwitch = () => {
	// 	setFilters({ ...filters, status: activeTab });
	// };
	// useEffect(() => {
	// 	handleSwitch();
	// }, [activeTab]);

	return (
		<div>
			<div>
				<div>
					{loading ? (
						<Placeholder width="8px" height="10px" />
					) : (
						stats?.total || 0
					)}
				</div>
			</div>
		</div>
	);
}
export default MissingRateStats;
