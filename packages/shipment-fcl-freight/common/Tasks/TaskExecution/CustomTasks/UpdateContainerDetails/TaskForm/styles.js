import styled from '@cogoport/front/styled';

export const ControlContainer = styled.div`
	display: flex;
	align-items: stretch;
	flex-wrap: wrap;

	.core-ui-input-root {
		width: 500px;
	}
	.core-ui-button-root {
		margin-left: 10px;
		text-transform: capitalize;
		width: 100px;
	}
`;

export const ButtonWrap = styled.div`
	margin: 20px 0px;
	display: flex;
	justify-content: flex-end;

	.core-ui-button-root {
		margin-left: 10px;
		text-transform: capitalize;
		width: 100px;
	}
`;

export const CustomFormat = styled.div`
	display: flex;
	flex-direction: column;
	align-self: center;
	margin-left: 6px;
	font-size: 12px;
`;

export const Info = styled.span`
	font-size: 10px;
	opacity: 0.58;

	&.other-dates {
		flex-basis: 100%;
		margin-top: 6px;
		opacity: 1;
	}
`;
