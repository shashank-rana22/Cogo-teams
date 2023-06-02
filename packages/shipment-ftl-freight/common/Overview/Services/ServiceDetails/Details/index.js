import { cl } from '@cogoport/components';
import { getByKey } from '@cogoport/utils';
import React, { useState } from 'react';

import getConfigs from '../../configurations/get-configs';

import Item from './Item';
import styles from './styles.module.css';

const keys = Array(2).fill(null).map(() => Math.random());

function Details({ serviceData = [] }) {
	const [multiTruck, setMultiTruck] = useState(serviceData?.[0]);

	const { service_type, state } = serviceData[0];
	const serviceItemsKey = getConfigs(service_type).details || {};

	const totalTruck = ['truck-1', 'truck-2'];
	const [showTruck, setShowTruck] = useState('truck-1');

	const handleSelect = (key) => {
		if (key === 'truck-2') {
			setMultiTruck(serviceData?.[1]);
		} else {
			setMultiTruck(serviceData?.[0]);
		}
		setShowTruck(key);
	};

	return (
		<div className={cl`${styles.container} ${styles[state]}`}>

			{serviceData.length > 1 ?	(
				<div className={cl`${styles.multiservices_heading}`}>
					{totalTruck.map((key, i) => (
						<div
							className={cl`${styles.mainservice_tabs} 
							${showTruck === key ? styles.active : ''} ${styles[state]}`}
							role="button"
							tabIndex={0}
							key={keys[i]}
							onClick={() => handleSelect(key)}
						>
							{`${key}`}
						</div>
					))}
				</div>
			) : null}

			<div>
				<div className={styles.remaining_keys}>
					{(serviceItemsKey || []).map((element) => (getByKey(multiTruck, element.key) ? (
						<Item state={state} label={element} detail={multiTruck} />
					) : null))}
				</div>
			</div>

		</div>
	);
}

export default Details;
