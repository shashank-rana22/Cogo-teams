import styled from '@cogoport/front/styled';
import Modal from '@cogoport/front/components/admin/Modal';

export const Container = styled.div`
	width: 100%;
	border-radius: 4px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 16px;

	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
	}
`;

export const StyledModal = styled(Modal)`
	.ui-modal-dialog {
		min-height: calc(100vh - 20vh) !important;
	}
`;

export const ContainerInfo = styled.div`
	width: 85%;
	background: #ffffff;
	border-radius: 4px;
	display: flex;
	flex: 1;
	justify-content: space-between;
	padding: 10px 12px 10px 22px;
	margin-right: 16px;

	@media (max-width: 768px) {
		width: 100%;
		height: fit-content;
	}
`;

export const ServiceDetail = styled.div`
	width: 26%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 16px;

	@media (max-width: 768px) {
		width: 100%;
		height: fit-content;
		padding: 8px 10px 8px 10px;
	}
`;

export const CancellationWrapper = styled.div`
	display: flex;
	justify-content: end;
	align-items: center;
`;

export const SerialId = styled.div`
	font-size: 12px;
	color: #333333;
	display: flex;
	align-items: center;
	white-space: nowrap;

	@media (max-width: 768px) {
		display: flex;
		width: 100%;
		height: fit-content;
		border: none;
	}
`;

export const Customer = styled.div`
	font-size: 12px;
	color: #333333;
	font-weight: 500;
	white-space: nowrap;
	max-width: 200px;
	overflow: hidden;
	text-overflow: ellipsis;
	cursor: pointer;
`;

export const PoNumber = styled.div`
	font-weight: 400;
	font-size: 12px;
	color: #bdbdbd;
	display: flex;
	align-items: center;
	margin-top: 4px;
`;

export const Row = styled.div`
	border-right: 1px solid #e0e0e0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-right: 20px;

	.core-ui-button-root {
		padding: 0px !important;
		width: fit-content;
		border: none;
		text-decoration: underline;
		margin-top: 4px;

		&:hover {
			box-shadow: none !important;
		}
	}
`;

export const PocSop = styled.div``;
