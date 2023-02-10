import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import useAllocationRelations from '../../../hooks/useAllocationRelations';

import CreateRelationModal from './CreateRelationModal';
import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function Relations() {
	const {
		list,
		showCreateRelationModal,
		setShowCreateRelationModal,
		fetchList,
		params,
		setParams = () => {},
		loading,
		bulkMode = false,
		setBulkMode = () => {},
		checkedRowsId = [],
		setCheckedRowsId = () => {},
		activeTab,
		setActiveTab = () => {},
		setConfirmModalState = () => {},
		confirmModalState = {},
		paginationData = {},
		getNextPage,
		setSearchValue = () => {},
		searchValue = '',
		debounceQuery,
		searchQuery,
	} = useAllocationRelations();

	return (
		<div className={styles.container}>
			<Header
				setShowCreateRelationModal={setShowCreateRelationModal}
				setParams={setParams}
				setActiveTab={setActiveTab}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				debounceQuery={debounceQuery}
			/>

			{(!loading && isEmpty(list)) ? (
				<div className={styles.empty_container}>
					<EmptyState
						height={280}
						width={440}
						emptyText="No records found"
						textSize="24px"
						flexDirection="column"
					/>
				</div>

			) : (
				<List
					list={list}
					params={params}
					setParams={setParams}
					bulkMode={bulkMode}
					setBulkMode={setBulkMode}
					checkedRowsId={checkedRowsId}
					setCheckedRowsId={setCheckedRowsId}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					confirmModalState={confirmModalState}
					setConfirmModalState={setConfirmModalState}
					paginationData={paginationData}
					getNextPage={getNextPage}
					searchQuery={searchQuery}
				/>
			)}

			{showCreateRelationModal && (
				<CreateRelationModal
					showCreateRelationModal={showCreateRelationModal}
					setShowCreateRelationModal={setShowCreateRelationModal}
					fetchList={fetchList}
				/>
			)}
		</div>
	);
}

export default Relations;
