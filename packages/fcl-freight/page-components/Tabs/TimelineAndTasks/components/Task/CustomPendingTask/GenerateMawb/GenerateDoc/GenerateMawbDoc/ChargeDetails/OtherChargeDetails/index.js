import React from 'react';
import Text from '@cogoport/front/components/Text';
import formatDate from '@cogo/globalization/utils/formatDate';
import getGeoConstants from '@cogo/globalization/constants/geo';
import { Flex, FlexCol, BlockCol, FlexRow } from './styles';

const geo = getGeoConstants();
const OtherChargeDetails = ({
	fields = {},
	shipment_data = {},
	primary_service = {},
}) => {
	return (
		<>
			<BlockCol className="other_charge_container">
				<FlexCol className="other_container">
					<Flex className="other_charge_outer_text">
						<Text size={9}>
							Other Charges
							<Flex className="other_charge_text">
								<Text size={13}>
									<div style={{ height: '30%' }}>
										{fields.agent_other_charges.map((item) => {
											return `${item.code.toUpperCase()}:${item.price} `;
										})}
									</div>
									<br />
									{fields.carrier_other_charges.map((item) => {
										return `${item.code.toUpperCase()}:${item.price} `;
									})}
								</Text>
							</Flex>
						</Text>
					</Flex>
				</FlexCol>

				<FlexCol className="hereby_container">
					<Flex className="hereby_container_text">
						<Text size={10} className="text">
							I hereby certify that the particulars on the face hereof are
							correct and that insofar as any part of the consignment contains
							dangerous goods.
							<strong>
								I hereby certify that the contents of this consignment are fully
								and accurately describe above by proper shipping name and are
								classified, packaged, marked and labeled,and in proper condition
								for carriage by air according to applicable national government
								regulations.
							</strong>
						</Text>
					</Flex>
					<Flex className="business_text">
						<Text size={14}>
							{' '}
							{shipment_data?.booking_party_details?.company_name}
						</Text>
					</Flex>
					<FlexRow className="signature_text">
						<Text size={9}>Signature of Shipper or his Agent</Text>
					</FlexRow>
				</FlexCol>
				<BlockCol className="right_container">
					<FlexCol className="place_container">
						<Flex className="place_sub_container" />
						<Flex className="place_container_outer_text">
							<Flex className="place_container_text">
								<Text size={14}>
									{`${formatDate({
										date: new Date(),
										dateFormat: geo.formats.date.default,
										formatType: 'date',
									})}`}
								</Text>
							</Flex>
							<Flex className="place_value" style={{ pointerEvents: 'none' }}>
								{fields.place}
							</Flex>
						</Flex>
						<FlexRow className="date_container">
							<Flex className="date_text">
								<Text size={8}>Executed on (date)</Text>
							</Flex>
							<Flex className="place_text">
								<Text size={8}>at (place)</Text>
							</Flex>
							<Flex className="signature_value">
								<Text size={8}>Signature of Issuing Carrier or its Agent</Text>
							</Flex>
						</FlexRow>
					</FlexCol>
					<FlexRow className="down_container">
						<FlexCol className="down_container_block">
							<FlexRow className="collected_container">
								<Flex className="collected_block" />
								<Flex className="collecte_block_text">
									<Text size={9}>Total Collected</Text>
								</Flex>
								<Flex className="collecte_end_block" />
							</FlexRow>
							<Flex className="collecte_block_end" />
						</FlexCol>
						<Flex className="end_final">
							<Text size={14}>
								{primary_service?.master_airway_bill_number}
							</Text>
						</Flex>
					</FlexRow>
				</BlockCol>
			</BlockCol>
		</>
	);
};
export default OtherChargeDetails;
