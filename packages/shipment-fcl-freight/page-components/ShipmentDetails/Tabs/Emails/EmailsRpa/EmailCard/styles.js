import styled from '@cogoport/front/styled';

export const Container = styled.div`
	margin: 0px 7px 16px 7px;
	display: flex;
	padding-bottom: 22px;
	border-bottom: 1px solid #cbcfeb;
	cursor: pointer;
	padding: 4px;
	border-radius: 4px;
	&:hover {
		background: #e0e0e0;
	}
`;

export const Circle = styled.div`
	height: 18px;
	width: 18px;
	border-radius: 50%;
	border: 1px solid #393f70;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Sender = styled.p`
	margin: 0px;
	font-weight: 500;
	font-size: 14px;
	line-height: 18px;

	color: #393f70;
	margin-bottom: 2px;
	max-width: 136px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

export const Content = styled.div`
	margin-left: 8px;
	flex: 1;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 4px;
`;

export const Subject = styled.p`
	margin: 0px;
	font-weight: 500;
	font-size: 12px;
	line-height: 16px;
	max-width: 154px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	/* identical to box height, or 83% */

	color: #5936f0;
`;

export const InitialBody = styled.div`
	font-weight: 400;
	font-size: 12px;
	line-height: 16px;
	color: #333333;
	max-width: 228px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;
