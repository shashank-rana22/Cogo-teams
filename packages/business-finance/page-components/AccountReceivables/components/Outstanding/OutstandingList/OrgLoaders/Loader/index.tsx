import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Row() {
	return (
		<div className={styles.Flex}>
			<Placeholder width="150px" height="16px" />
		</div>
	);
}

function Loader() {
	return (
		<div className={styles.FlexColumn}>
			<Row />
			<Row />
		</div>
	);
}

export default Loader;
