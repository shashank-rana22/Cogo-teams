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
		</div>
	);
}
export default CommodityMapping;
