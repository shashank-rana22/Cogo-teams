import styled from '@cogoport/front/styled';

export const Container = styled.div`
	background: #ffffff;
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
	border-radius: 4px;
	padding: 18px 16px;
	display: flex;
	align-items: center;
	margin: 4px 4px 16px 4px;
	margin-right: 0px;
	border-right: 1px solid #ded7fc;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	border-right: 1px solid #ded7fc;
	.core-ui-tooltip-root {
		width: 88%;
	}
`;

export const Label = styled.p`
	margin: 0px;
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 14px;
	letter-spacing: 0.02em;

	color: #828282;
`;

export const Value = styled.p`
	margin: 0px;
	margin-left: 10px;
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 18px;
	letter-spacing: 0.02em;
	display: block;

	color: #333333;

	&.small {
		font-size: 12px;
		line-height: 16px;
	}
`;

export const StyledRadio = styled.div`
	border-left: 1px solid #ded7fc;
	margin-left: 12px;
	padding-left: 24px;
	padding-right: 12px;
`;
