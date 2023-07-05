import { startCase } from '@cogoport/utils';
import React from 'react';

import StyledTable from '../../../../common/StyledTable';

import ratingInfoColumn from './getRatingInfoColumn';
import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data to show';

function RatingInfo({ ratingInfo, loading }) {
	const { kra_name, kra_description, kra_ratings, value_type } = ratingInfo || {};

	const KRA_MAPPING = {
		kra_name,
		kra_description,
		rating_schema: value_type === 'flat' ? 'Absolute Value' : 'Percentage (%)',
	};

	return (
		<div>
			<div className={styles.kra_description}>
				{Object.keys(KRA_MAPPING).map((element) => (
					<div key={element}>
						<strong>
							{startCase(element)}
							:
							{' '}
						</strong>

						{KRA_MAPPING[element] || 'N/A'}
					</div>
				))}
			</div>

			<div className={styles.table_style}>
				<StyledTable
					columns={ratingInfoColumn}
					data={kra_ratings || []}
					emptyText={TABLE_EMPTY_TEXT}
					loading={loading}
				/>
			</div>

		</div>
	);
}

export default RatingInfo;
