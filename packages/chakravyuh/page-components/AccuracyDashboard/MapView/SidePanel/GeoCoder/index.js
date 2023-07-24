import { cl } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { IcALocationwhite, IcCSwitch, IcMOrigin } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { getHigherHierarchy } from '../../../../../utils/hierarchy-utils';

import styles from './styles.module.css';

function GeoCoder({ locationFilters = {}, setLocationFilters = () => {}, setHierarchy = () => {} }) {
	const handleChange = (key, val, obj) => {
		setLocationFilters((prev) => ({ ...prev, [key]: { id: val, ...obj } }));
		if (key === 'destination' && !isEmpty(obj)) {
			const currentKey = `${(obj?.type || '').includes('port') ? 'port' : obj?.type}_id`;
			const parentKeys = getHigherHierarchy(currentKey);
			const newHierarchy = parentKeys.reduce((acc, k) => {
				if (obj[k]) {
					acc[k] = obj[k];
				}
				return acc;
			}, {});
			setHierarchy({ ...newHierarchy, [currentKey]: val });
		}
	};

	return (
		<div className={styles.container}>
			<div className={cl`${styles.col} ${styles.col_one}`}>
				<IcMOrigin />
				<div className={styles.vertical_line} />
				<IcALocationwhite />
			</div>
			<div className={cl`${styles.col} ${styles.main_col}`}>
				{Object.keys(locationFilters).map((key, idx) => (
					<AsyncSelect
						key={key}
						asyncKey="list_locations"
						value={locationFilters?.[key]?.id}
						onChange={(val, obj) => handleChange(key, val, obj)}
						isClearable={!!idx}
						params={{ filters: { type: ['seaport', 'country', 'region'] } }}
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
