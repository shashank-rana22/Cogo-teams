import { useState } from 'react';

import useListAllocationQuotas from '../../../hooks/useListAllocationQuotas';

import Header from './Header';
import List from './List';
import QuotaModal from './QuotaModal';
import styles from './styles.module.css';

function AllocationQuotas() {
	// Todo should go inside hook
	const [quotaItem, setQuotaItem] = useState(null);

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
				onClickCreateQuota={() => setQuotaItem(true)}
				setParams={setParams}
				loading={listLoading}
				toggleRoleType={toggleRoleType}
			/>

			<List
				data={data}
				loading={listLoading}
				// onChangeParams={onChangeParams}
				fetchList={refetch}
				toggleRoleType={toggleRoleType}
				setQuotaItem={setQuotaItem}
			/>

			{quotaItem ? (
				<QuotaModal
					quotaItem={quotaItem}
					onCloseModal={() => setQuotaItem(null)}
					refetch={refetch}
				/>
			) : null}
		</section>
	);
}

export default AllocationQuotas;
