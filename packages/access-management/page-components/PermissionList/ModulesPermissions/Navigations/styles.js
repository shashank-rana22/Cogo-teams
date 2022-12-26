import styled from '@cogoport/front/styled';

export const Container = styled.div`
	margin-top: 40px;
	background: #ffffff;
	border-radius: 8px;
	padding-top: 10px;

	.ui-tabs-list {
		margin-bottom: 0px;
	}

	.ui-tabs-list-container {
		width: 100%;
		padding-bottom: 16px;
		align-items: center;
		display: flex;
		justify-content: center;
		&.active {
			border-color: black;
			padding-bottom: 13px;
		}
	}

	.ui-tabs-list-title {
		font-size: 18px;
		line-height: 21px;
		display: flex;
		align-items: center;
		letter-spacing: -0.02em;
		text-transform: capitalize;

		color: #828282;
		&.active {
			color: #333333;
			text-transform: capitalize;
		}
	}
`;

export const HeadContainer = styled.div``;

export const SpceBetwwen = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #e0e0e0;
	padding-bottom: 8px;
	margin-bottom: 16px;
`;

export const Heading = styled.p`
	margin: 0;
	font-weight: bold;
	font-size: 18px;
	line-height: 28px;
	letter-spacing: 0.02em;
	color: #000000;
`;

export const SubHeading = styled.p`
	margin: 0;
	font-size: 12px;
	line-height: 14px;
	letter-spacing: 0.04em;
	color: #828282;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
`;
