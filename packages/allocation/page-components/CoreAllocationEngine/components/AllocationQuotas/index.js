import { Modal } from '@cogoport/components';

import useListAllocationQuotas from '../../hooks/useListAllocationQuotas';

import Header from './Header';
import List from './List';
import QuotaModal from './QuotaModal';
import styles from './styles.module.css';

function AllocationQuotas() {
	const {
		data,
		columns,
		loading:listLoading,
		params,
		setParams,
		refetch,
		debounceQuery,
		searchValue,
		setSearchValue,
		getNextPage,
		quotaItem,
		setQuotaItem,
	} = useListAllocationQuotas();

	const toggleRoleType = params?.filters?.quota_type;

	return (
		<section className={styles.container}>
			<Header
				onClickCreateQuota={() => setQuotaItem(true)}
				params={params}
				setParams={setParams}
				disabled={listLoading}
				toggleRoleType={toggleRoleType}
				debounceQuery={debounceQuery}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>

			<List
				data={data}
				columns={columns}
				loading={listLoading}
				getNextPage={getNextPage}
				fetchList={refetch}
				toggleRoleType={toggleRoleType}
			/>

			{quotaItem && (
				<Modal
					show={quotaItem}
					placement="top"
					size={quotaItem.type === 'delete' ? 'sm' : 'lg'}
					onClose={() => setQuotaItem(null)}
					closeOnOuterClick={false}
				>
					<QuotaModal
						quotaItem={quotaItem}
						onCloseModal={() => setQuotaItem(null)}
						refetch={refetch}
						toggleRoleType={toggleRoleType}
					/>
				</Modal>
			)}
		</section>
	);
}

export default AllocationQuotas;
