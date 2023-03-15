import React from 'react';
import { ToolTip } from '@cogoport/front/components';
import { isEmpty } from '@cogoport/front/utils';
import { getServiceInfo } from '@cogo/bookings/utils/getServiceInfo';
import getLocations from '@cogo/business-modules/helpers/locations-shipment';
import { IcMPortArrow } from '@cogoport/icons-react';
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

const PortDetails = ({ data = {}, primary_service = {}, isShow = true }) => {
	const { origin_main_port = '', destination_main_port = '' } = primary_service;

	if (isEmpty(data)) {
		return null;
	}

	const { origin, destination } =
		getLocations('service_type', primary_service) || {};

	const { serviceIcon } = getServiceInfo({ service: data?.shipment_type });

	const handleLocationDetails = (location, icdPortInfo, isSingle) => {
		return (
			<>
				<PortCode>
					{location?.port_code || location?.postal_code ? (
						<Code className="core_ui_port_code">
							({location?.port_code || location?.postal_code})
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
						content={
							<div>
								<div style={{ fontSize: '10px' }}>{location?.display_name}</div>

								{icdPortInfo ? <Icd>{icdPortInfo?.name}</Icd> : null}
							</div>
						}
					>
						<Value className="core_ui_loaction_name">{location?.name}</Value>
					</ToolTip>
				)}
			</>
		);
	};

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
		</Container>
	);
};

export default PortDetails;
