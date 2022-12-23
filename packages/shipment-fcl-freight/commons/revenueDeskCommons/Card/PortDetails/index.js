import React from 'react';
import { Tooltip } from '@cogoport/components';
import {IcAOceanFcl, IcMPortArrow} from '@cogoport/icons-react';
import getLocations from '../../../../utils/revenueDeskUtils/getLocations';
import {isEmpty} from "@cogoport/utils"
import styles from "./styles.module.css"


const PortDetails = ({ data = {} }) => {

	if (isEmpty(data)) {
		return null;
	}

	const { origin, destination } = getLocations('shipment_type', data) || {};

	const { destination_main_port, origin_main_port } = data;

	const handleLocationDetails = (location, isSingle, icdInfo) => {
		let show = true;
		if (location?.port_code === null || location?.postal_code === null) {
			show = false;
		} else if (!location?.port_code && !location?.postal_code) {
			show = false;
		} else if (data?.shipment_type === 'trailer_freight') {
			show = false;
		}
		return (
			<>	
				<div className={styles.portCode}>
					{show ? (
						<p className={styles.code}>({location?.port_code || location?.postal_code})</p>
					) : null}

					<p className={styles.country}>{location?.country?.name}</p>
				</div>

				{isSingle ? (
					<div className={styles.value}>{location?.name}</div>
				) : (
					<Tooltip
						placement="bottom"
						theme="light"
						content={
							<div style={{ fontSize: '10px' }}>{location?.display_name}</div>
						}
					>
						<>
							<div className={styles.value}>{location?.name}</div>
							{icdInfo?.name && <div className = {styles.icd}>{icdInfo?.name}</div>}
						</>
					</Tooltip>
				)}
			</>
		);
	};
	const className = destination ? 'port-details' : 'port';
	const renderLocation = () => {
		if (!destination) {
			const isSingle = true;
			return (
				<div className={styles.flexRowOrigin}>
					{handleLocationDetails(origin, isSingle)}
				</div>
            )
		}

		return (
			<>
				<div className={styles.flexRowOrigin}>
					{handleLocationDetails(origin, false, origin_main_port)}
				</div>

				<div className={styles.iconWrapper}>
					<IcMPortArrow width={20} height={20}/>
				</div>

				<div className={styles.flexRowDest}>
					{handleLocationDetails(destination, false, destination_main_port)}
				</div>
			</>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.iconAndService}>
				<IcAOceanFcl height={30} width={30}/>
			</div>

			{renderLocation()}
		</div>
	);
};

export default PortDetails;