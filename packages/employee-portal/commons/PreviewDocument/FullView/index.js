import { Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import React from 'react';

import useCheckCompanyPolicies from '../../../hooks/useCheckCompanyPolicies';
import openDocument from '../../../utils/openDocument';

import styles from './styles.module.css';

function FullView({
	url = '',
	containerStyle = {},
	id,
	policy_data,
	getEmployeeDetails,
	employeeId,

}) {
	const { updateEmployeeDetails } = useCheckCompanyPolicies({
		policy_data,
		policy_id: id,
		getEmployeeDetails,
		employeeId,
	});

	return (
		<div className={styles.container} style={{ ...containerStyle }}>
			<Button
				onClick={async () => {
					await updateEmployeeDetails();
					openDocument({ url });
				}}
				style={{ borderRadius: 4 }}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					{id in policy_data ? 'Already Viewed' : 'Preview'}
					<IcMEyeopen style={{ marginLeft: 4 }} fill="#fff" />
				</div>
			</Button>
		</div>
	);
}

export default FullView;
