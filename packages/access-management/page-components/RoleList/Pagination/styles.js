import styled from '@cogoport/front/styled';

export const Container = styled.section`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;

	& > :not(:last-child) {
		margin-right: 0.5rem;
	}
`;

export const Content = styled.span`
	color: #828282;
	font-size: 14px;
	font-weight: 700;
	letter-spacing: 0.02em;
	line-height: 20px;
`;

export const Arrows = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;

	& > :not(:last-child) {
		margin-right: 0.75rem;
	}
`;

export const CaretLeftContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

	& svg {
		width: 0.5rem;
		height: 1rem;
		transform: rotate(180deg);
		fill: ${(props) => (props.disabled ? '#BDBDBD' : '#000000')};
	}
`;

export const CaretRightContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

	& svg {
		width: 0.5rem;
		height: 1rem;
		fill: ${(props) => (props.disabled ? '#BDBDBD' : '#000000')};
	}
`;
