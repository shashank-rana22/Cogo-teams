import styled from '@cogoport/front/styled';

export const SendToContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
	background: #f6f5fe;
	border-bottom: 1px solid black;

	.send-text {
		font-weight: 600;
		font-size: 10px;
		line-height: 12px;
		color: #393f70;
	}

	.stakeholders {
		font-weight: 600;
		font-size: 10px;
		line-height: 12px;
		padding-left: 5px;
	}

	.core-ui-input-root {
		background: #f6f5fe;
		width: 400px;
		border: none;
		height: 22px;
	}
`;

export const Container = styled.div`
	background: #ffffff;
	cursor: pointer;
	border-radius: 5px;
	background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
	box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
	width: 30%;
	position: absolute;
	left: 40%;
	bottom: 18%;

	& > div:hover {
		box-shadow: 0px 0px 5px rgb(0 0 0 / 15%);
	}
`;

export const Options = styled.div`
	border-bottom: 1px solid #cbcff5;
	.text-option {
		padding: 10px 0px;
		text-align: center;
	}
`;

export const OptionsCon = styled.div``;
