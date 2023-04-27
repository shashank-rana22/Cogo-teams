import styled from '@cogoport/front/styled';
import Arrow from '../../assets/back-icon.svg';

export const Container = styled.div`
	padding: 22px;
	min-width: 900px;
	max-width: 900px;
	min-height: 432px;
`;

export const Heading = styled.div`
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 15px;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	color: #393f70;
	margin-bottom: 32px;
`;

export const StyledButton = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 8px;
`;

export const FeebBackClick = styled.span`
	color: blue;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;

export const CancelButton = styled.div`
	display: flex;
	margin-right: 10px;
`;

export const StyledCheckBox = styled.div`
	display: flex;
	justify-content: start;
`;

export const TextFeedBack = styled.div`
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	margin-left: 12px;
	letter-spacing: 0.04em;
	color: #393f70;
`;

export const StyledBackButton = styled(Arrow)`
	cursor: pointer;
	margin-right: 12px;
`;

export const Header = styled.div`
	display: flex;
	justify-content: start;
`;

export const RemarksTextArea = styled.div`
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;

	color: #393f70;
	margin-bottom: 12px;
`;
export const StyledTextArea = styled.div`
	margin-top: 24px;
	margin-bottom: 120px;
	.ui-textarea {
		padding: 8px;
		font-weight: 400;
		font-size: 14px;
		line-height: 14px;
		letter-spacing: 0.02em;
		::placeholder {
			font-weight: 400;
			font-size: 14px;
			line-height: 14px;
			letter-spacing: 0.02em;
			color: #cbcff5;
		}
	}
`;

export const Text = styled.div`
	font-weight: 500;
	font-size: 14px;
	line-height: 18px;
	letter-spacing: 0.04em;
	color: #393f70;
	margin: 16px;
`;

export const Box = styled.div`
	background: #ffffff;
	border: 1px solid #393f70;
	border-radius: 8px;
	padding: 16px 20px;
	margin: 0px 12px 16px 0px;
	color: #393f70;
`;
export const Boxes = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin: 20px;
`;

export const StyledArrow = styled(Arrow)`
	transform: rotate(180deg);
	margin-bottom: 16px;
	margin-right: 10px;
`;
