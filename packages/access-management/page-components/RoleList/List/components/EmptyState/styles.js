import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	background: #ffffff;
	border-radius: 10px;
	padding: 60px 30px 36px 30px;
`;

export const Heading = styled.h4`
	font-style: normal;
	font-weight: bold;
	font-size: 22px;
	line-height: 26px;
	letter-spacing: 0.02em;
	margin-block-start: 0em;
	margin-block-end: 0em;

	/* Black */

	color: #000000;
`;

export const Content = styled.p`
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 19px;
	letter-spacing: 0.02em;
	margin-block-start: 0em;
	margin-block-end: 0em;

	/* Black */

	color: #000000;
`;

export const IcContainer = styled.div`
	max-width: 17%;
	min-width: 10%;
	@media (max-width: _md) {
		display: none;
	}
`;

export const Wrapper = styled.div`
	max-width: 45%;
	&.side {
		max-width: 100%;
	}
	@media (max-width: 768px) {
		max-width: 100%;
	}
`;
