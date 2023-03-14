import React from 'react';
import Text from '@cogoport/front/components/Text';

import {
	Block,
	Flex,
	BlockCol,
	BlockRow,
	FlexRow,
	FlexCol,
	StyledTextArea,
} from './styles';

const ShipperConsigneeDetails = ({ formData = {}, primary_service = {} }) => {
	const { master_airway_bill_number = '' } = primary_service;
	return (
		<div style={{ pointerEvents: 'none' }}>
			{' '}
			<BlockRow className="mawb_number">
				<FlexRow className="mawb_number_division">
					<Flex className="flex_font_bold mawb_number_subdivision">
						<Text size={14}>{master_airway_bill_number?.substring(0, 3)}</Text>
					</Flex>
					<Flex className="flex_font_bold mawb_number_subdivision_portcode">
						<Text size={14}>{primary_service?.origin_airport?.port_code}</Text>
					</Flex>
					<Flex className="flex_font_bold mawb_number_subdivision_second">
						<Text size={14}>{master_airway_bill_number?.substring(4, 13)}</Text>
					</Flex>
				</FlexRow>
				<Flex className="flex_font_bold mawb_bill_number">
					<Text size={14}>{master_airway_bill_number}</Text>
				</Flex>
			</BlockRow>
			<Flex>
				<Block className="shipper_consignee_details">
					<div style={{ display: 'flex' }}>
						<FlexRow className="shipper_consignee_name_address">
							<Text size={10}>Shipper&apos;s Name and Address</Text>
						</FlexRow>
						<FlexCol className="shipper_consignee_account_number">
							<Text size={10}>Shipper&apos;s Account Number</Text>
						</FlexCol>
					</div>
					<div>
						<Flex className="flex_font_bold">
							<StyledTextArea>
								{formData.shipper_name}
								<br />
								{formData.shipper_address}
							</StyledTextArea>
						</Flex>
					</div>
				</Block>
				<BlockCol className="issuedby_validation_conditions">
					<Flex className="flex_left_padding not_negotiable_issuedby">
						<Text size={10}>Not Negotiable</Text>
					</Flex>
					<Flex className="flex_font_bold flex_left_padding airway_bill">
						<Text size={14.5}>Air Waybill</Text>
					</Flex>
					<Flex className="flex_left_padding not_negotiable_issuedby">
						<Text size={10}>Issued By</Text>
					</Flex>
					<Flex className="flex_font_bold flex_left_padding business_name">
						<Text size={14.5}>{primary_service?.airline?.business_name}</Text>
					</Flex>
					<Flex className="flex_left_padding same_validity">
						<Text size={10}>
							Copies 1, 2 and 3 of this Air Waybill are originals and have the
							same validity.
						</Text>
					</Flex>
				</BlockCol>
			</Flex>
			<Flex>
				<Block className="shipper_consignee_details">
					<div style={{ display: 'flex' }}>
						<FlexRow className="shipper_consignee_name_address">
							<Text size={10}>Consignee&apos;s Name and Address</Text>
						</FlexRow>
						<FlexCol className="shipper_consignee_account_number">
							<Text size={10}>Consignee&apos;s Account Number</Text>
						</FlexCol>
					</div>

					<div>
						<Flex className="flex_font_bold ">
							<StyledTextArea>
								{formData.consignee_name}
								<br />
								{formData.consignee_address}
							</StyledTextArea>
						</Flex>
					</div>
				</Block>
				<Block className="issuedby_validation_conditions">
					<Flex className="flex_left_padding">
						<Text size={9} className="text">
							It is agreed that the goods declared herein are accepted in
							apparent good order and condition (except as noted) for carriage
							SUBJECT TO THE CONDITIONS OF CONTRACT ON THE REVERSE HEREOF. ALL
							GOODS MAY BE CARRIED BY ANY OTHER MEANS INCLUDING ROAD OR ANY
							OTHER CARRIER UNLESS SPECIFIC CONTRARY INSTRUCTIONS ARE GIVEN
							HEREON BY THE SHIPPER, AND SHIPPER AGREES THAT THE SHIPMENT MAY BE
							CARRIED VIA INTERMEDIATE STOPPING PLACES WHICH THE CARRIER DEEMS
							APPROPRIATE. THE SHIPPER&apos;S ATTENTION IS DRAWN TO THE NOTICE
							CONCERNING CARRIER&apos;S LIMITATION OF LIABILITY. Shipper may
							increase such limitation of liability by declaring a higher value
							for carriage and paying a supplemental charge if required.
						</Text>
					</Flex>
				</Block>
			</Flex>
		</div>
	);
};
export default ShipperConsigneeDetails;
