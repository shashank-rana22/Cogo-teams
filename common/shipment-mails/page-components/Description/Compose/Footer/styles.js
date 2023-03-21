import styled from '@cogoport/front/styled';

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Wrapper = styled.div`
	margin-top: 10px;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
`;

export const AttachementItem = styled.div`
	margin-right: 10px;
	display: flex;
	align-items: center;
	padding: 4px;
	border-radius: 4px;
	&:hover {
		background: #e0e0e0;
		cursor: pointer;
	}
`;

export const Name = styled.p`
	max-width: 100px;
	margin: 0px;
	display: inline-block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
`;
