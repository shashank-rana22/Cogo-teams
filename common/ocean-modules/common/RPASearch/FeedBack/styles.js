import styled from '@cogoport/front/styled';
import BackButton from '../../assets/back-icon.svg';

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

export const StyledBackButton = styled(BackButton)`
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
	margin-bottom: 138px;
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
