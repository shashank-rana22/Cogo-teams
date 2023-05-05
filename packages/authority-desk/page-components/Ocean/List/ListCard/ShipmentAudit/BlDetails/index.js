import { startCase, upperCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function BlDetails({ item = {} }) {
	const docsList = item?.bill_of_ladings || item?.delivery_orders;

	return (
		<div className={styles.container}>
			<table>
				<thead>
					<tr className={styles.row}>
						<th>Category</th>
						<th> Document Number</th>
						<th>Collection Status</th>
						<th>Type</th>
						<th>Release Date</th>
						<th>Delivery Mode</th>
					</tr>
				</thead>

				<tbody>
					{(docsList || []).map((val) => (
						<tr key={val.id}>
							<td>{upperCase(item?.freight_service?.bl_category)}</td>
							<td>{val?.bl_number}</td>
							<td>{startCase(val?.status)}</td>
							<td>{startCase(val?.status)}</td>
							<td>{item?.expected_release_date || '--'}</td>
							<td>{startCase(val?.delivery_mode)}</td>
						</tr>
					))}

				</tbody>
			</table>
		</div>
	);
}

export default BlDetails;
