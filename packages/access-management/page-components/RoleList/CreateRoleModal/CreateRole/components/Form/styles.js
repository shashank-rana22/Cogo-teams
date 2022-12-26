import { Button, Grid } from '@cogoport/front/components';
import styled from '@cogoport/front/styled';

export const FormContainer = styled.form`
	margin-top: 1rem;
`;

export const Row = styled(Grid.Row)`
	& > :not(:last-child) {
		margin-bottom: 1rem;
	}
`;

export const Col = styled(Grid.Col)``;

export const FormGroup = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 1rem;
`;

export const FormLabel = styled.div`
	min-width: 80px;
	color: #333333;
	font-size: 0.75rem;
	font-weight: 400;
	letter-spacing: 0.02em;

	@media (min-width: 768px) {
		min-width: unset;
	}
`;

export const InputGroup = styled.div`
	flex: 1;

	display: flex;
	flex-direction: column;
`;

export const ErrorMessage = styled.div`
	color: #cb6464;
	font-size: 0.75rem;
	font-weight: 400;
	letter-spacing: 0.02em;
`;

export const ButtonContainerCol = styled(Grid.Col)`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	gap: 0.5rem;
`;

export const BackButton = styled(Button)`
	background: transparent;
	color: #000000;
	border: none;
	padding: 0 1rem;
	font-size: 13px;
	font-weight: 500;
	line-height: 16px;
	letter-spacing: 0.04em;
	text-align: center;
	height: 2.5rem;
	line-height: 16px;
	font-family: Roboto;
	font-style: normal;

	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		box-shadow: none;
	}

	&:active {
		background: none;
	}
`;

export const AddButton = styled(Button)`
	background: #000000;
	border: none;
	padding: 0 2.5rem;
	border-radius: 7px;
	font-size: 0.75rem;
	font-weight: 500;
	line-height: 1rem;
	letter-spacing: 0.02em;
	text-align: center;
	height: 2.5rem;
`;
