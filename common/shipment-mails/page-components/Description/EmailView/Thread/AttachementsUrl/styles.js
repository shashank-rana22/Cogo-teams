import styled from '@cogoport/front/styled';

export const Container = styled.div`
	margin-bottom: 16px;
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	&.doc {
		padding: 6px 4px;
		border-radius: 4px 0px 0px 4px;
		&:hover {
			background: #e0e0e0;
		}
	}
	&.icon {
		padding: 6px 4px;
		border-radius: 0px 4px 4px 0px;
		&:hover {
			background: #e0e0e0;
		}
	}
`;

export const Item = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid #cbcfeb;
	border-radius: 4px;
	&:hover {
		cursor: pointer;
	}
`;

export const ItemName = styled.span`
	max-width: 130px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	margin-right: 4px;
`;

export const Action = styled.p`
	padding: 6px 4px;
	margin: 0px;
	border-radius: 4px;
	&:hover {
		cursor: pointer;
		background: #e0e0e0;
	}
`;
