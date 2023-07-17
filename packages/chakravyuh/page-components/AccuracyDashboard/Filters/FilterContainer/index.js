import { Button, Pill } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function FilterContainer() {
	const CLASS_TYPE = 'sea';

	if (CLASS_TYPE === 'sea') {
		return (
			<div className={styles.main_container}>
				<div className={styles.header_row}>
					<span className={styles.title}>Filters</span>
					<Button themeType="accent">Apply</Button>
				</div>
				<div className={styles.filters_container}>
					<div className={styles.filter_row}>
						<p className={styles.row_label}>Rate Source</p>
						<div>
							<Pill color="#FFFFFF" className={styles.default_pill} prefix={<IcMTick />}>
								Supply Rate
							</Pill>
							<Pill color="#FFFFFF" className={styles.default_pill} prefix={<IcMTick />}>
								Predicted Rate
							</Pill>
							<Pill color="#FFFFFF" className={styles.default_pill} prefix={<IcMTick />}>
								Supply Predicted Rate
							</Pill>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div>AIR</div>
	);
}

export default FilterContainer;
