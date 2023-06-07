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
				<>
					{Object.keys(item).map((key) => (item[key]
						? (
							<div
								key={key}
								className={styles.tag}
							>
								<span key={key}>
									{item[key]}
									{' '}
									{COMMODITY_UNITS_MAPPING[key]}
								</span>
							</div>
						) : null
					))}
				</>
			))}
		</div>
	);
}
export default CommodityMapping;
