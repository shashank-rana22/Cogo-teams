import styled from '@cogoport/front/styled';

export const Container = styled.div`
	border: 1px dashed #bdbdbd;
	border-radius: 4px;
	padding: 10px 20px;
	display: flex;
	width: 30%;
	justify-content: space-between;
	margin-right: 20px;
	margin-bottom: 12px;
	cursor: pointer;
`;

export const ServiceName = styled.p`
	margin: 0;
	font-weight: 500;
	font-size: 12px;
	line-height: 16px;
	color: #bdbdbd;
`;

export const AvgMargin = styled.p`
	margin: 0;
	font-weight: 400;
	font-size: 10px;
	line-height: 16px;
	color: #393f70;
`;

export const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
