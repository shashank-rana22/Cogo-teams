import { isEmpty } from '@cogoport/utils';
import React, { useMemo } from 'react';

import DotLoader from '../../../commons/DotLoader';
import { bucketControls } from '../../../configs/bucket-controls';
import useGetRollingForecastBucketsData from '../../../hooks/useGetRollingForeCastBucketsData';

import BucketsListBody from './BucketsListBody';
import BucketsListHeader from './BucketsListHeader';
import styles from './styles.module.css';

function List({ search_id = '' }) {
	const { data: bucketData = [], refetchBucketsData = () => {}, loading } = useGetRollingForecastBucketsData({
		supply_fcl_freight_search_id: search_id,
	});

	const generateBucketTableData = useMemo(() => (bucketData || []).reduce((acc, curr) => {
		const {
			allocation_percentage,
			bucket_type,
			current_container_allocation = {},
			past_container_fulfillment = {},
			suppliers_count = 0,
		} = curr;

		const {
			current_allocated_containers = 0,
			current_forecast = 0,
		} = current_container_allocation;

		const { past_fulfilled_containers = 0, past_allocated_containers = 0 } = past_container_fulfillment;

		return [
			...acc,
			{
				bucket_type,
				allocation_percentage,
				suppliers_count,
				current_forecast,
				current_allocated_containers,
				past_fulfilled_containers,
				past_allocated_containers,
			},
		];
	}, []), [bucketData]);

	if (loading) {
		<div className={styles.loading_container}>
			<DotLoader />
		</div>;
	}

	if (isEmpty(generateBucketTableData)) {
		return (
			<div className={styles.empty_state}>
				No Suppliers are allocated for this pair.
			</div>
		);
	}

	return (
		<>
			<BucketsListHeader bucketControls={bucketControls} />

			{generateBucketTableData?.map((item) => (
				<BucketsListBody
					key={item.bucket_type}
					item={item}
					searchId={search_id}
					refetchBucketsData={refetchBucketsData}
				/>
			))}

		</>
	);
}

export default List;
