import styled from '@cogoport/front/styled';

export const Flex = styled.div`
	display: flex;
	&.flex_font_weight {
		font-weight: bold;
	}
	&.flex_border_solid {
		border-bottom: 1px solid;
	}
	&.flex_in_flex {
		flex: 0.4;
	}
	&.flex_in_flex_b {
		flex: 2.2;
	}
	&.flex_justify_end {
		justify-content: flex-end;
	}
	&.flex_justify_center {
		justify-content: center;
	}
	&.flex_in_flex_empty_top {
		flex: 0.134;
	}
	&.flex_in_flex_empty_bottom {
		flex: 0.876;
	}
	&.block_a_container_section_rcp {
		padding-left: 5px;
	}
	&.block_a_container_bottom_package {
		padding-right: 3px;
	}
	&.block_e_container_commodity_text_section {
		border-top: 1px solid;
	}
	&.block_e_container_commodity_empty_section {
		border-right: 1px solid;
	}
	&.block_e_container_rateclass_section {
		flex: 0.3;
	}
	&.grossweight_text {
		padding-top: 9px;
	}
	&.commodity_text_style {
		padding-top: 4px;
	}
	&.margin_remarks {
		margin-top: 8px;
	}
	&.block_e_container_Q_section {
		border-right: 1px solid;
		padding-top: 1px;
	}
	&.chargeableweight_text {
		padding-left: 4px;
		padding-top: 6px;
	}
	&.block_a_container_top_package {
		background-color: white;
		padding-right: 3px;
	}
	&.block_a_container_volume {
		position: absolute;
		padding-top: 40px;
		padding-left: 60px;
		width: 195px;
		margin-right: -100px;
		max-width: 200%;
	}
	&.sci_text_style {
		border-left: 1px solid;
		border-top: 1px solid;
		padding: 2px 14px 2px 12px;
	}
	.input_control {
		min-width: 220px;
		border-radius: 0;
		padding: 0 2px;
		border: none;
		height: 16px;
		outline: none;
		font-weight: bold;
		border-right: none;
		:focus {
			outline: none;
		}
	}
	.volume_weight_input {
		background: transparent;
		width: 400px;
		margin-left: 5px;
		height: 16px;
		border: none;
		font-weight: bold;
		border-radius: 0;
	}
	.remarks_input {
		background: transparent;
		width: 450px;
		height: 16px;
		border: none;
		margin-left: 5px;
		font-weight: bold;
		border-radius: 0;
	}
	.vol_weight_box {
		overflow: visible;
		flex-direction: column;
		font-size: 8;
	}
	.remark_box {
		padding-left: 2px;
		width: 400px;
	}
	.volume_box {
		width: 200px;
	}
	.core-ui-input-root {
		padding: 0px;
	}
	.handling_information_width {
		width: 674px;
		padding: 0px 2px;
		height: 16px;
		border: none;
	}
	.core-ui-input-control {
		font-weight: bold;
	}
`;

export const Block = styled.div`
	display: flex;
	border: 1px #333 solid;
	&.block_flex_border {
		flex: 1;
		border-top: 0px;
	}
	&.handling_information {
		min-height: 60px;
	}
	&.container_section {
		min-height: 250px;
	}
`;

export const FlexCol = styled.div`
	display: flex;
	flex-direction: column;
	&.inner_handling_information {
		flex: 1.95;
		justify-content: flex-start;
		padding-left: 5px;
	}
	&.sci_handling_information {
		flex: 0.05;
		height: 75px;
		padding-left: 5px;
		justify-content: flex-end;
	}
	&.block_e_container_top_section {
		flex: 0.134;
	}
	&.block_m_container_section {
		flex: 2.6;
	}
	&.border_right_solid {
		border-right: 1px solid;
	}
	&.block_a_container_section {
		flex: 0.5;
	}
	&.block_b_container_section {
		flex: 0.9;
	}
	&.block_c_container_section {
		flex: 0.07;
	}
	&.block_k_container_section {
		flex: 1.4;
	}
	&.block_egi_container_section {
		flex: 1;
	}
`;

export const FlexRow = styled.div`
	display: flex;
	&.block_e_container_commodity_section {
		flex: 0.7;
	}
	&.block_e_container_bottom_section {
		flex: 0.876;
	}
	&.block_dfhjl_container_section {
		flex: 0.07;
		border-right: 1px solid;
	}
`;
