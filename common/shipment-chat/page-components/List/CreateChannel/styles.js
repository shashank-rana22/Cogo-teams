import { Modal } from '@cogoport/components';
import styled from '@cogoport/front/styled';

export const StyledModal = styled(Modal)`
	@media (max-width: 768px) {
		.ui-modal-dialog {
			width: 80vw;
			min-width: 300px;
		}
	}
`;

export const Container = styled.div`
	position: absolute;
	top: 0px;
	right: 5px;
	padding: 5px 0;

	@media (max-width: 768px) {
		right: 25px;
	}
`;

export const SubContainer = styled.div`
	font-weight: 500;
	color: #333;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px 4px;
	fill: #fff;
	cursor: pointer;

	:hover {
		color: #fff;
		background: #303b67;
		box-shadow: 0px 0px 10px rgb(0 0 0 / 15%);
	}
`;
