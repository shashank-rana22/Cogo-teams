import styled from '@cogoport/front/styled';

export const Container = styled.div`
	position: relative;

	.form-item-label {
		margin-bottom: 8px;
	}
`;

export const ButtonWrap = styled.div`
	margin-top: 32px;
	display: flex;
	justify-content: flex-end;

	.core-ui-button-root {
		text-transform: capitalize;
		width: 150px;
	}
`;

export const Heading = styled.div`
	font-weight: 500;
	font-size: 18px;
	line-height: 15px;
	text-transform: uppercase;
	color: #393f70;
	margin-bottom: 8px;
	margin-top: 6px;
`;

export const Form = styled.div`
	overflow: auto;
	height: calc(100vh - 32.5vh);
`;
