import React from 'react';

import SearchInput from '../../../../commons/SearchInput';
import useGetObjectiveInfo from '../../hooks/useGetObjectiveInfo';

import LoadingState from './components/LoadingState';
import ObjectiveTable from './components/ObjectiveTable';
import styles from './styles.module.css';

function ObjectiveInfo(props) {
	const { objectiveLeadId } = props;
	const {
		loading,
		response,
		debounceQuery,
		searchValue,
		setSearchValue,
	} = useGetObjectiveInfo({ objectiveLeadId });

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
			</div>
			<div className={styles.tableContainer}>
				{loading ? <LoadingState />
					: <ObjectiveTable objectiveList={response} />}
			</div>
		</>
	);
}

export default ObjectiveInfo;
