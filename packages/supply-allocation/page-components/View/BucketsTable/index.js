import { startCase } from '@cogoport/utils';

import StyledTable from '../../../commons/StyledTable';
import useGetRollingForecastBucketData from '../../../hooks/useGetRollingForecastBucketData';
import getSubBucketColumns from '../SubBucketColumns';

import styles from './styles.module.css';

function BucketTable({
	id = '', bucket_type = '', control = {}, unregister = () => { },
	bucketsArray = [],
	current_allocated_containers,
}) {
	const {
		data,
		loading,
	} = useGetRollingForecastBucketData({ id, bucket_type });

	const bucketOptions = bucketsArray.reduce((acc, bucket) => {
		if (bucket === bucket_type) return acc;
		return [...acc, { value: bucket, label: startCase(bucket) }];
	}, []);

	const { subBucketColumns } = getSubBucketColumns({ control, unregister, bucketOptions, bucket_type, current_allocated_containers });

	return (
		<div className={styles.container}>
			<StyledTable key={bucket_type} loading={loading} columns={subBucketColumns} data={data || []} />
		</div>
	);
}
export default BucketTable;
