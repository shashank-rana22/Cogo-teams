import styled from '@cogoport/front/styled';
import { Modal } from '@cogoport/front/components/admin';

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

export const Heading = styled.div`
	font-weight: 500;
	font-size: 18px;
	color: #393f70;
	margin-bottom: 12px;
`;

export const StyledModal = styled(Modal)`
	.core-ui-select-root {
		margin-bottom: 20px;
	}
	.form-item-label {
		margin: 4px 0px;
		font-weight: 400;
		font-size: 12px;
	}
`;

export const ButtonContainer = styled.div`
	padding: 20px 12px 0px 0px;
	display: flex;
	justify-content: flex-end;
`;
