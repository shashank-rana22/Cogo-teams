import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import StyledTable from '../../../common/StyledTable';
import useListKRA from '../EditKRA/hooks/useListKRA';

import getColumns from './getColumns';
import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data to show';

function ManageKRA() {
	const router = useRouter();
	const { data, loading } = useListKRA();

	const handleEditKRA = (kra_id) => {
		router.push(`/performance-management/kra-management/manage-kra/update-kra/${kra_id}`);
	};

	const handleCreateKRA = () => {
		router.push('/performance-management/kra-management/manage-kra/create-kra');
	};

	const columns = getColumns({ handleEditKRA });

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				Below are the KRAs. Click on the Edit Button of a particular KRA to Edit
				<Button onClick={handleCreateKRA}>Add KRA</Button>
			</div>
			<StyledTable
				columns={columns}
				data={data?.list || []}
				emptyText={TABLE_EMPTY_TEXT}
				loading={loading}
			/>
		</div>
	);
}

export default ManageKRA;
