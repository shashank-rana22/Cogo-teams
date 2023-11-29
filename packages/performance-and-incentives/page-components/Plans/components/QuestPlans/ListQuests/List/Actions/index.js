import { IcMBooking, IcMCross, IcMEdit, IcMTick } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const STATUS_COMPONENT_MAPPING = {
	active: {
		update_status : 'active',
		title         : 'Activate',
		icon          : IcMTick,
		showKeys      : ['draft', 'inactive'],
	},
	inactive: {
		update_status : 'inactive',
		title         : 'De-activate',
		icon          : IcMCross,
		showKeys      : ['draft', 'active'],
	},
	draft: {
		update_status : 'draft',
		title         : 'Draft',
		icon          : IcMBooking,
		showKeys      : ['active', 'inactive'],
	},
};

function Actions({
	quest_id = '',
	handleUpdate = () => {},
	status = 'active',
}) {
	const { push } = useRouter();

	const { showKeys = [] } = STATUS_COMPONENT_MAPPING[status] || {};

	return (
		<div className={styles.action_container}>
			<div
				role="presentation"
				className={styles.workflow_cta}
				onClick={() => push(`/performance-and-incentives/plans?tab=quest_plans&mode=create&id=${quest_id}`)}
			>
				<div className={styles.cta_text}>
					<IcMEdit width={20} height={20} style={{ marginRight: '8px' }} />
					Edit
				</div>
			</div>

			{showKeys.map((key) => {
				const { update_status, title, icon: Icon } = STATUS_COMPONENT_MAPPING[key] || {};
				return (
					<div
						key={title}
						role="presentation"
						className={styles.workflow_cta}
						onClick={() => handleUpdate({ id: quest_id, status: update_status })}
					>
						<div className={styles.cta_text}>
							{Icon ? <Icon width={24} height={24} style={{ marginRight: '8px' }} /> : null}
							{title}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Actions;
