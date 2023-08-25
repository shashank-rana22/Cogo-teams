import { startCase } from '@cogoport/utils';

import StyledTable from '../../../../commons/StyledTable';
import useGetRollingForecastBucketData from '../../../../hooks/useGetRollingForecastBucketData';
import getSubBucketColumns from '../SubBucketColumns';

import styles from './styles.module.css';

function BucketTable({
	id = '',
	bucket_type = '',
	control = {},
	unregister = () => {},

	current_allocated_containers = 0,
	bulkEditMode = false,
}) {
	const { data, loading } = useGetRollingForecastBucketData({
		id,
		bucket_type,
	});

	const { subBucketColumns } = getSubBucketColumns({
		control,
		unregister,
		bucket_type,
		current_allocated_containers,
		rollingFclFreightSearchId: id,
		bulkEditMode,
	});

	return (
		<div className={styles.container}>
			<StyledTable
				key={bucket_type}
				loading={loading}
				columns={subBucketColumns}
				data={data || []}
			/>
		</div>
	);
}
export default BucketTable;
