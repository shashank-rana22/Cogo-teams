import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Row() {
	return (
		<div className={styles.flex}>
			<Placeholder width="150px" height="16px" />
		</div>
	);
}

function Loader() {
	return (
		<div className={styles.flex_column}>
			<Row />
			<Row />
		</div>
	);
}

export default Loader;
