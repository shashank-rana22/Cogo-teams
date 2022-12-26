import styled from '@cogoport/front/styled';

export const Container = styled.div``;

export const Title = styled.p`
	margin: 0;

	font-weight: 500;
	font-size: 18px;
	line-height: 21px;
	display: flex;
	align-items: center;
	letter-spacing: -0.02em;

	color: #333333;

	@media (min-width: 768px) {
		font-size: 1.5rem;
	}
`;

export const SubTitle = styled.span`
	color: #333333;
	font-size: 0.75rem;
	font-weight: 400;
	/* line-height: 0.75rem; */
`;
