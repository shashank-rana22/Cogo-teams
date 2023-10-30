import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { getByKey } from '@cogoport/utils';
import { useState, useMemo } from 'react';

import getConfigs from '../../configurations/get-configs';

import Item from './Item';
import styles from './styles.module.css';

const SERVICE_DATA_LENGTH_DEFAULT_VALUE = 1;
const TRUCK_NUMBER_INCREMENTER = 1;

function Details({ serviceData = [] }) {
	const [multiTruck, setMultiTruck] = useState(serviceData?.[GLOBAL_CONSTANTS.zeroth_index]);

	const { service_type, state } = serviceData[GLOBAL_CONSTANTS.zeroth_index];
	const serviceItemsKey = getConfigs(service_type).details || {};

	const totalTruck = serviceData?.map((item) => item?.id);
	const [showTruck, setShowTruck] = useState(serviceData?.[GLOBAL_CONSTANTS.zeroth_index]?.id);

	const keys = useMemo(
		() => Array(totalTruck.length).fill(null).map(() => Math.random()),
		[totalTruck.length],
	);
	const handleSelect = (key) => {
		const selected = serviceData?.find((item) => item?.id === key);
		setMultiTruck(selected);
		setShowTruck(key);
	};

	return (
		<div className={cl`${styles.container} ${styles[state]}`}>

			{serviceData.length > SERVICE_DATA_LENGTH_DEFAULT_VALUE ?	(
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
							{`Truck - ${i + TRUCK_NUMBER_INCREMENTER}`}
						</div>
					))}
				</div>
			) : null}

			<div>
				<div className={styles.remaining_keys}>
					{(serviceItemsKey || []).map((element) => (getByKey(multiTruck, element.key) ? (
						<Item key={element.id} state={state} label={element} detail={multiTruck} />
					) : null))}
				</div>
			</div>

		</div>
	);
}

export default Details;
