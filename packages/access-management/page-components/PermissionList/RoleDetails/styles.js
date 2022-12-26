import styled from '@cogoport/front/styled';

export const Container = styled.section`
	background: #ffffff;
	padding: 1rem;
	border-radius: 0.5rem;

	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 20px;
`;

export const HeadingContainer = styled.div`
	border-bottom: 2px dashed #bdbdbd;
	padding-bottom: 0.75rem;

	display: flex;
	flex-direction: column;

	gap: 1rem;

	@media (min-width: 768px) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const Detail = styled.div`
	color: #333333;
	line-height: 1rem;

	display: flex;
	flex-direction: column;

	& .title {
		font-size: 0.75rem;
		font-weight: 400;
	}

	& .data {
		font-size: 1rem;
		font-weight: 500;
	}

	@media (min-width: 768px) {
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;

		& .title {
			font-size: 14px;
			font-weight: 500;

			&::after {
				content: ' - ';
			}
		}

		& .data {
			font-size: 0.75rem;
			font-weight: 400;
		}
	}
`;
