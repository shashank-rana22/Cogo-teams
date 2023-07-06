import { cl } from '@cogoport/components';
import { getByKey, omit } from '@cogoport/utils';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import getConfigs from '../../configurations/get-configs';

import Item from './Item';
import styles from './styles.module.css';

const MIN_LENGTH = 1;
const START_ARRAY = 0;
const FIRST_CHAR = 0;
const SLICE_FROM = 1;

function Details({ serviceData = [] }) {
	const {
		service_type, state, free_days_demurrage_destination,
		free_days_demurrage_origin, free_days_detention_destination, free_days_detention_origin,
	} = serviceData[START_ARRAY];

	const SERVICE_INITIAL_KEYS = {};

	(serviceData || []).forEach((data) => {
		SERVICE_INITIAL_KEYS[data?.container_size] = {
			container_size             : data?.container_size,
			commodity                  : data?.commodity,
			containers_count           : data?.containers_count,
			container_type             : data?.container_type,
			cargo_description          : data?.cargo_description,
			cargo_weight_per_container : data?.cargo_weight_per_container,
		};
	});

	const [multiServiceType, setMultiServiceType] = useState(Object.keys(SERVICE_INITIAL_KEYS)?.[START_ARRAY]);

	const service_items_key = getConfigs(service_type).details || {};

	const freeDays = {
		free_days_demurrage_destination,
		free_days_demurrage_origin,
		free_days_detention_destination,
		free_days_detention_origin,
	};

	const excludedKeys = [...Object.keys(SERVICE_INITIAL_KEYS[(Object.keys(SERVICE_INITIAL_KEYS)?.[START_ARRAY])]),
		...Object.keys(freeDays)];

	const remainingServiceData = omit(serviceData?.[START_ARRAY], excludedKeys);

	return (
		<div className={cl`${styles.container} ${styles[state]}`}>

			{Object.keys(SERVICE_INITIAL_KEYS).length > MIN_LENGTH ?	(
				<div className={cl`${styles.multiservices_heading} ${styles[state]}`}>
					{(Object.keys(SERVICE_INITIAL_KEYS)).map((val) => (
						<div
							key={uuid()}
							className={cl`${styles.mainservice_tabs} 
							${multiServiceType === val ? styles.active : null} 
							${styles[state]}`}
							role="button"
							tabIndex={0}
							onClick={() => setMultiServiceType(val)}
						>
							{`${val} ft`}
							{' '}
							|
							{' '}
							{SERVICE_INITIAL_KEYS[val].container_type.charAt(FIRST_CHAR).toUpperCase()
							+ SERVICE_INITIAL_KEYS[val].container_type.slice(SLICE_FROM)}
							{' '}
							|
							{' '}
							{SERVICE_INITIAL_KEYS[val].commodity.charAt(FIRST_CHAR).toUpperCase()
							+ SERVICE_INITIAL_KEYS[val].commodity.slice(SLICE_FROM)}
						</div>
					))}
				</div>
			) : null}

			<div className={cl`${styles.multiservice} ${styles[state]}`}>
				{(service_items_key || []).map((element) => (getByKey(
					SERVICE_INITIAL_KEYS[multiServiceType],
					element?.val,
				) ? (
					<Item key={uuid()} state={state} label={element} detail={SERVICE_INITIAL_KEYS[multiServiceType]} />
					) : null))}
			</div>

			<div className={styles.remaining_keys}>
				{(service_items_key || {}).map((element) => (getByKey(remainingServiceData, element.val) ? (
					<Item key={uuid()} state={state} label={element} detail={remainingServiceData} />
				) : null))}
			</div>

			<div className={styles.free_days}>
				{(service_items_key || {}).map((element) => (getByKey(freeDays, element.val) ? (
					<Item key={uuid()} state={state} label={element} detail={freeDays} />
				) : null))}
			</div>
		</div>
	);
}

export default Details;
