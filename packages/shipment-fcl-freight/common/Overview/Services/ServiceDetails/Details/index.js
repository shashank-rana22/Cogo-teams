import { cl } from '@cogoport/components';
import { getByKey, omit } from '@cogoport/utils';
import React from 'react';

import getConfigs from '../../configurations/get-configs';

import Item from './Item';
import styles from './styles.module.css';

function Details({ serviceData = {} }) {
	const { service_type, state } = serviceData;

	const service_items_key = getConfigs(service_type).details || {};

	const serviceInitialKeys = {
		container_size             : serviceData?.container_size,
		commodity                  : serviceData?.commodity,
		containers_count           : serviceData?.containers_count,
		container_type             : serviceData?.container_type,
		cargo_description          : serviceData?.cargo_description,
		cargo_weight_per_container : serviceData?.cargo_weight_per_container,
	};

	const freeDays = {
		free_days_demurrage_destination : serviceData?.free_days_demurrage_destination,
		free_days_demurrage_origin      : serviceData?.free_days_demurrage_origin,
		free_days_detention_destination : serviceData?.free_days_detention_destination,
		free_days_detention_origin      : serviceData?.free_days_detention_origin,
	};

	const excludedKeys = [...Object.keys(serviceInitialKeys), ...Object.keys(freeDays)];

	const remainingServiceData = omit(serviceData, excludedKeys);

	return (
		<div className={cl`${styles.container} ${styles[state]}`}>
			<div className={cl`${styles.multiservice} ${styles[state]}`}>
				{(service_items_key || []).map((element) => (getByKey(serviceInitialKeys, element.key) ? (
					<Item state={state} label={element} detail={serviceInitialKeys} />
				) : null))}
			</div>

			<div className={styles.remaining_keys}>
				{(service_items_key || {}).map((element) => (getByKey(remainingServiceData, element.key) ? (
					<Item state={state} label={element} detail={remainingServiceData} />
				) : null))}
			</div>
		</div>
	);
}

export default Details;
