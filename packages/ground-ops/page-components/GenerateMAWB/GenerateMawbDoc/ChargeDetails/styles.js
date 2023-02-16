import styled from '@cogoport/front/styled';

export const Flex = styled.div`
	display: flex;
`;

export const Block = styled.div`
	display: flex;
	border: 1px #333 solid;
	flex: 1;
	min-height: 20px;
	border: 0px;
	font-weight: bold;
	padding-left: 240px;
	letter-spacing: 0px;
`;

export const BlockRow = styled.div`
	display: flex;
	border: 1px #333 solid;
`;

export const BlockCol = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px #333 solid;
`;

export const FlexCol = styled.div`
	display: flex;
	flex-direction: column;
`;

export const FlexRow = styled.div`
	display: flex;

	&.charge_container {
		flex: 1;
		min-height: 288px;
	}
`;
