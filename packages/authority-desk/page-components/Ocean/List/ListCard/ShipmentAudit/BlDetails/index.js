import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function BlDetails({ item = {} }) {
	console.log(item?.bill_of_ladings);
	return (
		<div className={styles.container}>
			<table>
				<thead>
					<tr>
						<td>Category</td>
						<td> Document Number</td>
						<td>Collection Status</td>
						<td>Type</td>
						<td>Release Date</td>
						<td>Delivery Mode</td>
					</tr>
				</thead>
				<tbody>
					{(item?.bill_of_ladings || []).map((val) => (
						<tr key={val.id}>
							<td>{startCase(item?.freight_service?.bl_category)}</td>
							<td>{val?.bl_number}</td>
							<td>{startCase(val?.status)}</td>
							<td>{startCase(val?.status)}</td>
							<td>{item?.expected_release_date || '--'}</td>
							<td>piuu</td>
						</tr>
					))}
				</tbody>
			</table>

		</div>
	);
}

export default BlDetails;
