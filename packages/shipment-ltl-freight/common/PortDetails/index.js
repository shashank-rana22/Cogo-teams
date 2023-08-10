import { cl, Tooltip } from '@cogoport/components';
import { IcMPortArrow, IcCFltl } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function PortDetails({ data = {}, primary_service = {} }) {
	const {
		origin_location = {},
		origin_port = {},
		destination_drop = {},
		destination_location = {},
	} = primary_service;

	if (isEmpty(data)) {
		return null;
	}

	const handleLocationDetails = (location, icdPortInfo) => (
		<>
			{(location?.port_code || location?.postal_code)
			&& (
				<div className={styles.port_code}>
					<div className={` ${styles.code}`}>
						(
						{location?.port_code || location?.postal_code}
						)
					</div>
				</div>
			)}

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
				{location?.name
				&& <div className={cl`${styles.value}`}>{location?.name}</div>}
			</Tooltip>

		</>
	);

	const renderLocation = () => (
		<>
			<div className={styles.flex_row_origin}>
				{handleLocationDetails(origin_location, origin_port)}
			</div>

			<div className={styles.icon_wrapper}>
				<IcMPortArrow className="core_ui_icon" />
			</div>

			<div className={styles.flex_row_destination}>
				{handleLocationDetails(destination_location, destination_drop)}
			</div>
		</>
	);

	return (
		<div className={styles.container}>
			<div className={styles.icons_and_service}>
				<IcCFltl />
				<span>LTL</span>
			</div>
			{renderLocation()}
		</div>
	);
}

export default PortDetails;
