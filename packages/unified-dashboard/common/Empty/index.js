import Icon from '../../Icons/empty.svg';

import styles from './styles.module.css';

function Empty() {
	return (
		<div className={styles.section}>
			<Icon className={styles.svg} />
			<div className={styles.text}>
				No data Found
			</div>
		</div>
	);
}

export default Empty;
