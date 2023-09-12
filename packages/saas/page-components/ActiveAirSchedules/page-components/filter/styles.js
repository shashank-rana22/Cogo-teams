import styled from '@cogoport/front/styled';
import Select from 'react-select';

const Card = styled.div`
	h3 {
		font-size: 12px;
		color: ${({ theme }) => theme.palette.text.dark};
		margin: 0;
		padding: 24px;
	}

	.content {
		max-height: 400px;
		padding: 0 24px;
		margin-top: 16px;
		margin-bottom: 16px;
		overflow-y: auto;
	}

	.footer {
		display: flex;
		justify-content: end;
		padding: 24px;
	}

	.button1 {
		margin-right: 16px;
	}
`;

const Section = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	color: #7d7d7d;
	width: calc(35% - 25px);
`;

const Section1 = styled.div`
	margin: 26px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #7d7d7d;
`;

const Label = styled.label`
	font-size: 12px;
	line-height: 14px;
	display: block;
	margin: 0 0 10px;

	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;

const Container = styled.div`
	margin: 0 -16px 0 -16px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;

	@media (max-width: 540px) {
		flex-direction: column;
	}
`;

const SelectStyled = styled(Select)`
	width: 100%;
	max-width: 400px;
`;

export { Card, Label, Section, Container, SelectStyled, Section1 };
