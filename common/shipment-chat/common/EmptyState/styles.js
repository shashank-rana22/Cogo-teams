import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #ffffff;
	border-radius: 10px;
	padding: 30px 60px;
	.empty-state-icon {
		@media (max-width: 768px) {
			display: none;
		}
	}
`;

export const Heading = styled.div`
	font-weight: 500;
	font-size: 24px;
	@media (max-width: 768px) {
		font-size: 16px;
	}
`;

export const Content = styled.div`
	font-size: 16px;
	@media (max-width: 768px) {
		font-size: 12px;
	}
`;

export const Wrapper = styled.div``;
