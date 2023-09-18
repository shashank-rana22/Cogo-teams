import { Table } from '@cogoport/front/components';
import styled from '@cogoport/front/styled';

export const Container = styled.div``;

export const TitleContainer = styled.div`
	text-decoration: underline;
	font-size: 24px;
	font-weight: 500;
`;
export const SearchContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 0px;
	background: white;
	border-bottom: solid 1px gainsboro;
`;

export const ButtonContainer = styled.div`
	margin-right: 24px;
`;
export const StyledContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 18px;
`;
export const StyledModalFlex = styled.div`
	display: flex;
	flex-direction: row;
`;
export const StyledTable = styled(Table)`
	.ui-table {
		.ui-table-body-cell:first-of-type {
			padding-left: 24px;
		}

		.ui-table-head-cell {
			.shippingline {
				justify-content: center;
			}
		}
		.ui-table-body-row {
			height: 56px;
		}
		.ui-table-body-cell {
			background: #ffffff;
			padding: 0;
			.image {
				height: 25px;
				width: 50px;
				margin: 5px 0px;
			}
			.blpl {
				height: 20px;
				width: 135px;
				margin: 5px 0px;
			}
			.avana {
				height: 25px;
				width: 75px;
				margin: 5px 0px;
			}
			.title {
				font-weight: bold;
			}
			.shippinglinedata {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 5px;
			}
		}
	}
`;
export const First = styled.div`
	width: 70%;
`;
export const Second = styled.div`
	width: 60%;
	height: 500px;
	overflow-y: auto;
	margin-top: 115px;
`;

export const SortFilter = styled.div`
	margin: 10px;
	padding: 5px;
	position: absolute;
	left: 0%;
	cursor: pointer;

	.sort-icon {
		width: 20px;
		height: 14px;
	}

	.sort-icon.active {
		transform: rotate(180deg);
		transition: transform 400ms;
	}

	.sort-icon.inactive {
		transform: rotate(0deg);
		transition: transform 400ms;
	}
`;
