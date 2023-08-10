import { cl, Tooltip } from '@cogoport/components';
import { IcMPortArrow, IcMFlocalCharges } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { getOceanLocationInfo } from '../../helpers/getOceanLocaltionInfo';

import styles from './styles.module.css';

function PortDetails({ primary_service = {} }) {
	const { trade_type = '' } = primary_service;

	const { origin_port, destination_port } = getOceanLocationInfo(
		primary_service,
		trade_type,
	);

	const handleLocationDetails = (location) => (
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
				{handleLocationDetails(origin_port)}

			</div>

			{ !isEmpty(destination_port) ? (
				<>
					<div className={styles.icon_wrapper}>
						<IcMPortArrow className="core_ui_icon" />
					</div>

					<div className={styles.flex_row_destination}>
						{handleLocationDetails(destination_port)}

					</div>
				</>
			)
				: null }

		</>
	);

	return (
		<div className={styles.container}>
			<div className={styles.icons_and_service}>
				<IcMFlocalCharges />
				<span>FCL Locals</span>
			</div>
			{renderLocation()}
		</div>
	);
}

export default PortDetails;
