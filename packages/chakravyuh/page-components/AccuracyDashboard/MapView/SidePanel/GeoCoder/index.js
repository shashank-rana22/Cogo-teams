import { cl } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { IcALocationwhite, IcCSwitch, IcMOrigin } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function GeoCoder({ locationFilters = {}, setLocationFilters = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={cl`${styles.col} ${styles.col_one}`}>
				<IcMOrigin />
				<div className={styles.vertical_line} />
				<IcALocationwhite />
			</div>
			<div className={cl`${styles.col} ${styles.main_col}`}>
				{Object.keys(locationFilters).map((key) => (
					<AsyncSelect
						key={key}
						asyncKey="list_locations"
						value={locationFilters?.[key]}
						onChange={(val) => setLocationFilters((prev) => ({ ...prev, [key]: val }))}
					/>
				))}
			</div>
			<div className={cl`${styles.col} ${styles.col_last}`}>
				<IcCSwitch className={styles.switch_icon} />
			</div>
		</div>
	);
}

export default GeoCoder;
