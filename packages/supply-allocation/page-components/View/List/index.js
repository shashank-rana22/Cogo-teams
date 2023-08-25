import React, { useMemo } from 'react';

import { bucketControls } from '../../../configs/bucket-controls';
import useGetRollingForecastBucketsData from '../../../hooks/useGetRollingForeCastBucketsData';

import BucketsListBody from './BucketsListBody';
import BucketsListHeader from './BucketsListHeader';

function List({ search_id = '' }) {
	const { data: bucketData = [] } = useGetRollingForecastBucketsData({
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
			current_promised_containers = 0,
			current_allocated_containers = 0,
		} = current_container_allocation;

		const { past_fulfilled_containers = 0, past_allocated_containers = 0 } = past_container_fulfillment;

		return [
			...acc,
			{
				bucket_type,
				allocation_percentage,
				suppliers_count,
				current_promised_containers,
				current_allocated_containers,
				past_fulfilled_containers,
				past_allocated_containers,
			},
		];
	}, []), [bucketData]);

	return (
		<>
			<BucketsListHeader bucketControls={bucketControls} />

			{generateBucketTableData?.map((item) => (
				<BucketsListBody key={item.bucket_type} item={item} searchId={search_id} />
			))}

		</>
	);
}

export default List;
