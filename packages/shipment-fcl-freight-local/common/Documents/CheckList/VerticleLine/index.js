import { IcMTick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function VerticleLine({ checked = false, isLast = false }) {
	return (
		<div className={styles.container}>
			<div className={`${checked ? styles.checked_circle : styles.circle}`}>
				{checked ? <IcMTick /> : null}
			</div>
			{!isLast && (
				<div
					className={`${checked ? styles.checked_line : styles.line}`}
				/>
			)}
		</div>
	);
}

export default VerticleLine;
