import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
// import { startCase } from '@cogoport/utils';

import { formatRouteData } from '../../../../utils/routeDataHelpers';

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

// const TRADE_TYPE_MAPPING = {
// 	import : 'Origin',
// 	export : 'Destination',
// };

function PortDetails({ serviceData = {}, service = '' }) {
	const { trade_type: tradeType = '' } = serviceData || {};
	const {
		originDetails = {},
		destinationDetails = {},
		singleOriginDisplay = {},
		singleDestinationDisplay = {},
	} = formatRouteData({ item: serviceData });

	const isSingleLocation = SINGLE_LOCATIONS.includes(serviceData[service]);

	const DISPLAY_DATA_MAPPING = {
		import : singleOriginDisplay,
		export : singleDestinationDisplay,
	};

	if (isSingleLocation) {
		return (
			<div className={styles.container}>
				<div className={styles.flex_row_origin}>
					<div className={styles.label}>
						{/* {TRADE_TYPE_MAPPING[tradeType]} */}
						Import
						{' '}
						:-
						{' '}
					</div>
				</div>

				<div className={styles.flex_row_origin}>
					<div className={styles.port_details}>

						<Tooltip content={DISPLAY_DATA_MAPPING[tradeType]?.name} placement="bottom">
							<div className={styles.single_port}>
								{/* {DISPLAY_DATA_MAPPING[tradeType]?.name} */}
								Nhava shiva port
							</div>
						</Tooltip>

						<div className={styles.port_codes}>
							(
							{/* {DISPLAY_DATA_MAPPING[tradeType]?.code} */}
							INDIA
							)
						</div>
					</div>

					<div className={styles.country}>
						{/* {DISPLAY_DATA_MAPPING[tradeType]?.country} */}
						PaKISTAN
					</div>

				</div>
			</div>
		);
	}

	return (
		<div className={styles.port_pair}>
			<div className={styles.port}>
				<div className={styles.port_details}>

					<Tooltip content={originDetails?.name} placement="bottom">
						<div className={styles.port_name}>
							{/* {originDetails?.name} */}
							{' '}
							Nhava svhvat to chamaa
						</div>
					</Tooltip>

					<div className={styles.port_codes}>
						(
						{/* {originDetails?.code} */}
						INDIA
						)
					</div>
				</div>

				<div className={styles.country}>
					{/* {startCase(originDetails?.country)} */}
					Rajastan
				</div>

			</div>
			<IcMPortArrow width={16} height={16} />
			<div className={styles.port}>
				<div className={styles.port_details}>
					<Tooltip content={destinationDetails?.name} placement="bottom">
						<div className={styles.port_name}>
							{/* {destinationDetails?.name} */}
							Jebil ALI TO INDIA
						</div>
					</Tooltip>

					<div className={styles.port_codes}>
						(
						{/* {destinationDetails?.code} */}
						Japan
						)
					</div>
				</div>
				<div className={styles.country}>
					{/* {destinationDetails?.country} */}
					Pakisthan
				</div>
			</div>
		</div>
	);
}

export default PortDetails;
