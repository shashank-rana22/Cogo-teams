import { cl } from '@cogoport/components';
import { getByKey, omit } from '@cogoport/utils';
import React, { useState } from 'react';

import getConfigs from '../../configurations/get-configs';

import Item from './Item';
import styles from './styles.module.css';

function Details({ serviceData = [] }) {
	const { service_type, state } = serviceData[0];

	const serviceInitialKeys = {};

	(serviceData || []).forEach((data) => {
		serviceInitialKeys[data?.container_size] = {
			container_size             : data?.container_size,
			commodity                  : data?.commodity,
			containers_count           : data?.containers_count,
			container_type             : data?.container_type,
			cargo_description          : data?.cargo_description,
			cargo_weight_per_container : data?.cargo_weight_per_container,
		};
	});

	const [multiServiceType, setMultiServiceType] = useState(Object.keys(serviceInitialKeys)?.[0]);

	const service_items_key = getConfigs(service_type).details || {};

	const freeDays = {
		free_days_demurrage_destination : serviceData?.[0]?.free_days_demurrage_destination,
		free_days_demurrage_origin      : serviceData?.[0]?.free_days_demurrage_origin,
		free_days_detention_destination : serviceData?.[0]?.free_days_detention_destination,
		free_days_detention_origin      : serviceData?.[0]?.free_days_detention_origin,
	};

	const excludedKeys = [...Object.keys(serviceInitialKeys[(Object.keys(serviceInitialKeys)?.[0])]),
		...Object.keys(freeDays)];

	const remainingServiceData = omit(serviceData?.[0], excludedKeys);

	return (
		<div className={cl`${styles.container} ${styles[state]}`}>

			{Object.keys(serviceInitialKeys).length > 1 ?	(
				<div className={cl`${styles.multiservices_heading} ${styles[state]}`}>
					{(Object.keys(serviceInitialKeys)).map((key) => (
						<div
							className={`${styles.mainservice_tabs} 
							${multiServiceType === key ? styles.active : null} 
							${styles[state]}`}
							role="button"
							tabIndex={0}
							onClick={() => setMultiServiceType(key)}
						>
							{`${key} ft`}
						</div>
					))}
				</div>
			) : null}

			<div className={cl`${styles.multiservice} ${styles[state]}`}>
				{(service_items_key || []).map((element) => (getByKey(
					serviceInitialKeys[multiServiceType],
					element.key,
				) ? (
					<Item state={state} label={element} detail={serviceInitialKeys[multiServiceType]} />
					) : null))}
			</div>

			<div className={styles.remaining_keys}>
				{(service_items_key || {}).map((element) => (getByKey(remainingServiceData, element.key) ? (
					<Item state={state} label={element} detail={remainingServiceData} />
				) : null))}
			</div>

			<div className={styles.free_days}>
				{(service_items_key || {}).map((element) => (getByKey(freeDays, element.key) ? (
					<Item state={state} label={element} detail={freeDays} />
				) : null))}
			</div>
		</div>
	);
}

export default Details;
