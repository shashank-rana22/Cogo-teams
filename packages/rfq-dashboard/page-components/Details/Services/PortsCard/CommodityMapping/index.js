// import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

const COMMODITY_UNITS_MAPPING = {
	cargo_weight_per_container : 'MT',
	container_size             : 'FT',
	containers_count           : 'Containers',

};

// function ToolTipContent() {
// 	return (
// 		<div className={styles.tooltip_container}>
// 			{data.map((itm = '') => (
// 				<div className={styles.tag}>{itm?.valueText}</div>
// 			))}
// 		</div>
// 	);
// }

function CommodityMapping({ commodity_array }) {
	console.log('commodity_array::', commodity_array);
	return (
		<div className={styles.container}>
			{/* {data.map((item = '') => (
				<div className={styles.tag}>{item?.valueText}</div>
			))} */}

			{commodity_array.map((item = {}) => (
				<div className={styles.tag}>
					{Object.keys(item).map((key) => (
						<span key={key}>
							{item[key]}
							{' '}
							{COMMODITY_UNITS_MAPPING[key]}
						</span>
					))}
				</div>
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
