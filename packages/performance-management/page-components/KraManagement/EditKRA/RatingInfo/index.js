import React from 'react';

import StyledTable from '../../../KraAssignment/common/StyledTable';

import getRatingInfoColumn from './getRatingInfoColumn';
import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data to show';
function RatingInfo({ ratingInfo, loading }) {
	const { kra_name, kra_description, kra_ratings, value_type } = ratingInfo || {};

	const columns = getRatingInfoColumn({ });

	return (
		<div>
			<div className={styles.kra_description}>
				<div>
					<strong>KRA Name : </strong>
					{kra_name || 'N/A'}
				</div>

				<div>
					<strong>KRA Description : </strong>
					{kra_description || 'N/A'}
				</div>

				<div>
					<strong>Rating Schema : </strong>
					{value_type === 'flat' ? 'Absolute Value' : 'Percentage (%)'}
				</div>

			</div>

			<div className={styles.table_style}>
				<StyledTable
					columns={columns}
					data={kra_ratings || []}
					emptyText={TABLE_EMPTY_TEXT}
					loading={loading}
				/>
			</div>

		</div>
	);
}

export default RatingInfo;
