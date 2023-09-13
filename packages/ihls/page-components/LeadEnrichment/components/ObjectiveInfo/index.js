import { Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import EmptyState from '../../../../commons/EmptyState';
import SearchInput from '../../../../commons/SearchInput';
import useGetObjectiveInfo from '../../hooks/useGetObjectiveInfo';

import LoadingState from './components/LoadingState';
import ObjectiveTable from './components/ObjectiveTable';
import styles from './styles.module.css';

function ObjectiveInfo(props) {
	const { allocationLeadId } = props;
	const {
		loading,
		response,
		debounceQuery,
		paginationData,
		searchValue,
		setSearchValue,
		setParams,
	} = useGetObjectiveInfo({ allocationLeadId });

	const onPageChange = (pageNumber) => {
		setParams((p) => ({ ...p, page: pageNumber }));
	};

	if (!loading && response.length === GLOBAL_CONSTANTS.zeroth_index) {
		return <EmptyState height={300} width={300} emptyText="" />;
	}

	return (
		<>
			<div className={styles.search}>
				<div className={styles.searchbar}>
					<SearchInput
						placeholder="Search Objective"
						size="sm"
						setGlobalSearch={setSearchValue}
						debounceQuery={debounceQuery}
						value={searchValue}
					/>
				</div>
				<Pagination
					type="table"
					currentPage={paginationData.page}
					totalItems={paginationData.count}
					pageSize={10}
					onPageChange={onPageChange}
				/>
			</div>
			<div className={styles.tableContainer}>
				{loading ? <LoadingState />
					: <ObjectiveTable objectiveList={response} />}
			</div>
		</>
	);
}

export default ObjectiveInfo;
