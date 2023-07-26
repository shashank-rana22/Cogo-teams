import { cl } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcALocationwhite, IcCSwitch, IcMOrigin } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { getHigherHierarchy } from '../../../../../utils/hierarchy-utils';

import styles from './styles.module.css';

function GeoCoder({ locationFilters = {}, setLocationFilters = () => {}, setHierarchy = () => {} }) {
	const handleChange = (key, val, obj) => {
		setLocationFilters((prev) => ({ ...prev, [key]: { id: val, ...obj } }));
		if (key === 'destination') {
			if (!val) {
				setHierarchy({});
			} else if (!isEmpty(obj)) {
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
		}
	};

	const handleOptionsChange = (key, options) => {
		const firstOption = options?.[GLOBAL_CONSTANTS.zeroth_index] || {};
		if (!locationFilters[key]?.latitude && !isEmpty(firstOption)) {
			setLocationFilters((prev) => ({ ...prev, [key]: { ...firstOption } }));
		}
	};

	const handleSwap = () => {
		setLocationFilters((prev) => {
			const { origin, destination } = prev;
			const currentKey = `${(origin?.type || '').includes('port') ? 'port' : origin?.type}_id`;
			const parentKeys = getHigherHierarchy(currentKey);
			const newHierarchy = parentKeys.reduce((acc, k) => {
				if (origin[k]) {
					acc[k] = origin[k];
				}
				return acc;
			}, {});
			setHierarchy({ ...newHierarchy, [currentKey]: origin?.id });
			return { origin: destination, destination: origin };
		});
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
						onOptionsChange={(options) => handleOptionsChange(key, options)}
						isClearable={!!idx}
						params={{ filters: { type: ['seaport', 'country', 'region'] } }}
					/>
				))}
			</div>
			{locationFilters?.destination?.id && (
				<div className={cl`${styles.col} ${styles.col_last}`}>
					<IcCSwitch className={styles.switch_icon} onClick={handleSwap} />
				</div>
			)}
		</div>
	);
}

export default GeoCoder;
