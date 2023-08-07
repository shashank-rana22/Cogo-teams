import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function PortDetails({ data = {}, primary_service = {}, isShow = true }) {
	const {
		origin_main_port = {},
		destination_main_port = {},
		origin_port = {},
		destination_port = {},
	} = primary_service;

	if (isEmpty(data)) {
		return null;
	}

	function HandleLocationDetails(location, icdPortInfo) {
		return (
			<>
				{location?.port_code || location?.postal_code ? (
					<div className={styles.code}>
						(
						{location?.port_code || location?.postal_code}
						)
					</div>
				) : (
					<div className={styles.empty_code} />
				)}

				<div className={styles.country}>
					{location?.country?.name}
				</div>

				<Tooltip
					placement="bottom"
					theme="light"
					content={(
						<div>
							<div className={styles.display_name}>{location?.display_name}</div>

							{!isEmpty(icdPortInfo) ? <div className={styles.icd}>{icdPortInfo?.name}</div> : null}
						</div>
					)}
				>
					<div className={styles.value}>{location?.name}</div>
				</Tooltip>

			</>
		);
	}

	function RenderLocation() {
		return (
			<>
				<div className={styles.port_code}>
					{HandleLocationDetails(origin_port, origin_main_port)}
				</div>

				{destination_port ? (
					<div className={styles.icon_wrapper}>
						<IcMPortArrow width="1.2em" height="1.2em" />
					</div>
				) : null}

				{destination_port ? (
					<div className={styles.port_code}>
						{HandleLocationDetails(destination_port, destination_main_port)}
					</div>
				) : null}
			</>
		);
	}

	return (
		<div className={styles.container}>
			{isShow ? (
				<div className={styles.icons_and_service} />
			) : null}

			{RenderLocation()}
		</div>
	);
}

export default PortDetails;
