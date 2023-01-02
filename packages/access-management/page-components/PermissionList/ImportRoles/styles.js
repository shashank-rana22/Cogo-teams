import styled from '@cogoport/front/styled';

export const Container = styled.div``;

export const Heading = styled.p`
	margin: 0;
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: 0.02em;
	color: #000000;
`;

export const Li = styled.li`
	background: #ffffff;
	border: 1px solid #e0e0e0;
	box-sizing: border-box;
	border-radius: 4px;
	padding: 12px 17px;
	color: #333333;
	font-size: 14px;
	line-height: 20px;
	margin-bottom: 4px;
	display: flex;
	align-items: center;
	cursor: move;
`;

export const Ul = styled.ul`
	list-style: none;
	padding: 0;
`;

export const SubHeading = styled.p`
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.02em;
	color: #828282;
	margin: 0px;
`;

export const ApiBox = styled.div`
	background: #ffffff;
	border: 1px solid #e0e0e0;
	box-sizing: border-box;
	border-radius: 4px;
	padding: 6px 13px 6px 8px;
	margin-bottom: 8px;
`;

export const ScopeDetail = styled.p`
	margin: 0px;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.02em;
	color: #828282;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	&.single {
		margin-right: 16px;
	}
	&.bordered {
		background: #ffffff;
		padding: 8px 0px;
		border-bottom: 1px solid #e0e0e0;
		&:last-child {
			border-bottom: none;
		}
	}

	&.full {
		width: 100%;
	}

	&.disclaimer {
		margin-bottom: 10px;
	}
`;

export const ApiRole = styled.p`
	margin: 0px;
	font-weight: bold;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.02em;
	color: #000000;
	margin-right: 24px;
`;

export const SelectBox = styled.div`
	margin-right: 16px;
	&.full {
		width: 100%;
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
	margin-bottom: 8px;
	color: #000000;
`;

export const DisclaimerText = styled.p`
	margin: 0px;
	font-size: 12px;
	line-height: 14px;
	display: flex;
	align-items: center;
	letter-spacing: -0.02em;

	color: #333333;
`;

export const DisclaimerLabel = styled.div`
	background: black;
	border-radius: 6px;
	padding: 4px 6px;
	color: #fff;
	font-size: 10px;
	margin-right: 10px;
	opacity: 0.7;
`;
