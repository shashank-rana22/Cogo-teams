import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetEmployeeReimbursementGroup from '../../hooks/useGetEmployeeReimbursementGroup';

import getGroupColumns from './getGroupColumns';
import StyledTable from './StyledTable';
import styles from './styles.module.css';

function GroupContent({ addon_details, device_details, id }) {
	const groupColumns = getGroupColumns();
	const { data:groupData, loading } = useGetEmployeeReimbursementGroup(id);
	const { mappings } = groupData || {};

	return (
		<div className={styles.accordian_container}>

			<div className={styles.body_container}>
				<div className={styles.table_container}>
					<StyledTable data={mappings} columns={groupColumns} loading={loading} />
				</div>
				{(isEmpty(addon_details) && isEmpty(device_details)) ? null : (
					<div className={styles.display_content}>
						{!(isEmpty(device_details)) ? (
							<div style={{ marginBottom: '40px' }}>
								<strong>Devices</strong>
								{device_details.map((device) => (
									<div
										className={styles.devices_content}
										key={device.device_type}
									>
										<div className={styles.specifications_container}>
											<div><b>{device?.device_type}</b></div>

											<div>
												Percentage Reimbursed :
												{' '}
												<b>{device?.reimbursement_percentage}</b>
											</div>

											<div>
												Max Reimbursement Amount:
												{' '}
												<b>{device?.max_reimbursement_amount}</b>
											</div>
										</div>
									</div>
								))}
							</div>
						) : null}
						{!(isEmpty(device_details)) ? (
							<>
								<strong>Computer Accessories</strong>
								{addon_details.map((device) => (
									<div
										className={styles.devices_content}
										key={device?.addon_type}
									>
										<div className={styles.specifications_container}>
											<div><b>{device?.addon_type}</b></div>

											<div>
												Percentage Reimbursed :
												{' '}
												<b>{device?.reimbursement_percentage}</b>
											</div>

											<div>
												Max Reimbursement Amount:
												{' '}
												<b>{device?.max_reimbursement_amount}</b>
											</div>
										</div>
									</div>
								))}
							</>
						) : null}
					</div>
				)}
			</div>
		</div>
	);
}

export default GroupContent;
