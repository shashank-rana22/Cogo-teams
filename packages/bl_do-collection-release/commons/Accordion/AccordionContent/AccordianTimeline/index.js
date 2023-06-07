import { cl } from '@cogoport/components';
import { v4 as uuid } from 'uuid';

import styles from './styles.module.css';

function AccordianTimeline({ stepCount = '', stepsData = [] }) {
	return (
		<div className={styles.container}>
			{(stepsData || []).map((step, idx) => {
				let step_class = stepCount > idx ? 'fill' : null;
				step_class = stepCount === idx ? 'current' : step_class;

				return (
					<div className={styles.current_step} key={uuid()}>
						<div className={styles.path}>
							<div className={cl`${styles.circle} ${styles[step_class]}`} />
							{idx + 1 !== stepsData?.length ? (
								<div className={cl`${styles[step_class]} ${styles.line}`} />
							) : null}
						</div>
						<div className={cl` ${styles.timeline_step} ${styles[step_class]}`}>{step}</div>
					</div>
				);
			})}
		</div>
	);
}

export default AccordianTimeline;
