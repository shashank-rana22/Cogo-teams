import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { formatRouteData } from '../../../../utils/routeDataHelpers';

import SingleLocations from './SingleLocations';
import styles from './styles.module.css';

const SINGLE_LOCATIONS = [
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'origin_fcl_customs',
	'destination_fcl_customs',
	'origin_lcl_customs',
	'destination_lcl_customs',
	'origin_air_customs',
	'destination_air_customs',
	'fcl_cfs',
	'fcl_freight_local',
	'air_freight_local',
	'lcl_freight_local',
];

function PortDetails({ serviceData = {}, service = '' }) {
	const {
		originDetails = {},
		destinationDetails = {},
		singleOriginDisplay = {},
		singleDestinationDisplay = {},
	} = formatRouteData({ item: serviceData });

	const isSingleLocation = SINGLE_LOCATIONS.includes(serviceData[service]);

	if (isSingleLocation) {
		return (
			<SingleLocations
				singleOriginDisplay={singleOriginDisplay}
				singleDestinationDisplay={singleDestinationDisplay}
				serviceData={serviceData}
			/>
		);
	}

	return (
		<div className={styles.port_pair}>
			<div className={styles.port}>
				<div className={styles.port_details}>
					<Tooltip content={originDetails?.name} placement="bottom">
						<div className={styles.port_name}>
							{originDetails?.name}
						</div>
					</Tooltip>
					<div className={styles.port_codes}>
						(
						{originDetails?.code}
						)
					</div>
				</div>
				<div className={styles.country}>
					{startCase(originDetails?.country)}
				</div>
			</div>
			<IcMPortArrow width={16} height={16} />
			<div className={styles.port}>
				<div className={styles.port_details}>
					<Tooltip content={destinationDetails?.name} placement="bottom">
						<div className={styles.port_name}>
							{destinationDetails?.name}
						</div>
					</Tooltip>
					<div className={styles.port_codes}>
						(
						{destinationDetails?.code}
						)
					</div>
				</div>
				<div className={styles.country}>
					{destinationDetails?.country}
				</div>
			</div>
		</div>
	);
}

export default PortDetails;
