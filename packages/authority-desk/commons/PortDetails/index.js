import { cl, Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { format, isEmpty } from '@cogoport/utils';
import React from 'react';

import Icons from './Icon';
import styles from './styles.module.css';

function PortDetails({ primary_service = {} }) {
	const {
		origin_main_port = {},
		destination_main_port = {},
		origin_port = {},
		destination_port = {},
		schedule_arrival = '',
		schedule_departure = '',
	} = primary_service;

	console.log(primary_service, 'primary_servixe');

	const handleLocationDetails = (location, icdPortInfo) => (
		<>
			<div className={styles.port_code}>
				<div className={` ${styles.code}`}>
					(
					{location?.port_code || location?.postal_code}
					)
				</div>

				<div className={`${styles.country}`}>
					{location?.country?.name}
				</div>
			</div>

			<Tooltip
				placement="bottom"
				theme="light"
				content={(
					<div>
						<div style={{ fontSize: '10px' }}>{location?.display_name}</div>

						{!isEmpty(icdPortInfo) ? <div className={styles.icd}>{icdPortInfo?.name}</div> : null}
					</div>
				)}
			>
				<div className={cl`${styles.value}`}>{location?.name}</div>
			</Tooltip>

		</>
	);

	const renderLocation = () => (
		<>
			<div className={styles.flex_row_origin}>
				{handleLocationDetails(origin_port, origin_main_port)}
				{ schedule_departure ? (
					<div className={styles.date}>
						{format(schedule_departure, 'dd MMM yyyy', null, true)}
					</div>
				) : null}

			</div>

			<div className={styles.icon_wrapper}>
				<IcMPortArrow className="core_ui_icon" />
			</div>

			<div className={styles.flex_row_destination}>
				{handleLocationDetails(destination_port, destination_main_port)}
				{ schedule_arrival ? (
					<div className={styles.date}>
						{format(schedule_arrival, 'dd MMM yyyy', null, true)}
					</div>
				) : null}
			</div>
		</>
	);

	return (
		<div className={styles.container}>
			<div className={styles.icons_and_service}>
				<Icons service_type={primary_service?.service_type} />
			</div>
			{renderLocation()}
		</div>
	);
}

export default PortDetails;
