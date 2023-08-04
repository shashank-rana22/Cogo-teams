import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';

import EmptyState from '../../../../../commons/EmptyState';

import styles from './styles.module.css';

export function BlContent({ remarks = [] }) {
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
					{isEmpty(remarks) ? (
						<tr>
							<td colSpan={5}>
								<EmptyState customClass={styles.customized_empty_state} />
							</td>
						</tr>
					) : remarks.map((rm) => {
						const { name, status, comment, created_at, bl_number } = rm || {};
						return (
							<tr key={name}>
								<td>{name || 'NA'}</td>
								<td>{startCase(status) || 'NA'}</td>
								<td>{comment || 'NA'}</td>
								<td>
									{' '}
									{formatDate({
										date       : created_at,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										formatType : 'date',
									}) || 'NA'}
								</td>
								<td>{bl_number || 'NA'}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
