import styled from '@cogoport/front/styled';
import { Grid } from '@cogoport/front/components';

export const Container = styled(Grid.Container)`
	display: none;

	@media (min-width: 768px) {
		display: block;
		max-width: 100% !important;
		padding: 0 !important;

		background: #cddbff;
		border-radius: 8px 8px 0px 0px;
		/* padding: 1rem; */
		margin: 0;
	}
`;

export const Row = styled(Grid.Row)`
	padding: 1rem;
`;

export const Col = styled(Grid.Col)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const Title = styled.span`
	font-size: 14px;
	font-weight: 500;
	line-height: 16px;
	letter-spacing: -0.02em;
	color: #333333;
	text-align: center;
`;
