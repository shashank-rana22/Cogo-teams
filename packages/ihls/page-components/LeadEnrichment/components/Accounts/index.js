import React from 'react';

import { STATISTICS_HEAD } from '../../helpers/constants';
import useGetEnrichmentData from '../../hooks/useGetEnrichmentData';
import LeadInfo from '../LeadInfo';
import MainFilters from '../MainFilters';
import Statistics from '../Statistics';

import styles from './styles.module.css';

function Accounts() {
	const {
		loading,
		response,
		control,
		handleClick,
		searchQuery,
		debounceQuery,
		handleSubmit,
		watch,
		reset,
		params,
		setParams = () => {},
		checkedRowsId = [],
		selectAll = false,
		onChangeTableHeadCheckbox = () => {},
		onChangeBodyCheckbox = () => {},
		paginationData = {},
	} = useGetEnrichmentData();

	return (
		<div className={styles.container}>

			<div className={styles.header}>Leads Statistics</div>

			<div className={styles.filterContainer}>
				<MainFilters
					className={styles.mainFilters}
					control={control}
					handleSubmit={handleSubmit}
					handleClick={handleClick}
					loading={loading}
					reset={reset}
					watch={watch}
					searchQuery={searchQuery}
					debounceQuery={debounceQuery}
					setParams={setParams}
				/>
			</div>

			<div className={styles.statistics}>

				{STATISTICS_HEAD.map((item) => (
					<div key={item} className={styles.statistics__item}>
						<Statistics
							head={item}
							params={params}
						/>
					</div>
				))}
			</div>

			<div className={styles.account_table}>
				<div className={styles.header}>Accounts List</div>
				<LeadInfo
					response={response}
					paginationData={paginationData}
					loading={loading}
					selectAll={selectAll}
					params={params}
					setParams={setParams}
					onChangeTableHeadCheckbox={onChangeTableHeadCheckbox}
					checkedRowsId={checkedRowsId}
					onChangeBodyCheckbox={onChangeBodyCheckbox}
				/>
			</div>
		</div>
	);
}

export default Accounts;
