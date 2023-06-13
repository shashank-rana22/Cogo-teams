import { Loader } from '@cogoport/components';

import styles from './styles.module.css';

function CommonLoader({ width = '80vw', height = '40vh' }) {
	return (
		<div style={{ width, height }} className={styles.container}>
			<Loader style={{ height: '50px', width: '50px' }} />
		</div>
	);
}

export default CommonLoader;
