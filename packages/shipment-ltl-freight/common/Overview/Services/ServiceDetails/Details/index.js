import { cl } from '@cogoport/components';
import { getByKey } from '@cogoport/utils';
import React from 'react';

import getConfigs from '../../configurations/get-configs';

import Item from './Item';
import styles from './styles.module.css';

function Details({ serviceData = [] }) {
	const { service_type, state } = serviceData[0];

	const serviceItemsKey = getConfigs(service_type).details || {};
	const ServiceData = serviceData?.[0];

	return (
		<div className={cl`${styles.container} ${styles[state]}`}>

			<div className={styles.remaining_keys}>
				{(serviceItemsKey || []).map((element) => (getByKey(ServiceData, element.key) ? (
					<Item state={state} label={element} detail={ServiceData} key={element} />
				) : null))}
			</div>

		</div>
	);
}

export default Details;
