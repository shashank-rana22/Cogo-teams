import styled from '@cogoport/front/styled';

export const Container = styled.div`
	align-items: left;

	.core-ui-button-root {
		height: 40px;
		border: none;
		text-align: center;
	}
	.botton {
		margin: 10px;
		padding: 20px;
	}
	.switch-select-label {
		font-weight: bold;
		font-size: 14px;
		line-height: 16px;
		margin-bottom: 16px;
		color: #393f70;
	}

	.switch-select-container {
		margin-top: 24px;
	}

	.form-fieldArray-button-container {
		.core-ui-button-root {
			border: 1px solid #a8acce;
			color: #5c6186;
			.form-field-array-add-btn {
				background: #ffffff;
				color: #5c6186;
			}
		}
	}
`;

export const Text = styled.p`
	font-weight: 500;
	font-size: 14px;
	color: #393f70;
	margin: 0 auto;
	padding-bottom: 12px;
	margin-top: 30px;
`;

export const Header = styled.div`
	font-weight: 500;
	font-size: 18px;
	line-height: 15px;
	text-transform: uppercase;
	color: #393f70;
`;

export const FormDiv = styled.div`
	overflow: auto;
	height: calc(100vh - 33.5vh);
`;

export const Line = styled.div`
	border-bottom: 1px solid #f2f2f2;
	width: 100%;
`;

export const Btn = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	padding-top: 10%;
`;
