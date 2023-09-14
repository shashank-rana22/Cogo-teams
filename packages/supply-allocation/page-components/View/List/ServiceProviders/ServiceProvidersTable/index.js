import StyledTable from '../../../../../commons/StyledTable';
import getSubBucketColumns from '../SubBucketColumns';

import styles from './styles.module.css';

function BucketTable({
	id = '',
	bucket_type = '',
	control = {},
	unregister = () => {},
	current_allocated_containers = 0,
	bulkEditMode = false,
	serviceProvidersData = [],
	serviceProvidersApiLoading = false,
	refetchBucketsData = () => { },
	refetchServiceProvidersData = () => {},
}) {
	const { subBucketColumns } = getSubBucketColumns({
		control,
		unregister,
		bucket_type,
		current_allocated_containers,
		rollingFclFreightSearchId: id,
		bulkEditMode,
		refetchBucketsData,
		refetchServiceProvidersData,
	});

	return (
		<div className={styles.container}>
			<StyledTable
				key={bucket_type}
				loading={serviceProvidersApiLoading}
				columns={subBucketColumns}
				data={serviceProvidersData || []}
			/>
		</div>
	);
}
export default BucketTable;
