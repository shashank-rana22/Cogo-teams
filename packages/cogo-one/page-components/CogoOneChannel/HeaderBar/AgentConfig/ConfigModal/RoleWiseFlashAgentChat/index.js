import {
	InputNumber, Button,
	//  Toast
} from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
// import { isEmpty } from '@cogoport/utils';
// import { useState, useEffect } from 'react';

// import { getIsActive, updateCogooneConstants } from '../../../../../../helpers/configurationHelpers';

import styles from './styles.module.css';

const ROLES_LIST = [
	{
		label : 'Supply',
		key   : 'supply',
	},
	{
		label : 'Sales',
		key   : 'sales',
	},
	{
		label : 'Cp support',
		key   : 'cp_support',
	},
	{
		label : 'Support',
		key   : 'support',
	},
	{
		label : 'Shipment specialist',
		key   : 'shipment_specialist',
	},
	{
		label : 'Marketing',
		key   : 'marketing',
	},
];

function RoleWiseFlashAgentChat({
	setActiveCard = () => {},
	// firestore = {},
}) {
	const handleBack = () => {
		setActiveCard('');
	};

	return (
		<div className={styles.padding_inner}>
			<IcMArrowBack className={styles.back_icon} onClick={handleBack} />
			<div className={styles.container}>
				<div className={styles.label}>
					Select Roles and their repective timeout for Flash Agent Chats
				</div>

				<div className={styles.roles_timeout_section}>
					{(ROLES_LIST || []).map((item) => (
						<div className={styles.roles_timeout_section_parts} key={item.key}>
							<div className={styles.roles_label}>{item.label}</div>
							<InputNumber
								size="sm"
								placeholder="Timeout (min)"
								min={0}
						// value={time}
								arrow={false}
							// onChange={(value) => setRoleValue((prev) => ({ ...prev, time: value }))}
								className={styles.styled_select}
							/>
						</div>
					))}
				</div>

				<div className={styles.button_section}>
					<Button
						size="md"
						themeType="primary"
						// onClick={handleSubmit}
						// disabled={!time || isEmpty(roles)}
					>
						Submit
					</Button>
				</div>

			</div>
		</div>
	);
}

export default RoleWiseFlashAgentChat;
