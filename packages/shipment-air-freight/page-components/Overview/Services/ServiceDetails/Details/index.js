import { cl } from '@cogoport/components';
import { getByKey, omit } from '@cogoport/utils';
import { useMemo } from 'react';

import getConfigs from '../../configurations/get-configs';

import Item from './Item';
import styles from './styles.module.css';

const SERVICE_INITIAL_KEYS = [
	'schedule_departure',
	'schedule_arrival',
];

function Details({ serviceData = {} }) {
	const { service_type, state } = serviceData || {};

	const [service_items_key, remainingServiceData, serviceInitialDetail] = useMemo(() => {
		const items_key = getConfigs(service_type).details || {};

		const remainingData = omit(serviceData, SERVICE_INITIAL_KEYS);

		const INITIAL_DETAIL = {};
		SERVICE_INITIAL_KEYS.forEach((key) => {
			INITIAL_DETAIL[key] = serviceData?.[key];
		});

		return [items_key, remainingData, INITIAL_DETAIL];
	}, [serviceData, service_type]);

	return (
		<div className={cl`${styles.container} ${styles[state]}`}>
			<div className={cl`${styles.multiservice} ${styles[state]}`}>
				{(service_items_key || []).map((element) => (getByKey(
					serviceInitialDetail,
					element.key,
				) ? (
					<Item
						key={element.key}
						state={state}
						label={element}
						detail={serviceInitialDetail}
					/>
					) : null))}
			</div>

			<div className={styles.remaining_keys}>
				{(service_items_key || []).map((element) => (getByKey(remainingServiceData, element.key) ? (
					<Item
						key={element.key}
						state={state}
						label={element}
						detail={remainingServiceData}
					/>
				) : null))}
			</div>
		</div>
	);
}

export default Details;
