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
		params,
		setParams,
		refetch,
		debounceQuery,
		searchValue,
		setSearchValue,
		getNextPage,
	} = useListAllocationQuotas();

	const toggleRoleType = params?.filters?.quota_type;

	return (
		<section className={styles.container}>
			<Header
				onClickCreateQuota={() => setQuotaItem(true)}
				params={params}
				setParams={setParams}
				loading={listLoading}
				toggleRoleType={toggleRoleType}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>

			<List
				data={data}
				loading={listLoading}
				getNextPage={getNextPage}
				fetchList={refetch}
				toggleRoleType={toggleRoleType}
				setQuotaItem={setQuotaItem}
			/>
			{/* Todo isUpdatable can be called */}

			{quotaItem && (
				<Modal
					show={quotaItem}
					placement="center"
					size="md"
					onClose={() => setQuotaItem(null)}
					closeOnOuterClick={false}
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
