import { ResponsiveLine } from '@cogoport/charts/line/index';
import { isEmpty } from '@cogoport/utils';

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
	{ Header: 'Jan', accessor: (item) => ((!isEmpty(item.January)) ? item.January.toLocaleString('en-IN') : 0) },
	{ Header: 'Feb', accessor: (item) => ((!isEmpty(item.February)) ? item.February.toLocaleString('en-IN') : 0) },
	{ Header: 'Mar', accessor: (item) => ((!isEmpty(item.March)) ? item.March.toLocaleString('en-IN') : 0) },
	{ Header: 'Apr', accessor: (item) => ((!isEmpty(item.April)) ? item.April.toLocaleString('en-IN') : 0) },
	{ Header: 'May', accessor: (item) => ((!isEmpty(item.May)) ? item.May.toLocaleString('en-IN') : 0) },
	{ Header: 'Jun', accessor: (item) => ((!isEmpty(item.June)) ? item.June.toLocaleString('en-IN') : 0) },
	{ Header: 'July', accessor: (item) => ((!isEmpty(item.July)) ? item.July.toLocaleString('en-IN') : 0) },
	{ Header: 'Aug', accessor: (item) => ((!isEmpty(item.August)) ? item.August.toLocaleString('en-IN') : 0) },
	{
		Header   : 'Sept',
		accessor : (item) => ((!isEmpty(item.September)) ? item.September.toLocaleString('en-IN') : 0),
	},
	{ Header: 'Oct', accessor: (item) => ((!isEmpty(item.October)) ? item.October.toLocaleString('en-IN') : 0) },
	{ Header: 'Nov', accessor: (item) => ((!isEmpty(item.November)) ? item.November.toLocaleString('en-IN') : 0) },
	{ Header: 'Dec', accessor: (item) => ((!isEmpty(item.December)) ? item.December.toLocaleString('en-IN') : 0) },
];
export default top_global_supplier_mapping;
