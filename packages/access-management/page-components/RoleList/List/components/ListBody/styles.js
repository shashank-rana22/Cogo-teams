import styled from '@cogoport/front/styled';
import { Button, Grid } from '@cogoport/front/components';

export const Container = styled(Grid.Container)`
	display: block;
	max-width: 100% !important;
	padding: 0 !important;
	margin: 0;

	border-radius: 0 0 0.5rem 0.5rem;

	@media (min-width: 768px) {
		background: #fff;
		padding: 0 1rem !important;
	}
`;

export const Row = styled(Grid.Row)`
	background: #fff;
	box-shadow: 0px 4px 10px rgb(0 0 0 / 25%);
	border-radius: 0.25rem;
	padding: 1rem;
	margin: 0 !important;

	&:not(:first-child) {
		margin-top: 0.5rem !important;
	}

	@media (min-width: 768px) {
		background: unset;
		box-shadow: unset;
		border-radius: unset;
		margin: unset;
		padding: 1rem 0;

		&:not(:first-child) {
			margin-top: unset !important;
			border-top: 1px solid #bdbdbd;
		}
	}
`;

export const Col = styled(Grid.Col)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	&:not(:last-child) {
		margin-bottom: 1rem;
	}

	@media (min-width: 768px) {
		justify-content: center;

		&:not(:last-child) {
			margin-bottom: unset;
		}
	}
`;

export const Label = styled.span`
	color: #333333;
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.02em;
	width: max-content;

	@media (min-width: 768px) {
		display: none;
	}
`;

export const RoleDescriptionColContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 0.25rem;

	& .title {
		color: #333333;
		font-size: 16px;
		font-weight: 500;
		line-height: 18px;
	}

	& .sub-title {
		color: #333333;
		font-size: 10px;
		font-weight: 300;
		font-style: italic;
		line-height: 11px;
	}

	@media (min-width: 768px) {
		width: 100%;
	}
`;

export const RoleTypeColContainer = styled.div`
	.core-ui-tag-root {
		padding: 0.25rem 1rem;
		border-radius: 1.5rem;
		border: none;
		text-transform: uppercase;
		background: ${(props) =>
			props.roleType === 'default' ? '#FEF1DF' : '#DED7FC'};
	}

	.core-ui-tag-text {
		font-size: 10px;
		font-weight: 500;
		line-height: 16px;
		letter-spacing: 0.02em;
		color: ${(props) => (props.roleType === 'default' ? '#DA9A3B' : '#5936F0')};
	}

	@media (min-width: 768px) {
		width: 100%;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
`;

export const PartnerColContainer = styled.div`
	color: #333333;
	font-size: 0.75rem;
	font-weight: 500;
	line-height: 0.75rem;
	text-transform: uppercase;

	@media (min-width: 768px) {
		width: 100%;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
`;
export const HierarchyColContainer = styled.div`
	color: #333333;
	font-size: 0.75rem;
	font-weight: 500;
	line-height: 0.75rem;
	text-transform: uppercase;

	@media (min-width: 768px) {
		width: 100%;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
`;
export const FunctionColContainer = styled.div`
	color: #333333;
	font-size: 0.75rem;
	font-weight: 500;
	line-height: 0.75rem;
	margin-left: 25px;
	text-transform: uppercase;
	justify-content: space-between;
	flex-direction: row;
	gap: 6px;
	.core-ui-tag-root {
		background: #e6fbe9;
		border: 1px solid;
		border-color: #e6fbe9;
		margin-right: 10px;
		margin-left: 10px;
		margin-bottom: 6px;
	}
	@media (min-width: 768px) {
		width: 100%;
		display: inline-block;
	}
`;

export const UsersColContainer = styled.div`
	color: #333333;
	font-size: 12px;
	font-weight: 300;
	line-height: 14px;

	.user-count {
		font-size: 14px;
		font-weight: 500;
		color: #356efd;
		margin-right: 0.25rem;
	}

	@media (min-width: 768px) {
		width: 100%;

		display: flex;
		flex-direction: row;
		justify-content: center;
	}
`;

export const UserCountColContainer = styled.div`
	color: #333333;
	font-weight: 300;
	line-height: 14px;
	font-size: 14px;
	font-weight: bold;

	@media (min-width: 768px) {
		width: 100%;

		display: flex;
		flex-direction: row;
		justify-content: center;
	}
`;

export const ButtonContainer = styled.div`
	width: 100%;
`;

export const EditButton = styled(Button)`
	background: #cddbff;
	color: #034afd;
	border: none;
	border-radius: 4px;
	padding: 0.25rem 1rem;
	font-size: 0.75rem;
	font-weight: 500;
	line-height: 1rem;
	letter-spacing: 0.04em;
	text-align: center;

	display: flex;
	justify-content: center;
	align-items: center;

	& svg {
		width: 0.75rem;
		height: 0.75rem;

		margin-right: 0.25rem;
	}

	&:active {
		background: #cddbff;
		color: #356efd;
	}

	@media (min-width: 768px) {
		width: 100%;

		padding: 0.25rem;

		display: flex;
		flex-direction: row;
		justify-content: center;
	}
`;
