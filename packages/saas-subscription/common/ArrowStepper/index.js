import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function ArrowStepper({
	items,
	stepperData,
	setGlobalFilters,
	globalFilters = {},
}) {
	const { customer_segment } = globalFilters || {};
	return (
		<div className={styles.stepper_container}>
			{items.map((item) => (
				<div
					key={item.key}
					className={cl`${styles.container} ${customer_segment === item.key ? styles.active : ''}`}
					onClick={() => setGlobalFilters((prev) => ({
						...prev,
						page             : 1,
						customer_segment : item.key,
					}))}
					role="presentation"
				>
					<div className={styles.stepper_arrow}>
						<div className={styles.content_container}>
							<h3 className={styles.content}>{item.title}</h3>
							<p className={cl`${styles.content} ${styles.content_count}`}>count</p>
							<h3 className={styles.content}>{stepperData?.[item.key]}</h3>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default ArrowStepper;
