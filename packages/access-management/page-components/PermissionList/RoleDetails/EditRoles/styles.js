import { Button } from '@cogoport/front/components';
import styled from '@cogoport/front/styled';

export const Container = styled.section`
	margin-left: 0px;
	padding: 0px 16px;
	margin-right: -8px;
	display: flex;
	flex-direction: column;
	flex-grow: 0;
	flex-shrink: 0;
	align-items: normal;
	height: auto;
	justify-content: flex-start;
	/* .ui-single-date-picker-input-container {
		border-radius: 4px;
	} */
`;

export const Heading = styled.div`
	font-weight: 500;
	font-size: 18px;
	line-height: 21px;
	display: flex;
	align-items: center;
	letter-spacing: -0.02em;
	color: #333333;
	margin-bottom: 16px;
`;

export const ButtonDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;
export const EditRoleButton = styled(Button)`
	width: 63px;
	left: 1125px;
	top: 151px;
	background: #fff;
	color: #000000;
	border: 1px solid #000000;
	box-sizing: border-box;
	border-radius: 7px;
	padding: 6px 10px;
	display: flex;
	align-items: center;
	margin-left: 650px;
	height: 27px;
	& svg {
		margin-right: 0.3rem;
		margin-left: 0.001rem;
	}
`;
export const EditButton = styled(Button)`
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
