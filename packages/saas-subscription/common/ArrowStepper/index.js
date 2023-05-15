import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function ArrowStepper({
	active,
	setActive,
	items,
}) {
	return (
		<div className={styles.stepper_container}>
			{items.map((item) => (
				<div
					className={cl`${styles.container} ${active === item.key ? styles.active : ''}`}
					onClick={() => setActive(item.key)}
					role="presentation"
				>
					<div className={styles.stepper_arrow}>
						<div className={styles.content_container}>
							<h3 className={styles.content}>{item.title}</h3>
							<p className={cl`${styles.content} ${styles.content_count}`}>count</p>
							<h3 className={styles.content}>{item.count}</h3>

						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default ArrowStepper;
