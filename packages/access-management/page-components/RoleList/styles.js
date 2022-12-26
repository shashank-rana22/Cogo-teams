import styled from '@cogoport/front/styled';

export const Container = styled.section`
	padding: 1rem;

	& > :not(:last-child) {
		margin-bottom: 1.5rem;
	}

	@media (min-width: 1165px) {
		padding: 1rem 0;
	}
`;

export const FiltersAndListContainer = styled.section`
	& > :not(:last-child) {
		margin-bottom: 1.5rem;
	}
`;

export const ListAndPaginationContainer = styled.section`
	& > :not(:last-child) {
		margin-bottom: 0.75rem;
	}
`;
