import styled from '@cogoport/front/styled';

export const Container = styled.div``;

export const Header = styled.div`
	border-bottom: 1px dashed #828282;
	padding: 5px;
`;

export const Heading = styled.p`
	margin: 0px;
	font-weight: 500;
	font-size: 18px;
	line-height: 21px;
	display: flex;
	align-items: center;
	letter-spacing: -0.02em;
	padding-top: 0px;

	color: #333333;
`;

export const SubHeading = styled.div`
	font-size: 12px;
	line-height: 14px;

	display: flex;
	align-items: center;
	letter-spacing: -0.02em;

	color: #333333;
`;

export const ButtonDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 48px;
`;

export const StyledModal = styled.div`
	background: #ffffff;
	border-radius: 8px;
`;

export const StyledPara = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	margin-top: 50px;

	.core-ui-tag-root {
		background: #ffffff;
		text-align: center;
		border: 1px solid #000000;
		box-sizing: border-box;
		border-radius: 13px;
	}
	.core-ui-tag-root {
		padding: 10px 35px;
	}

	.core-ui-tag-text {
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 16px;
		letter-spacing: -0.02em;
		color: #000000;
		text-transform: capitalize;
	}
	.active {
		.core-ui-tag-root {
			background-color: #000000;
			border-color: #000000;
		}
		.core-ui-tag-text {
			color: #ffffff;
		}
	}
	.core-ui-select_control {
		background: #ffffff;
		border: 1px solid #d6d6d6;
		box-sizing: border-box;
		box-shadow: 0px 4px 14px rgba(193, 193, 193, 0.25);
		border-radius: 5px;
		margin-left: 10px;
	}
`;

export const Label = styled.p`
	margin: 0px;
	font-size: 14px;
	line-height: 16px;
	display: flex;
	align-items: center;
	letter-spacing: -0.02em;
	min-width: 25%;
	color: #333333;
`;

export const DisclaimerLabel = styled.div`
	margin: 0px;
	margin-top: 16px;
	font-size: 12px;
	line-height: 14px;
	display: flex;
	align-items: center;
	letter-spacing: -0.02em;

	color: #333333;
`;

export const InfoContent = styled.p`
	margin: 0px;
	font-size: 12px;
	line-height: 14px;
	display: flex;
	align-items: center;
	letter-spacing: -0.02em;
	margin: 4px 0px;
	color: #333333;
	.bold {
		font-weight: bold;
		margin-right: 4px;
		width: 80px;
		min-width: 80px;
	}
`;
