import { Button } from '@cogoport/front/components';
import styled from '@cogoport/front/styled';

export const Container = styled.section`
	padding: 1rem;

	display: flex;
	flex-direction: column;
	gap: 1rem;

	@media (min-width: 1165px) {
		padding: 1rem 0;
	}
`;

export const BackButtonContainer = styled.div``;

export const BackButton = styled(Button)`
	background: transparent;
	color: #333333;
	border: none;
	font-size: 0.75rem;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.02em;
	line-height: 1rem;

	cursor: pointer;

	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 0.25rem;

	& svg {
		width: 1.25rem;
		height: 1.25rem;
	}

	&:hover {
		box-shadow: none;
		background: #e0e0e0;
	}

	&:active {
		background: transparent;
	}
`;
