import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const InputItem = styled.div`
	margin-left: ${(props) => props.marginLeft || 0};

	& input {
		text-align: center;
	}
`;
