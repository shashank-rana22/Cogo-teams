import { useState } from 'react';

import useListAllocationQuotas from '../../../hooks/useListAllocationQuotas';

import Header from './Header';
import List from './List';
import QuotaModal from './QuotaModal';
import styles from './styles.module.css';

function AllocationQuotas() {
	// Todo should go inside hook
	const [showCreateQuotas, setShowCreateQuotas] = useState(false);

	const onCloseModal = () => {
		setShowCreateQuotas(false);
	};

	const {
		data,
		loading:listLoading,
		// getNextPage,
		params,
		setParams,
		refetch,
	} = useListAllocationQuotas();

	const toggleRoleType = params?.filters?.quota_type;

	return (
		<section className={styles.container}>
			<Header
				onClickCreateQuota={() => setShowCreateQuotas(true)}
				setParams={setParams}
				loading={listLoading}
				toggleRoleType={toggleRoleType}
				setShowCreateQuotas={setShowCreateQuotas}
			/>

			<List
				data={data}
				loading={listLoading}
				// onChangeParams={onChangeParams}
				fetchList={refetch}
				toggleRoleType={toggleRoleType}
			/>

			{showCreateQuotas ? (
				<QuotaModal
					showCreateQuotas={showCreateQuotas}
					onCloseModal={onCloseModal}
					refetch={refetch}
				/>
			) : null}
		</section>
	);
}

export default AllocationQuotas;
