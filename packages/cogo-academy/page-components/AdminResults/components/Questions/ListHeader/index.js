import styles from './styles.module.css';
import getTableHeaderMapping from './utils/getTableHeaderMapping';

function ListHeader({ type = '' }) {
	const MAPPING = getTableHeaderMapping({ type });

	return (
		<div className={styles.container}>
			{Object.keys(MAPPING).map((item) => {
				const { label, style } = MAPPING[item];

				return (
					<div key={item} className={styles.item} style={{ ...style }}>
						{label}
					</div>
				);
			})}
		</div>
	);
}

export default ListHeader;
