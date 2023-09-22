import styled from '@cogoport/front/styled';

export const Milestones = styled.div`
	margin-top: 16px;
	width: 100%;
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

export const HeaderContainer = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: space-between;
`;
export const Icon = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	gap: 10px;
`;
