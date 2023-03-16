import { Modal } from '@cogoport/components';
import styled from '@cogoport/front/styled';

export const CustomModal = styled(Modal)`
	.ui-modal-dialog {
		padding: 0px;

		@media (max-width: 768px) {
			width: 300px;
		}
	}
`;
export const ChatIcon = styled.div`
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;

	@media (max-width: 768px) {
		width: 35%;
		margin: 8px;
		height: 20px;
	}
`;

export const ChatContainer = styled.div`
	z-index: 100;
	transition: 150ms ease-in-out;
`;

export const Circle = styled.div`
	background-color: #f68b21;
	color: #ffffff;
	position: absolute;
	width: fit-content;
	height: 20px;
	font-size: 11px;
	padding: 2px 4px;
	top: -5px;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
`;
