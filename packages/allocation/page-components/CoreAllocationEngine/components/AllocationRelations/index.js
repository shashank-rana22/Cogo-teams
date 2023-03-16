import useAllocationRelations from '../../hooks/useListAllocationRelations';

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
		columns,
		setSelectAll = () => {},
		onClearSelection = () => {},
	} = useAllocationRelations();

	return (
		<div className={styles.container}>
			<Header
				setShowCreateRelationModal={setShowCreateRelationModal}
				setParams={setParams}
				params={params}
				disabled={loading}
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
				columns={columns}
				checkedRowsId={checkedRowsId}
				setCheckedRowsId={setCheckedRowsId}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				confirmModalState={confirmModalState}
				setConfirmModalState={setConfirmModalState}
				paginationData={paginationData}
				getNextPage={getNextPage}
				searchQuery={searchQuery}
				setSelectAll={setSelectAll}
				onClearSelection={onClearSelection}
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
