import { Loader } from '@cogoport/components';

import styles from './styles.module.css';

function TemporaryLoader() {
	return (
		<div className={styles.container}>
			<Loader className={styles.loading} />
		</div>
	);
}

export default TemporaryLoader;
