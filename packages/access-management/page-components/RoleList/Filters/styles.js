import styled from '@cogoport/front/styled';

export const Container = styled.section`
	display: flex;

	flex-direction: column;

	& > :not(:last-child) {
		margin-bottom: 1rem;
	}

	@media (min-width: 768px) {
		flex-direction: row;

		& > :not(:last-child) {
			margin-bottom: 0;
			margin-right: 1rem;
		}
	}
`;

export const SelectContainer = styled.div`
	flex: 1;

	display: flex;
	flex-direction: row;

	& > :not(:last-child) {
		margin-right: 1rem;
	}

	& .core-ui-select__menu {
		min-width: unset;
		width: 100%;
	}
`;
