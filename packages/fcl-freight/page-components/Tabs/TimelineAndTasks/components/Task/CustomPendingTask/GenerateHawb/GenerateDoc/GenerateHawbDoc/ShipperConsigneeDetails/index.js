import React from 'react';
import Text from '@cogoport/front/components/Text';
import { Flex, BlockCol, BlockRow, FlexRow, FlexCol } from './styles.js';

const ShipperConsigneeDetails = ({ docData }) => {
	return (
		<div>
			<BlockRow className="hawb_number">
				<Flex className="hawb_number_space flex_border_right" />
				<Flex className="hawb_number_bill flex_border_right">
					<Text size={14}>HOUSE AIRWAY BILL</Text>
				</Flex>
				<Flex className="flex_font_bold hawb_number_bill_number">
					<Text size={14}>HAWB-{docData?.serial_id}</Text>
				</Flex>
			</BlockRow>
			<Flex>
				<BlockCol className="shipper_consignee_details">
					<BlockRow className="shipper_details">
						<FlexRow className="shipper_consignee_name_address">
							<Text size={9}>
								Shipper&apos;s Name and Address
								<Flex className="flex_font_bold">
									<Text size={12}>{docData?.shipper_details}</Text>
								</Flex>
							</Text>
						</FlexRow>
						<FlexCol className="shipper_consignee_account_number">
							<Text size={9}>Shipper&apos;s Account Number</Text>
						</FlexCol>
					</BlockRow>
					<BlockRow className="consignee_details">
						<FlexRow className="shipper_consignee_name_address">
							<Text size={9}>
								Consignee&apos;s Name and Address
								<Flex className="flex_font_bold">
									<Text size={12}>{docData?.consignee_details}</Text>
								</Flex>
							</Text>
						</FlexRow>
						<FlexCol className="shipper_consignee_account_number">
							<Text size={9}>Consignee&apos;s Account Number</Text>
						</FlexCol>
					</BlockRow>
				</BlockCol>
				<BlockCol className="issuedby_validation_conditions">
					<Flex className="flex_left_padding_short flex_border_bottom not_negotiable_issued_by">
						<img
							src="https://cogoport-testing.sgp1.digitaloceanspaces.com/a823232211e75736d0dad02cc35b5c3e/not_negotiable_issued_by.png"
							alt=""
							width="100%"
							height="100%"
						/>
					</Flex>
					<Flex className="flex_left_padding_short flex_border_bottom airway_bill_copies">
						<Text size={9}>
							Copies 1,2 and 3 of this Air Waybill are originals and have the
							same validity.
						</Text>
					</Flex>
					<Flex className="flex_left_padding_short flex_border_bottom iata_carrier">
						<Flex className="flex_border_right iata_carrier_text">
							<Text size={13}>IATA CARRIER</Text>
						</Flex>
					</Flex>
					<Flex className="flex_left_padding_short flex_font_bold rbi_permint">
						<Text size={13}>
							RBI Permint No. - EC.DEL.F&P/46/04.67.01/97-98
						</Text>
					</Flex>
				</BlockCol>
			</Flex>
		</div>
	);
};
export default ShipperConsigneeDetails;
