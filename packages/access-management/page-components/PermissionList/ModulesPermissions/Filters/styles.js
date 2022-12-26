import styled from '@cogoport/front/styled';

export const Container = styled.section`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	@media (min-width: 480px) {
		flex-direction: row;
		gap: 1rem;

		& > :first-child {
			flex: 1;
		}
	}

	@media (min-width: 768px) {
		flex: 1;

		justify-content: flex-end;
		align-items: center;
	}
`;

export const FilterButton = styled.button`
	background: #cddbff;
	border-radius: 8px;
	border: none;
	padding: 10px 24px;
	font-weight: 500;
	font-size: 14px;
	line-height: 18px;
	display: flex;
	align-items: center;
	text-align: center;
	letter-spacing: -0.02em;
	color: #356efd;
	cursor: pointer;
	&:hover {
		box-shadow: 0px 4px 10px rgb(0 0 0 / 25%);
	}
`;

export const Label = styled.p`
	margin: 0px;
	font-weight: 500;
	font-size: 14px;
	line-height: 16px;
	display: flex;
	align-items: center;
	letter-spacing: -0.02em;

	color: #333333;
	margin-bottom: 8px;
`;
