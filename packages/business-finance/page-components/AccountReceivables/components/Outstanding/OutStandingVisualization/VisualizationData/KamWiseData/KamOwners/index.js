import { cl } from '@cogoport/components';
import React from 'react';

import { KAM_OWNERS_ARR } from '../../../../../../constants/account-type';

import styles from './styles.module.css';

function KamOwners({ kamOwner = '', handleKamId = {}, list = [] }) {
	const sortedArr = KAM_OWNERS_ARR.map((val) => {
		const kamObj = list.find((item) => item.kam_owner_id === val.value);

		if (kamObj) {
			return kamObj;
		}

		return null;
	}).filter((prev) => !!prev);

	return (
		<div className={styles.kam_container}>
			<div
				className={cl` ${styles.kam_container_box} ${kamOwner === 'all' ? styles.kam_container_color
					: styles.kam_container_style}`}
				onClick={() => handleKamId('all')}
				key={kamOwner}
				role="presentation"
			>
				All
			</div>
			{(sortedArr || []).map((val) => (
				<div
					className={cl` ${styles.kam_container_box} ${kamOwner === val.kam_owner_id
						? styles.kam_container_color : styles.kam_container_style}`}
					onClick={() => handleKamId(val.kam_owner_id)}
					key={val?.kam_owner_id}
					role="presentation"
				>
					{val.kam_owner_name}
				</div>
			))}
		</div>
	);
}

export default KamOwners;
