import styled from '@cogoport/front/styled';

export const Container = styled.section`
	& .core-ui-input-root {
		border-radius: 25px;

		& .core-ui-input-control {
			padding: 0 1rem;
		}

		& .core-ui-input-suffix {
			padding: 0 0.5rem;

			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			& svg {
				width: 1.5rem;
				height: 1.5rem;
			}
		}
	}

	@media (min-width: 768px) {
		width: 30%;
	}
`;
