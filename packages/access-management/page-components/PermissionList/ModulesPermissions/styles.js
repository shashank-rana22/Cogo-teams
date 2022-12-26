import styled from '@cogoport/front/styled';

export const Container = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	@media (min-width: 768px) {
		flex-direction: row;
		align-items: center;

		& .heading-container {
			flex-basis: 45%;
		}
	}
`;

export const TabsContainer = styled.section`
	background: #ffffff;
	border-radius: 0.5rem;
	padding-bottom: 1rem;

	& .ui-tabs {
		all: unset;

		display: flex;
		flex-direction: column;
	}

	& .ui-tabs-list {
		all: unset;

		display: flex;
		flex-direction: row;

		border-bottom: 1px solid #828282;
	}

	& .ui-tabs-list-container {
		all: unset;

		flex: 1;

		padding: 0.25rem;
		cursor: pointer;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		@media (min-width: 768px) {
			padding: 1rem;
		}
	}

	& .ui-tabs-list-container.active {
		border-bottom: 3px solid #356efd;
	}

	& .ui-tabs-list-title {
		all: unset;

		color: #828282;
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.75rem;
		letter-spacing: 0.04rem;
	}
`;
