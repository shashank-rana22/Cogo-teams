import styled from '@cogoport/front/styled';

export const Container = styled.div`
	margin-bottom: 12px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #cbcfeb;
	.core-ui-input-root {
		width: 600px;
		border: none;
		&:hover {
			border: none;
		}
		&:focus-within {
			box-shadow: none;
		}
	}
	.core-ui-input-control {
		font-size: 14px;
		font-weight: 500;
	}
`;

export const Prefix = styled.p`
	margin: 0px;
	font-weight: 700;
	font-size: 14px;
	line-height: 150%;

	color: #333333;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
`;
