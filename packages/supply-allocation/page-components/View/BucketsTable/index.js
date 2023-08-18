import StyledTable from '../../../commons/StyledTable';
import useGetRollingForecastBucketData from '../../../hooks/useGetRollingForecastBucketData';
import getSubBucketColumns from '../SubBucketColumns';

import styles from './styles.module.css';

function BucketTable({ id = '', bucket_type = '', control = {}, unregister = () => {} }) {
	const {
		data,
		loading,
	} = useGetRollingForecastBucketData({ id, bucket_type });

	const { subBucketColumns } = getSubBucketColumns({ control, unregister });

	return (
		<div className={styles.container}>
			<StyledTable loading={loading} columns={subBucketColumns} data={data || []} />
		</div>
	);
}
export default BucketTable;
