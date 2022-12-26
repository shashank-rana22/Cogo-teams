import styled from '@cogo/styled';

export const Container = styled.div`
	padding: 10px 22px;
`;

export const ButtonContainer = styled.div`
	background: #fef6df;
	border-radius: 10px;
	padding: 13px 15px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	&.end {
		justify-content: flex-end;
	}
	@media (max-width: _md) {
		bottom: 0;
		width: 100%;
	}
`;

export const Buttons = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

export const Heading = styled.div`
	font-weight: bold;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.02em;
	color: #000000;
`;
