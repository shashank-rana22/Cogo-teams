import { cl } from '@cogoport/components';
import { getByKey, omit } from '@cogoport/utils';
import React from 'react';

import getConfigs from '../../configurations/get-configs';

import Item from './Item';
import styles from './styles.module.css';

function Details({ serviceData = {} }) {
	const {
		service_type = '', state = '', free_days_demurrage_destination = '',
		free_days_demurrage_origin = '', free_days_detention_destination = '', free_days_detention_origin = '',
	} = serviceData || {};

	const service_items_key = getConfigs(service_type).details || {};

	const freeDays = [
		free_days_demurrage_destination,
		free_days_demurrage_origin,
		free_days_detention_destination,
		free_days_detention_origin,
	];

	const remainingServiceData = omit((serviceData || {}), freeDays);

	return (
		<div className={cl`${styles.container} ${styles[state]}`}>

			<div className={styles.remaining_keys}>
				{(service_items_key || {}).map((element) => (getByKey(remainingServiceData, element.key) ? (
					<Item
						state={state}
						label={element}
						detail={remainingServiceData}
						key={element.key}
					/>
				) : null))}
			</div>

			<div className={styles.free_days}>
				{(service_items_key || {}).map((element) => (getByKey(freeDays, element.key) ? (
					<Item
						state={state}
						label={element}
						detail={freeDays}
						key={element.key}
					/>
				) : null))}
			</div>
		</div>
	);
}

export default Details;
