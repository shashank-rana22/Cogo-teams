import { cl, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { getByKey, omit } from '@cogoport/utils';
import React, { useState } from 'react';

import getConfigs from '../../configurations/get-configs';

import Item from './Item';
import styles from './styles.module.css';

const INITIAL_LENGTH = 1;
const SLICE_VALUE = 1;

function Details({ serviceData = [] }) {
	const {
		service_type,
		state,
		free_days_demurrage_destination,
		free_days_demurrage_origin,
		free_days_detention_destination,
		free_days_detention_origin,
	} = serviceData[GLOBAL_CONSTANTS.zeroth_index];

	const SERVICE_INITIAL_KEYS = {};

	(serviceData || []).forEach((data, i) => {
		SERVICE_INITIAL_KEYS[i] = {
			container_size             : data?.container_size,
			commodity                  : data?.commodity,
			containers_count           : data?.containers_count,
			container_type             : data?.container_type,
			cargo_description          : data?.cargo_description,
			cargo_weight_per_container : data?.cargo_weight_per_container,
		};
	});

	const [multiServiceType, setMultiServiceType] = useState(Object.keys(SERVICE_INITIAL_KEYS)
		?.[GLOBAL_CONSTANTS.zeroth_index]);

	const service_items_key = getConfigs(service_type).details || {};

	const freeDays = {
		free_days_demurrage_destination,
		free_days_demurrage_origin,
		free_days_detention_destination,
		free_days_detention_origin,
	};

	const excludedKeys = [
		...Object.keys(SERVICE_INITIAL_KEYS[Object.keys(SERVICE_INITIAL_KEYS)
			?.[GLOBAL_CONSTANTS.zeroth_index]]),
		...Object.keys(freeDays),
	];

	const remainingServiceData = omit(serviceData?.[GLOBAL_CONSTANTS.zeroth_index], excludedKeys);

	return (
		<div className={cl`${styles.container} ${styles[state]}`}>

			{Object.keys(SERVICE_INITIAL_KEYS).length > INITIAL_LENGTH ? (
				<div className={cl`${styles.multiservices_heading} ${styles[state]}`}>
					{(Object.keys(SERVICE_INITIAL_KEYS)).map((val) => (
						<Button
							key={val}
							themeType="none"
							className={cl`${styles.mainservice_tabs}
                                        ${multiServiceType === val ? styles.active : null}
                                        ${styles[state]}`}
							onClick={() => setMultiServiceType(val)}
						>
							{`${SERVICE_INITIAL_KEYS[val].container_size} ft`}
							{' '}
							|
							{' '}
							{SERVICE_INITIAL_KEYS[val].container_type
								.charAt(GLOBAL_CONSTANTS.zeroth_index).toUpperCase()
                            + SERVICE_INITIAL_KEYS[val].container_type.slice(SLICE_VALUE)}
							{' '}
							|
							{' '}
							{SERVICE_INITIAL_KEYS[val].commodity.charAt(GLOBAL_CONSTANTS.zeroth_index).toUpperCase()
                            + SERVICE_INITIAL_KEYS[val].commodity.slice(SLICE_VALUE)}
						</Button>
					))}
				</div>
			) : null}

			<div className={cl`${styles.multiservice} ${styles[state]}`}>
				{(service_items_key || []).map((element) => (getByKey(
					SERVICE_INITIAL_KEYS[multiServiceType],
					element?.key,
				) ? (
					<Item
						key={element.key}
						state={state}
						label={element}
						detail={SERVICE_INITIAL_KEYS[multiServiceType]}
					/>
					) : null))}
			</div>

			<div className={styles.remaining_keys}>
				{(service_items_key || []).map((element) => (getByKey(remainingServiceData, element.key) ? (
					<Item key={element.key} state={state} label={element} detail={remainingServiceData} />
				) : null))}
			</div>

			<div className={styles.free_days}>
				{(service_items_key || []).map((element) => (getByKey(freeDays, element.key) ? (
					<Item key={element.key} state={state} label={element} detail={freeDays} />
				) : null))}
			</div>
		</div>
	);
}

export default Details;
