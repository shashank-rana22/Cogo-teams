import { ResponsiveLine } from '@cogoport/charts/line/index';

const top_global_supplier_mapping = [
	{ Header: 'Country', accessor: (item) => item.country },
	{ Header: 'Share', accessor: (item) => `${item.percent_share.toFixed(2)}%` },
	{
		Header   : 'Trend',
		accessor : (item) => (
			<div style={{ height: '50px', width: '70px' }}>
				<ResponsiveLine data={[
					{
						id   : item.country,
						data : [
							{
								x : 'January',
								y : item.January || 0,
							},
							{
								x : 'February',
								y : item.February || 0,
							},
							{
								x : 'March',
								y : item.March || 0,
							},
							{
								x : 'April',
								y : item.April || 0,
							},
							{
								x : 'May',
								y : item.May || 0,
							},
							{
								x : 'June',
								y : item.June || 0,
							},
							{
								x : 'July',
								y : item.July || 0,
							},
							{
								x : 'August',
								y : item.August || 0,
							},
							{
								x : 'September',
								y : item.September || 0,
							},
							{
								x : 'October',
								y : item.October || 0,
							},
							{
								x : 'November',
								y : item.November || 0,
							},
							{
								x : 'December',
								y : item.December || 0,
							},

						],
					},
				]}
				/>
			</div>
		),
	},
	{ Header: 'Jan', accessor: (item) => ((item.January !== undefined) ? item.January.toLocaleString('en-IN') : 0) },
	{ Header: 'Feb', accessor: (item) => ((item.February !== undefined) ? item.February.toLocaleString('en-IN') : 0) },
	{ Header: 'Mar', accessor: (item) => ((item.March !== undefined) ? item.March.toLocaleString('en-IN') : 0) },
	{ Header: 'Apr', accessor: (item) => ((item.April !== undefined) ? item.April.toLocaleString('en-IN') : 0) },
	{ Header: 'May', accessor: (item) => ((item.May !== undefined) ? item.May.toLocaleString('en-IN') : 0) },
	{ Header: 'Jun', accessor: (item) => ((item.June !== undefined) ? item.June.toLocaleString('en-IN') : 0) },
	{ Header: 'July', accessor: (item) => ((item.July !== undefined) ? item.July.toLocaleString('en-IN') : 0) },
	{ Header: 'Aug', accessor: (item) => ((item.August !== undefined) ? item.August.toLocaleString('en-IN') : 0) },
	{
		Header   : 'Sept',
		accessor : (item) => ((item.September !== undefined) ? item.September.toLocaleString('en-IN') : 0),
	},
	{ Header: 'Oct', accessor: (item) => ((item.October !== undefined) ? item.October.toLocaleString('en-IN') : 0) },
	{ Header: 'Nov', accessor: (item) => ((item.November !== undefined) ? item.November.toLocaleString('en-IN') : 0) },
	{ Header: 'Dec', accessor: (item) => ((item.December !== undefined) ? item.December.toLocaleString('en-IN') : 0) },
];
export default top_global_supplier_mapping;
