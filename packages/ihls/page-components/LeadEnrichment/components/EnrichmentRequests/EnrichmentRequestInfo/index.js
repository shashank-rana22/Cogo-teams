import React from 'react';

import SearchInput from '../../../../../commons/SearchInput';
import LeadTable from '../../../commons/LeadTable';
import useGetLeadEnrichmentLogs from '../../../hooks/useGetLeadEnrichmentLogs';
// import useGetObjectiveInfo from '../../hooks/useGetObjectiveInfo';

// import Header from './components/Header';
// import ObjectiveTable from './components/ObjectiveTable';

import styles from './styles.module.css';

const accountList = [
	{
		id           : 1,
		account_name : 'Yash enrichers',
		account_pan  : 'CDSADS2131F',
	},
	{
		id           : 2,
		account_name : 'Yash enrichers',
		account_pan  : 'CDSADS2131F',
	},
	{
		id           : 3,
		account_name : 'Yash enrichers',
		account_pan  : 'CDSADS2131F',
	},
];

function EnrichmentRequestInfo({ id = null }) {
	const {
		// loading,
		// response,
		// searchQuery,
		debounceQuery,
		searchValue,
		setSearchValue,
		// setParams,
	} = useGetLeadEnrichmentLogs({ id });

	const columns = [
		{
			Header   : 'ACCOUNT NAME',
			key      : 'account_name',
			accessor : ({ account_name }) => (
				<div className={styles.table_cell}>
					{account_name || '___'}
				</div>
			),
		},
		{
			Header   : 'PAN',
			key      : 'account_pan',
			accessor : ({ account_pan }) => (
				<div className={styles.table_cell}>
					{account_pan || '___'}
				</div>
			),
		},
	];

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
				<LeadTable columns={columns} data={accountList} />
			</div>
		</>
	);
}

export default EnrichmentRequestInfo;
