import { Fragment } from 'react';

import styles from './styles.module.css';

const COMMODITY_UNITS_MAPPING = {
	cargo_weight_per_container : 'MT',
	container_size             : 'FT',
	containers_count           : 'Containers',

};

function CommodityMapping({ commodity_array }) {
	return (
		<div className={styles.container}>
			{commodity_array.map((item = {}) => (
				<Fragment key={`${item}`}>
					{Object.keys(item).map((key) => (item[key]
						? (
							<div
								key={key}
								className={styles.tag}
							>
								<span>
									{item[key]}
									{' '}
									{COMMODITY_UNITS_MAPPING[key]}
								</span>
							</div>
						) : null
					))}
				</Fragment>
			))}
		</div>
	);
}
export default CommodityMapping;
