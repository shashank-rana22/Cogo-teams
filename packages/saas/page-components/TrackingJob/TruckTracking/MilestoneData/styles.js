import styled from '@cogoport/front/styled';

export const Milestones = styled.div`
	padding: 20px;
	height: 500px;
	overflow-y: auto;
	width: 100%;
	border-radius: 10px;
	box-shadow: 0px 0px 4px rgb(0 0 0 / 10%);
`;

export const Milestone = styled.div`
	margin-bottom: 16px;
	position: relative;
`;

export const StyledContainer = styled.div`
	padding: 12px;
	border-radius: 10px;
	margin-left: 20px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
	background: #f6f5fe;
`;

export const Dot = styled.div`
	width: 16px;
	height: 16px;
	background-color: #5936f0;
	border-radius: 50%;
	position: absolute;
	left: -7px;
	top: 50%;
	transform: translateY(-50%);
	z-index: 1;
`;
export const HorizontalLine = styled.div`
	position: absolute;
	height: 100%;
	width: 4px;
	left: 0;
	top: 57%;
	display: flex;
	border: 2px dashed #5936f0;
`;
export const Station = styled.div`
	color: #5936f0;
	font-size: 14px;
	line-height: 16px;
	font-weight: 500;
	padding-bottom: 10px;
`;
export const Time = styled.div`
	font-weight: 500;
	font-size: 12px;
	color: #393f70;
`;
export const Rest = styled.div`
	font-size: 12px;
	color: #777db0;
`;
