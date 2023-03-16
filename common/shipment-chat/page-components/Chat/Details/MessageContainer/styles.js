import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	&.right {
		align-items: flex-end;
		height: fit-content;
	}
	&.left {
		align-items: flex-start;
		height: fit-content;
	}
`;

export const MainContainer = styled.div`
	background: #f9f9f9;
	width: 100%;
	overflow: auto;
	height: 42vh;
	overflow: auto;

	@media (max-width: 768px) {
		height: 42vh;
	}
`;

export const SendMsg = styled.div`
	min-width: 200px;
	max-width: 300px;
	flex-wrap: wrap;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
	border-radius: 4px;
	padding: 4px;
	margin: 6px 20px;
	&.right {
		background: #f6f5fe;
	}
	&.left {
		background: #ffffff;
	}
`;

export const Msg = styled.span`
	display: flex;
	flex-wrap: wrap;
	font-weight: 400;
	font-size: 12px;
	color: #333333;
	padding: 8px 12px;
	white-space: pre-line;
`;

export const Details = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: 400;
	font-size: 10px;
	color: #828282;
	border-bottom: 0.75px solid #e0e0e0;
	padding: 8px 12px 8px 4px;
`;

export const FlexRow = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	margin: 0;
	background: #ffffff;
	border-radius: 4px;
	height: calc(100vh - 150px);
	overflow: auto;
	max-width: 450px;

	&.right {
		max-width: 100%;
		margin-left: 16px;
		margin-right: 0px;
		padding: 0px 0px 30px 0px;
	}
`;

export const FileName = styled.div`
	display: flex;
	align-items: center;
	padding: 4px;
	color: #5936f0;
	cursor: pointer;
	background: #f9f9f9;
	border-radius: 0px 0px 3px 3px;
`;

export const DialogBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Text = styled.div`
	font-weight: 400;
	font-size: 12px;
	padding: 2px;
	color: #828282;
	cursor: pointer;
	&.hide {
		display: none;
	}
	&:hover {
		color: #356efd;
	}
`;

export const Iconwrap = styled.div`
	cursor: pointer;

	&.left {
		display: none;
	}
`;

export const Time = styled.div`
	margin-top: 8px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 10px;
	font-weight: 400;
	color: grey;
`;

export const ImpSign = styled.div`
	cursor: pointer;
	&.left {
		cursor: not-allowed;
	}
`;

export const FilterBox = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	background: #f2f2f2;
	padding: 6px;
	color: #393f70;
	font-size: 10px;
	font-weight: 600;
	margin-bottom: 4px;
`;
