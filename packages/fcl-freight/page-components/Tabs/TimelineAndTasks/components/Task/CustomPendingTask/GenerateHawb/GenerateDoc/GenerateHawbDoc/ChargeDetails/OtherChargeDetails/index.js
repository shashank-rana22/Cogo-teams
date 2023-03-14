import React from 'react';
import Text from '@cogoport/front/components/Text';
import { Flex, FlexCol, BlockCol, FlexRow } from './styles';

const OtherChargeDetails = ({ docData }) => {
	return (
		<>
			<BlockCol className="other_charge_container">
				<FlexCol className="other_container">
					<Flex className="other_charge_outer_text">
						<Text size={9}>
							Other Charges
							<Flex className="other_charge_text">
								<Text size={12}>{docData?.other_charges}</Text>
							</Flex>
						</Text>
					</Flex>
					<Flex className="other_charge_outer_text">
						<Text size={9}>
							Local Charges
							<Flex className="other_charge_text">
								<Text size={12}>{docData?.local_charges}</Text>
							</Flex>
						</Text>
					</Flex>
					<Flex className="other_charge_outer_text">
						<Text size={9}>
							Custom Charges
							<Flex className="other_charge_text">
								<Text size={12}>{docData?.custom_charges}</Text>
							</Flex>
						</Text>
					</Flex>
				</FlexCol>

				<FlexCol className="hereby_container">
					<Flex className="hereby_container_text">
						<Text size={8}>
							Shipper certifies that the particulars on the face hereof are
							correct and that insofar as any part of the consignment contains
							dangerous goods,such part is properly described by name and is in
							proper condition for carriage by air according to the applicable
							Dangerous Goods Regulations.
						</Text>
					</Flex>
					<Flex className="business_text">
						<Text size={14}> {docData?.business_name}</Text>
					</Flex>
					<FlexRow className="signature_text">
						<Text size={9}>Signature of Shipper or his Agent</Text>
					</FlexRow>
				</FlexCol>
				<BlockCol className="right_container">
					<FlexCol className="place_container">
						<FlexCol className="place_sub_container">
							<Flex>
								<Text size={7}>
									It is agreed that the goods described here in are accepted in
									apparent goods order and condition (except as noted for
									carriage
								</Text>
							</Flex>
							<Flex className="subject_conditions">
								<Text size={9}>
									SUBJECT TO THE CONDITIONS OF CONTRACT ON THE REVERSE HERE OF
								</Text>
							</Flex>
						</FlexCol>
						<Flex className="place_container_outer_text">
							<Flex className="place_container_text">
								<Text size={14}>
									{`${new Date().toLocaleString().substring(1, 10)}`}
								</Text>
							</Flex>
							<Flex className="place_value">
								<Text size={14} style={{ paddingLeft: '5px' }}>
									{docData?.origin?.name}
								</Text>
							</Flex>
						</Flex>
						<FlexRow className="date_container">
							<Flex className="date_text">
								<Text size={8}>Executed on</Text>
							</Flex>
							<Flex className="other_text">
								<Text size={8}>(other)</Text>
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
									<Text size={9}>Total Other Charges</Text>
								</Flex>
								<Flex className="collecte_end_block" />
							</FlexRow>
							<Flex className="collecte_block_end" />
						</FlexCol>
						<Flex className="end_final">
							<Text size={14}>HAWB-{docData?.serial_id}</Text>
						</Flex>
					</FlexRow>
				</BlockCol>
			</BlockCol>
		</>
	);
};
export default OtherChargeDetails;
