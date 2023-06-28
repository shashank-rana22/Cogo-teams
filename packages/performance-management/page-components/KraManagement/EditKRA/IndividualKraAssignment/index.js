import { Button } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

import StyledTable from '../../../../common/StyledTable';
import useCreateIndividualKra from '../hooks/useCreateIndividualKra';
import RatingInfo from '../RatingInfo';

import getIndividualColumn from './getIndividualColumn';
import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data to show';

function IndividualKraAssignment({ data, loading }) {
	const { loading:submitLoading, createIndividualKra } = useCreateIndividualKra();

	const [valuesIndividualKRA, setValuesIndividualKRA] = useState();

	const [ratingInfo, setRatingInfo] = useState();

	useEffect(() => {
		setValuesIndividualKRA(data);
		setRatingInfo();
	}, [data]);

	const onRowClick = (item) => {
		setRatingInfo(item);
	};

	const handleSubmitTarget = () => {
		createIndividualKra(valuesIndividualKRA);
	};

	const columns = getIndividualColumn({
		loading,
		valuesIndividualKRA,
		setValuesIndividualKRA,
	});

	return (
		<div className={styles.container}>

			<div className={styles.table_container}>
				<StyledTable
					columns={columns}
					data={data}
					emptyText={TABLE_EMPTY_TEXT}
					loading={loading}
					onRowClick={(item) => onRowClick(item)}

				/>
			</div>

			<div className={styles.container1}>
				<RatingInfo ratingInfo={ratingInfo} loading={loading} />
				<Button loading={submitLoading} onClick={handleSubmitTarget} className={styles.button}>
					Submit Targets
				</Button>
			</div>

		</div>
	);
}

export default IndividualKraAssignment;
