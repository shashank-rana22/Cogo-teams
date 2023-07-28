import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import EmptyState from '../../../../../commons/EmptyState';

import styles from './styles.module.css';

export function BlContent({ remarks = {} }) {
	return (
		<div className={styles.bl_remark_detail}>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
						<th>Comment</th>
						<th>Date and time</th>
						<th>Bl/DO Number</th>
					</tr>
				</thead>
				<tbody>
					{remarks.length ? (
						<td colSpan={5}>
							<EmptyState customClass={styles.customized_empty_state} />
						</td>
					) : remarks.map((rm) => (
						<tr key={rm?.name}>
							<td>{rm?.name}</td>
							<td>{startCase(rm?.status)}</td>
							<td>{rm?.comment}</td>
							<td>
								{' '}
								{formatDate({
									date       : rm?.created_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})}

							</td>
							<td>{rm?.bl_number}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
