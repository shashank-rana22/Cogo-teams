import React from 'react';
import Text from '@cogoport/front/components/Text';
import { Flex, FlexCol, BlockCol, FlexRow } from './styles';

const WeightChargeDetails = () => {
	return (
		<BlockCol className="weight_charge_container">
			<FlexCol className="common_border_bottom common_flex">
				<FlexRow className="prepaid_block">
					<Flex className="prepaid_sub_block common_border_right" />
					<Flex className="prepaid_sub_devision common_border_bottom common_border_right">
						<Text size={9}>Prepaid</Text>
					</Flex>
					<Flex className="collect_block common_border_right" />
					<Flex className="common_justify_center weight_charge_sub_block common_border_bottom common_border_right">
						<Text size={9}>Weight Charges</Text>
					</Flex>
					<Flex className="collect_block common_border_right" />
					<Flex className="collect_sub_block common_border_bottom common_border_right">
						<Text size={9}>Collect</Text>
					</Flex>
					<Flex className="prepaid_sub_block" />
				</FlexRow>
				<FlexRow className="total_price_block">
					<Flex className="common_justify_center total_price_sub_block common_flex common_border_right">
						<Text size={13}>AS AGREED</Text>
					</Flex>
					<Flex style={{ flex: 1 }} />
				</FlexRow>
			</FlexCol>
			<FlexCol className="common_border_bottom common_flex">
				<FlexRow className="prepaid_block">
					<Flex className="valuable_charge_sub_block common_border_right" />
					<Flex className="common_justify_center valuable_charge_text_block common_border_bottom common_border_right">
						<Text size={9}>Valuation Charges</Text>
					</Flex>
					<Flex className="valuable_charge_end_block" />
				</FlexRow>
				<FlexRow className="total_price_block">
					<Flex className="common_flex common_border_right" />
					<Flex className="common_flex" />
				</FlexRow>
			</FlexCol>
			<FlexCol className="common_border_bottom common_flex">
				<FlexRow className="prepaid_block">
					<Flex className="tax_sub_block common_border_right" />
					<Flex className="common_justify_center tax_text_block common_border_bottom common_border_right">
						<Text size={9}>Tax</Text>
					</Flex>
					<Flex className="tax_end_block" />
				</FlexRow>
				<FlexRow className="total_price_block">
					<Flex className="common_flex common_border_right" />
					<Flex className="common_flex" />
				</FlexRow>
			</FlexCol>
			<FlexCol className="common_border_bottom common_flex">
				<FlexRow className="prepaid_block">
					<Flex className="total_other_charge_sub_block common_border_right" />
					<Flex className="common_justify_center total_other_charge_text_block common_border_bottom common_border_right">
						<Text size={9}>Total Other Charges Due Agent</Text>
					</Flex>
					<Flex className="total_other_charge_final_block" />
				</FlexRow>
				<FlexRow className="total_price_block">
					<Flex className="common_justify_center total_other_charge_text_value_block common_flex common_border_right">
						<Text size={13}>AS AGREED</Text>
					</Flex>
					<Flex className="common_flex" />
				</FlexRow>
			</FlexCol>
			<FlexCol className="carrier_container common_border_bottom common_flex">
				<FlexRow className="prepaid_block">
					<Flex className="carrier_sub_block common_border_right" />
					<Flex className="common_justify_center carrier_text_block common_border_bottom common_border_right">
						<Text size={9}>Total Other Charges Due Carrier</Text>
					</Flex>
					<Flex className="carrier_end_block" />
				</FlexRow>
				<FlexRow className="total_price_block">
					<Flex className="common_justify_center carrier_final_sub_block common_flex common_border_right">
						<Text size={13}>AS AGREED</Text>
					</Flex>
					<Flex className="common_flex" />
				</FlexRow>
			</FlexCol>
			<FlexRow className="total_prepaid_container">
				<Flex className="common_flex common_border_right" />
				<Flex className="common_flex" />
			</FlexRow>
			<FlexRow className="total_prepaid_container">
				<FlexCol className="common_flex common_border_right">
					<FlexRow className="prepaid_block ">
						<Flex className="prepaid_sub_block common_border_right" />
						<Flex className="common_justify_center prepaid_total_text_block common_border_bottom common_border_right">
							<Text size={9}>Total Prepaid</Text>
						</Flex>
						<Flex className="prepaid_sub_block " />
					</FlexRow>
					<Flex className="common_justify_center prepaid_total_value">
						<Text size={13}>AS AGREED</Text>
					</Flex>
				</FlexCol>
				<FlexCol className="common_flex ">
					<FlexRow className="prepaid_block">
						<Flex className="prepaid_sub_block common_border_right" />
						<Flex className="common_justify_center prepaid_collect_text_block common_border_bottom common_border_right">
							<Text size={9}>Total Collect</Text>
						</Flex>
						<Flex className="prepaid_sub_block" />
					</FlexRow>
					<Flex className="collect_prepaid_end" />
				</FlexCol>
			</FlexRow>
			<FlexRow className="total_prepaid_container">
				<FlexCol className="common_flex common_border_right">
					<FlexRow className="prepaid_block">
						<Flex className="Conversion_outer_text_block common_border_right" />
						<Flex className="common_justify_center conversion_text_block common_border_bottom common_border_right">
							<Text size={9}>Currency Conversion </Text>
						</Flex>
						<Flex className="conversion_end_block" />
					</FlexRow>
					<Flex className="conversion_end" />
				</FlexCol>
				<FlexCol className="common_flex">
					<FlexRow className="prepaid_block">
						<Flex className="currency_outer_text_block common_border_right" />
						<Flex className="common_justify_center currency_text_block common_border_bottom common_border_right">
							<Text size={9}>CC Charges in Dest. Currency</Text>
						</Flex>
						<Flex className="currency_final_end_block" />
					</FlexRow>
					<Flex className="currency_end" />
				</FlexCol>
			</FlexRow>
			<FlexRow className="destination_container">
				<Flex className="common_justify_center destination_text common_flex common_border_right">
					<Text size={9}>
						For Carrier&apos;s Use only at
						<Flex className="common_justify_center">
							<Text size={9}>Destination</Text>
						</Flex>
					</Text>
				</Flex>
				<FlexCol className="common_flex">
					<FlexRow className="prepaid_block">
						<Flex className="prepaid_sub_block common_border_right" />
						<Flex className="charges_container_text common_border_bottom common_border_right">
							<Text size={9}>Charges at Destination</Text>
						</Flex>
						<Flex className="prepaid_sub_block" />
					</FlexRow>
					<Flex className="charges_container_end" />
				</FlexCol>
			</FlexRow>
		</BlockCol>
	);
};
export default WeightChargeDetails;
