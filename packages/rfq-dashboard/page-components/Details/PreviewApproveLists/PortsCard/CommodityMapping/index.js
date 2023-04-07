// import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

const data = [
	{
		valueText: '20 Ft',
	},
	{
		valueText: '1 Container',
	},
	{
		valueText: 'Standard',
	},
	{
		valueText: 'General',
	},
	{
		valueText: '18 MT',
	},
];

// function ToolTipContent() {
// 	return (
// 		<div className={styles.tooltip_container}>
// 			{data.map((itm = '') => (
// 				<div className={styles.tag}>{itm?.valueText}</div>
// 			))}
// 		</div>
// 	);
// }

function CommodityMapping() {
	return (
		<div className={styles.container}>
			{data.map((itm = '') => (
				<div className={styles.tag}>{itm?.valueText}</div>
			))}

			{/* {data.length > 5 && (
				<Tooltip
					content={<ToolTipContent data={data} />}
					maxWidth={290}
					theme="light-border"
				/>
			)} */}
		</div>
	);
}
export default CommodityMapping;
