import { IcMArrowBack } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ReviewAndCriteria() {
	return (
		<div>
			<div className={styles.header}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.title}>New Test</div>
			</div>
		</div>
	);
}

export default ReviewAndCriteria;
