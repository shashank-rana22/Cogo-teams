import { Modal } from '@cogoport/components';
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

	console.log('quotaItem', quotaItem);

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
			{/* Todo isupdatable can be called   */}

			{quotaItem && (
				<Modal
					show={quotaItem}
					position="basic"
					size="lg"
					onClose={() => setQuotaItem(null)}
					// closeOnOuterClick={false}
				>
					<QuotaModal
						quotaItem={quotaItem}
						onCloseModal={() => setQuotaItem(null)}
						refetch={refetch}
					/>
				</Modal>
			)}
		</section>
	);
}

export default AllocationQuotas;
