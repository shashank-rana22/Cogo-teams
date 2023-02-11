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
				params={params}
				setActiveTab={setActiveTab}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				debounceQuery={debounceQuery}
			/>

			<List
				list={list}
				loading={loading}
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
