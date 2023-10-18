import { Pill, Tooltip, cl } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { LABELS } from '../../../../../constants/flashRatesMapping';
import { ICONS_MAPPING, SINGLE_LOCATIONS } from '../../../../../constants/shipmentConstants';
import SHIPMENT_TYPE_OPTIONS from '../../../../../constants/shipmentTypes';
import {
	RENDER_VALUE_MAPPING, serviceDetails,
} from '../../../../../utils/detailsHelperFuncs';
import { formatRouteData } from '../../../../../utils/routeDataHelpers';

import { getShippingData } from './getShipperFunctions';
import styles from './styles.module.css';

function PortDetails({ details = {} }) {
	return (
		<>
			<div className={styles.port_name}>
				{details?.code ? `(${details?.code})` : '-'}
			</div>

			<Tooltip
				placement="bottom"
				delay={[500, 0]}
				content={details?.name}
			>
				<div className={styles.country_name}>
					{details?.name}
				</div>
			</Tooltip>
		</>
	);
}

function ShipmentDetails({
	cardData = {},
	handleOpenMessage = () => {},
	isTriggeredFromSideBar = false,
}) {
	const { service_type = '', trade_type = '' } = cardData || {};

	const details = serviceDetails({ detail: cardData, service: service_type });

	const {
		originDetails = {},
		destinationDetails = {},
		singleOriginDisplay = {},
		singleDestinationDisplay = {},
	} = formatRouteData({ item: cardData });

	const isSingleLocation = SINGLE_LOCATIONS.includes(service_type);

	const ActiveIcon = ICONS_MAPPING[service_type] || ICONS_MAPPING.default;

	const { showLogo = false, logoUrl = '', belowText = '' } = getShippingData({ cardData });

	return (
		<div
			className={styles.container}
			role="presentation"
			onClick={handleOpenMessage}
			style={{ cursor: isTriggeredFromSideBar ? 'default' : 'pointer' }}
		>
			<div
				className={styles.shipping_details}
				style={{ flexDirection: isTriggeredFromSideBar ? 'column' : 'row' }}
			>
				<div
					className={cl`${styles.service_type} ${isTriggeredFromSideBar ? styles.sidebar_service_type : ''}`}
				>
					<div className={styles.icon_container}>
						<ActiveIcon />
					</div>

					<div
						className={cl`${styles.service_label} ${isTriggeredFromSideBar ? styles.side_bar_service : ''}`}
					>
						{SHIPMENT_TYPE_OPTIONS[service_type]?.label || startCase(service_type)}
					</div>
				</div>

				<div className={cl`${styles.shipping_line} 
					${isTriggeredFromSideBar ? styles.side_bar_shipping : ''}`}
				>
					<div className={cl`${styles.shipping_service} ${showLogo ? '' : styles.full_service}`}>
						{(isSingleLocation && trade_type === 'export')
							? '-'
							: (
								<PortDetails
									details={(isSingleLocation && trade_type === 'import')
										? singleOriginDisplay : originDetails}
								/>
							)}
					</div>

					{showLogo ? (
						<div className={styles.shipping_service}>
							<img
								height="30px"
								width="90px"
								alt="logo"
								src={logoUrl}
							/>

							<div className={styles.service_provider}>
								{belowText || ''}
							</div>
						</div>
					) : <IcMPortArrow height={20} width={20} className={styles.port_icon} />}

					<div className={cl`${styles.shipping_service} ${showLogo ? '' : styles.full_service}`}>
						{(isSingleLocation && trade_type === 'import')
							? '-'
							: (
								<PortDetails
									details={(isSingleLocation && trade_type === 'export')
										? singleDestinationDisplay : destinationDetails}
								/>
							)}
					</div>
				</div>
			</div>

			<div className={styles.commodity_details}>
				{(LABELS || []).map(
					(label) => {
						const value = RENDER_VALUE_MAPPING[label]?.(details) || details[label] || '';

						if (!value || !cardData?.[label]) {
							return null;
						}

						return (
							<Pill
								size="sm"
								color="#FEF3E9"
								key={label}
							>
								{value}
							</Pill>
						);
					},
				)}
			</div>
		</div>
	);
}

export default ShipmentDetails;
