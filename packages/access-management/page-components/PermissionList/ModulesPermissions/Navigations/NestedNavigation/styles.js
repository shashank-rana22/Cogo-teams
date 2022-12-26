import styled from '@cogoport/front/styled';

export const Container = styled.div`
	box-sizing: border-box;
	padding: 18px 35px 18px 18px;
	border-bottom: 1px solid #bdbdbd;
	&:last-child {
		border-radius: 8px;
		border-bottom: none;
	}

	@media (max-width: 768px) {
		padding: 8px 16px 8px 8px;
	}
`;

export const Row = styled.div`
	display: flex;
	align-items: center;

	&.margin {
		margin-bottom: 10px;
	}

	@media (max-width: 768px) {
		&.actions {
			justify-content: flex-end;
			width: 100%;
		}
	}
`;

export const Name = styled.p`
	margin: 0px;
	font-style: normal;
	font-weight: 500;
	font-size: 18px;
	line-height: 21px;

	display: flex;
	align-items: center;
	letter-spacing: -0.02em;

	color: #333333;
`;

export const Description = styled.p`
	margin: 0px;
	font-size: 12px;
	line-height: 14px;
	/* identical to box height */

	display: flex;
	align-items: center;
	letter-spacing: -0.02em;

	color: #333333;
`;
