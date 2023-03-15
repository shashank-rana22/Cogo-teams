import { getServiceInfo } from '@cogoport/bookings/utils/getServiceInfo';
import getLocations from '@cogoport/business-modules/helpers/locations-shipment';
import { ToolTip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import {
	Container,
	FlexRowOrigin,
	FlexRowDest,
	Value,
	IconWrapper,
	PortCode,
	Code,
	Country,
	IconAndService,
	Icd,
} from './styles';

function PortDetails({ data = {}, primary_service = {}, isShow = true }) {
	const { origin_main_port = '', destination_main_port = '' } = primary_service;

	if (isEmpty(data)) {
		return null;
	}

	const { origin, destination } =		getLocations('service_type', primary_service) || {};

	const { serviceIcon } = getServiceInfo({ service: data?.shipment_type });

	const handleLocationDetails = (location, icdPortInfo, isSingle) => (
		<>
			<PortCode>
				{location?.port_code || location?.postal_code ? (
					<Code className="core_ui_port_code">
						(
						{location?.port_code || location?.postal_code}
						)
					</Code>
				) : (
					<div style={{ height: '16px' }} />
				)}

				<Country className="core_ui_country_name">
					{location?.country?.name}
				</Country>
			</PortCode>

			{isSingle ? (
				<Value className={isSingle ? 'isSingle' : ''}>{location?.name}</Value>
			) : (
				<ToolTip
					placement="bottom"
					theme="light"
					content={(
						<div>
							<div style={{ fontSize: '10px' }}>{location?.display_name}</div>

							{icdPortInfo ? <Icd>{icdPortInfo?.name}</Icd> : null}
						</div>
					)}
				>
					<Value className="core_ui_loaction_name">{location?.name}</Value>
				</ToolTip>
			)}
		</>
	);

	const renderLocation = () => {
		const isSingle = !destination;

		return (
			<>
				<FlexRowOrigin>
					{handleLocationDetails(origin, origin_main_port, isSingle)}
				</FlexRowOrigin>

				{destination ? (
					<IconWrapper>
						<IcMPortArrow className="core_ui_icon" />
					</IconWrapper>
				) : null}

				{destination ? (
					<FlexRowDest>
						{handleLocationDetails(destination, destination_main_port)}
					</FlexRowDest>
				) : null}
			</>
		);
	};

	return (
		<Container className="core_ui_port_conatiner">
			{isShow ? <IconAndService>{serviceIcon}</IconAndService> : null}

			{renderLocation()}
		</div>
	);
}

export default PortDetails;
