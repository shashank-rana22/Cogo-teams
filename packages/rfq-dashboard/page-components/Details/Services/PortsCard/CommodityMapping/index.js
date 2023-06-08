import styles from './styles.module.css';

function CommodityMapping({ commodity_array }) {
	return (
		<div className={styles.container}>
			{commodity_array.map((item = {}) => (

				<div
					className={styles.tag}
					key={item}
				>
					{item}
				</div>

			))}
		</div>
	);
}
export default CommodityMapping;
