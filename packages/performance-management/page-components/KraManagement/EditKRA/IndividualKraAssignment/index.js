import { Button } from '@cogoport/components';
import React from 'react';

import StyledTable from '../../../../common/StyledTable';
import useCreateIndividualKra from '../hooks/useCreateIndividualKra';
import RatingInfo from '../RatingInfo';

import getIndividualColumn from './getIndividualColumn';
import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data to show';

function IndividualKraAssignment({ data, loading }) {
	const {
		loading: submitLoading,
		createIndividualKra,
		individualKRAValues,
		ratingInfo,
		setRatingInfo,
		handleTargetChange,
	} = useCreateIndividualKra({ data });

	const columns = getIndividualColumn({
		loading,
		individualKRAValues,
		handleTargetChange,
	});

	return (
		<div className={styles.container}>
			<div className={styles.table_container}>
				<StyledTable
					columns={columns}
					data={data}
					emptyText={TABLE_EMPTY_TEXT}
					loading={loading}
					onRowClick={(item) => setRatingInfo(item)}
				/>
			</div>

			<div className={styles.container1}>
				<RatingInfo ratingInfo={ratingInfo} loading={loading} />

				<Button
					loading={submitLoading}
					onClick={() => createIndividualKra(individualKRAValues)}
					className={styles.button}
				>
					Submit Targets
				</Button>
			</div>

		</div>
	);
}

export default IndividualKraAssignment;
