import styled from '@cogoport/front/styled';
import Modal from '@cogoport/front/components/admin/Modal';

export const StyledModal = styled(Modal)`
	.ui-modal-dialog {
		min-height: 69vh !important;
	}
`;

export const Heading = styled.div`
	font-weight: 500;
	font-size: 18px;
	color: #393f70;
	margin: 14px 0 32px 8px;

	&.sub_heading {
		font-weight: 500;
		font-size: 14px;
		color: #383f70;
		border-bottom: 1px solid #383f70;
		width: fit-content;
		margin: 14px 0px 28px 12px;
	}
`;

export const Form = styled.div`
	height: 49vh;
`;

export const ConfirmLabel = styled.div`
	margin-left: 8px;
	font-weight: 500;
	font-size: 14px;
	color: #393f70;
	width: 80%;
`;

export const ButtonContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-end;
	align-items: center;
	border-top: 1px solid #bdaff9;
	padding-top: 18px;

	.reviewed {
		&.core-ui-button-root {
			padding: 9px 16px;
		}
	}

	.core-ui-button-root {
		text-transform: capitalize;
		width: 100px;
	}
`;

export const Title = styled.div`
	font-weight: 400;
	font-size: 14px;
	text-transform: capitalize;
	color: #393f70;
	margin-bottom: 12px;
	width: 5%;
	white-space: nowrap;

	&.value {
		font-weight: 500;
		color: #393f70;
	}
`;

export const Flex = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	margin-bottom: 26px;
	margin-left: 24px;

	&.row {
		flex-direction: row;
		margin-bottom: 0px;
	}
`;

export const Line = styled.div`
	border-top: 2px solid #cbd1f8;
	margin-right: 24px;
	width: 32px;
	position: relative;
	margin-bottom: 12px;

	&.arrow::after {
		content: '';
		position: absolute;
		right: 0;
		top: -6px;
		width: 10px;
		height: 10px;
		border: 2px solid red;
		border-color: transparent #cbd1f8 #cbd1f8 transparent;
		transform: rotateZ(-40deg) skew(15deg, 15deg);
	}
`;

export const Message = styled.div`
	display: flex;
	margin-bottom: 24px;
`;
