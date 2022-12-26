import styled from '@cogoport/front/styled';
import { Button } from '@cogoport/front/components';

export const Container = styled.section`
	display: flex;

	flex-direction: column;

	& > :not(:last-child) {
		margin-bottom: 1rem;
	}

	@media (min-width: 768px) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		& > :not(:last-child) {
			margin-bottom: 0;
			margin-right: 1rem;
		}
	}
`;

export const CreateRoleButton = styled(Button)`
	background: #000000;
	border: none;
	border-radius: 22px;
	padding: 1rem 2.5rem;
	font-size: 0.75rem;
	font-weight: 500;
	line-height: 0;
	letter-spacing: 0.04em;
	text-align: center;
	height: 37px; // 2rem;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	margin-left: 16px;
`;

export const RoleGroups = styled.div`
	display: flex;
	align-items: center;

	.core-ui-Pills-container {
		background: white;
		border-radius: 4px;
		padding: 10px 10px 0px 10px;
	}
`;
