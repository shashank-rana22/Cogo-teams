import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function Stepper({ isLastRow = false, index, milestoneSubIndex }) {
	return (
		<div className={cl`${styles.container} ${index > milestoneSubIndex ? styles.next_step : ''}
        ${index === milestoneSubIndex ? styles.curr_dot : ''} `}
		>
			<div className={styles.dot_container}>
				<div className={styles.dot_bg} />
				<div className={styles.dot} />

			</div>

			{!isLastRow ? <div className={styles.line} /> : null}
		</div>
	);
}

export default Stepper;
