import styled from '@cogoport/front/styled';

export const Flex = styled.div`
	display: flex;

	&.other_charge_outer_text {
		flex: 1;
		padding-left: 3px;
	}

	&.other_charge_text {
		font-weight: bold;
		padding-left: 3px;
		text-transform: uppercase;
	}

	&.hereby_container_text {
		flex: 1.3;
		padding-left: 5px;
	}

	&.business_text {
		flex: 0.4;
		justify-content: center;
		font-weight: bold;
	}

	&.place_sub_container {
		flex: 1.5;
		padding-left: 5px;
	}

	&.place_container_text {
		width: 36%;
		font-weight: bold;
		padding-left: 5px;
	}

	&.place_value {
		font-weight: bold;
	}

	&.date_text {
		flex: 1;
		padding-left: 5px;
	}

	&.place_text {
		flex: 0.9;
		justify-content: flex-end;
	}

	&.signature_value {
		flex: 1.5;
		justify-content: flex-end;
	}

	&.collected_block {
		flex: 0.1;
		border-right: 1px solid;
	}

	&.collecte_block_text {
		flex: 0.8;
		border-right: 1px solid;
		border-bottom: 1px solid;
		justify-content: center;
	}

	&.collecte_end_block {
		flex: 0.1;
	}

	&.collecte_block_end {
		flex: 0.7;
	}

	&.end_final {
		flex: 1.29;
		justify-content: flex-end;
		padding-top: 10px;
		padding-right: 3px;
		font-weight: bold;
	}
	.input_control {
		width: 100%;
		border-radius: 0;
		padding: 0 2px;
		font-weight: bold;
	}
	.input_place {
		width: 100%;
		text-align: center;
		font-weight: bold;
		border: none;
		outline: none;
		border-radius: 0;
	}
	.text {
		text-align: justify;
		padding-right: 6px;
	}
`;

export const Block = styled.div`
	display: flex;
	border: 1px #333 solid;
`;

export const BlockRow = styled.div`
	display: flex;
	border: 1px #333 solid;
`;

export const BlockCol = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px #333 solid;

	&.other_charge_container {
		flex: 1.2;
		border: none;
	}

	&.right_container {
		flex: 1;
		border-left: 0px;
		border-right: 0px;
		border-bottom: 0px;
	}
`;

export const FlexCol = styled.div`
	display: flex;
	flex-direction: column;

	&.other_container {
		flex: 1;
		border-bottom: 1px solid;
		border-right: 1px solid;
	}

	&.hereby_container {
		flex: 1;
		border-right: 1px solid;
	}

	&.place_container {
		flex: 0.67;
		border-bottom: 1px solid;
		border-right: 1px solid;
	}
	&.down_container_block {
		flex: 0.644;
		border-right: 1px solid;
		border-bottom: 1px solid;
	}
`;

export const FlexRow = styled.div`
	display: flex;

	&.charge_container {
		flex: 1;
		min-height: 288px;
	}

	&.signature_text {
		flex: 0.3;
		border-right: 0px;
		border-left: 0px;
		border-bottom: 0px;
		border-style: dashed;
		border-width: 1;
		border-radius: 1;
		justify-content: center;
	}

	&.date_container {
		flex: 0.4;
		border-right: 0px;
		border-left: 0px;
		border-bottom: 0px;
		border-style: dashed;
		border-width: 1;
		border-radius: 1;
	}

	&.down_container {
		flex: 0.33;
	}

	&.collected_container {
		flex: 0.3;
	}
`;
