import { IcCFtick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function IRNSuccess() {
	return (
		<div className={styles.flex}>
			<IcCFtick height="30px" width="30px" style={{ marginRight: 12 }} />
			<div>IRN Successfully Generated</div>
		</div>
	);
}

export default IRNSuccess;
