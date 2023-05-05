import { format, startCase, upperCase } from '@cogoport/utils';
import React from 'react';

import ClickableDiv from '../../../../../../commons/ClickableDiv';

import styles from './styles.module.css';

function BlDetails({ item = {} }) {
	const docsList = item?.bill_of_ladings || item?.delivery_orders;

	const docUrl = (val) => (
		<ClickableDiv className={styles.url} onClick={() => window.open(val?.document_url, '_blank')}>
			View
		</ClickableDiv>
	);

	return (
		<div className={styles.container}>
			<table>
				<thead>
					<tr className={styles.row}>
						<th>
							BL/DO
							&nbsp;
							(
							{docsList?.length || ' '}
							)
							&nbsp;
						</th>
						<th> Document Number</th>
						<th>Status</th>
						<th>BL Type</th>
						<th>Release Date</th>
						<th>Delivery Mode</th>
						<th>Document Url</th>
					</tr>
				</thead>

				<tbody>
					{(docsList || []).map((val) => (
						<tr key={val.id}>
							<td>{startCase(val?.bl_document_type || val?.do_document_type)}</td>
							<td>{val?.bl_number}</td>
							<td>{startCase(val?.status) || '--'}</td>
							<td>{upperCase(item?.freight_service?.bl_type)}</td>
							<td>{format(item?.expected_release_date, 'dd MMM yyyy', null, true)}</td>
							<td>{startCase(val?.delivery_mode)}</td>
							<td>{docUrl(val)}</td>
						</tr>
					))}

				</tbody>
			</table>
		</div>
	);
}

export default BlDetails;
