import styled from '@cogoport/front/styled';

export const Flex = styled.div`
	display: flex;

	&.common_justify_center {
		justify-content: center;
	}

	&.prepaid_sub_block {
		flex: 0.1;
	}
	&.common_flex {
		flex: 1;
	}
	&.common_border_right {
		border-right: 1px solid;
	}
	&.common_border_bottom {
		border-bottom: 1px solid;
	}
	&.prepaid_sub_devision {
		flex: 0.2;
		padding-left: 10px;
		padding-right: 10px;
	}
	&.weight_charge_sub_block {
		flex: 0.86;
	}
	&.collect_block {
		flex: 0.212;
	}
	&.collect_sub_block {
		flex: 0.2;
		padding-left: 10px;
		padding-right: 10px;
	}
	&.total_price_sub_block {
		font-weight: bold;
	}
	&.valuable_charge_sub_block {
		flex: 0.6;
	}
	&.valuable_charge_text_block {
		flex: 1.1;
	}
	&.valuable_charge_end_block {
		flex: 0.6;
	}
	&.tax_sub_block {
		flex: 1.25;
	}
	&.tax_text_block {
		flex: 0.5;
	}
	&.tax_end_block {
		flex: 1.25;
	}
	&.total_other_charge_sub_block {
		flex: 0.26;
	}
	&.total_other_charge_final_block {
		flex: 0.25;
	}
	&.total_other_charge_text_block {
		flex: 1.5;
	}
	&.total_other_charge_text_value_block {
		font-weight: bold;
	}
	&.carrier_sub_block {
		flex: 0.26;
	}
	&.carrier_text_block {
		flex: 1.5;
	}
	&.carrier_end_block {
		flex: 0.25;
	}
	&.carrier_final_sub_block {
		font-weight: bold;
	}
	&.prepaid_total_text_block {
		flex: 0.8;
	}
	&.prepaid_total_value {
		flex: 0.7;
		font-weight: bold;
	}
	&.prepaid_collect_text_block {
		flex: 0.8;
	}
	&.collect_prepaid_end {
		flex: 0.7;
	}
	&.Conversion_outer_text_block {
		flex: 0.05;
	}
	&.conversion_text_block {
		flex: 0.92;
	}
	&.conversion_end_block {
		flex: 0.05;
	}
	&.conversion_end {
		flex: 0.7;
	}
	&.currency_outer_text_block {
		flex: 0.05;
	}
	&.currency_text_block {
		flex: 0.92;
	}
	&.currency_final_end_block {
		flex: 0.05;
	}
	&.currency_end {
		flex: 0.7;
	}
	&.destination_text {
		flex: 1;
	}
	&.charges_container_text {
		flex: 0.92;
		padding-left: 10.5px;
		padding-right: 6.75px;
	}
	&.charges_container_end {
		flex: 0.7;
	}
`;

export const BlockCol = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px #333 solid;

	&.weight_charge_container {
		flex: 0.8;
		border-top: 0px;
	}
`;

export const FlexCol = styled.div`
	display: flex;
	flex-direction: column;

	&.common_flex {
		flex: 1;
	}
	&.common_border_bottom {
		border-bottom: 1px solid;
	}
	&.common_border_right {
		border-right: 1px solid;
	}
`;

export const FlexRow = styled.div`
	display: flex;

	&.charge_container {
		flex: 1;
		min-height: 288px;
	}
	&.prepaid_block {
		flex: 0.3;
	}
	&.total_price_block {
		flex: 0.7;
	}
	&.total_prepaid_container {
		flex: 1;
		border-bottom: 1px solid;
	}
	&.destination_container {
		flex: 1;
	}
`;
