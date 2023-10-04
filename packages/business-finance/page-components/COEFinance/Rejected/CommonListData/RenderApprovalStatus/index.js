import { Pill } from '@cogoport/components';

function RenderApprovalStatus({ itemData = {} }) {
	const label = itemData?.l2Approval ? 'Level 2 Approved' : 'Level 1 Approved';
	return (
		itemData?.l1Approval ? (
			<Pill
				size="sm"
				color="#cdf7d4"
			>
				{label}

			</Pill>

		) : (
			<Pill
				size="sm"
				color="#FFFCE6"
			>
				Level 1 Pending

			</Pill>
		)

	);
}

export default RenderApprovalStatus;
