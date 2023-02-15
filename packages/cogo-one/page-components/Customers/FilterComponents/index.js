import { Button } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function FilterComponents({
	setFilterVisible = () => { },
}) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					Filters (3)
				</div>

				<div className={styles.styled_icon}>
					<IcMCross width={20} height={20} onClick={() => setFilterVisible(false)} />
				</div>
			</div>

			<div className={styles.filter_container}>
				<div className={styles.label}>
					{/* <RadioController control={fields} /> */}
				</div>
				<div className={styles.filters_types}>
					hello
				</div>
			</div>

			<div className={styles.filter_container}>
				<div className={styles.label}>
					Tags
				</div>
				<div className={styles.filters_types}>
					hello
				</div>
			</div>

			<div className={styles.filter_container}>
				<div className={styles.label}>
					Priority
				</div>
				<div className={styles.filters_types}>
					hello
				</div>
			</div>

			<div className={styles.filter_container}>
				<div className={styles.label}>
					Escalation
				</div>
				<div className={styles.filters_types}>
					hello
				</div>
			</div>

			<div className={styles.actions}>
				<Button size="md" themeType="tertiary" onClick={() => setFilterVisible(false)}>Cancel</Button>
				<Button size="md" themeType="accent">Apply</Button>
			</div>
		</div>
	);
}

export default FilterComponents;
