import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { STATISTICS_HEAD, STATISTICS_HEAD_LIMIT_INDEX } from '../../helpers/constants';
import useGetLeadData from '../../hooks/useGetLeadData';
import LeadInfo from '../LeadInfo';
import Statistics from '../Statistics';

import MainFilters from './MainFilters';
import styles from './styles.module.css';

function Accounts() {
	const [showUsers, setShowUsers] = useState(false);
	const {
		loading,
		response,
		control,
		debounceQuery,
		reset,
		params,
		setParams = () => {},
		checkedRowsId = [],
		selectAll = false,
		onChangeTableHeadCheckbox = () => {},
		onChangeBodyCheckbox = () => {},
		paginationData = {},
	} = useGetLeadData();

	return (
		<div className={styles.container}>

			<div className={styles.header}>Leads Statistics</div>

			<div className={styles.filterContainer}>
				<MainFilters
					className={styles.mainFilters}
					control={control}
					loading={loading}
					reset={reset}
					debounceQuery={debounceQuery}
					params={params}
					setParams={setParams}
				/>
			</div>

			<div className={styles.statistics}>

				{STATISTICS_HEAD.slice(GLOBAL_CONSTANTS.zeroth_index, STATISTICS_HEAD_LIMIT_INDEX).map((item) => (
					<div key={item} className={styles.statistics__item}>
						<Statistics
							head={item}
							params={params}
						/>
					</div>
				))}

				{showUsers && STATISTICS_HEAD.slice(STATISTICS_HEAD_LIMIT_INDEX).map((item) => (
					<div key={item} className={styles.statistics__item}>
						<Statistics
							head={item}
							params={params}
						/>
					</div>
				))}
			</div>

			<div className={styles.user_button}>
				<Button onClick={() => setShowUsers((prev) => !prev)}>
					<div className={styles.button_name}>
						User Stats
					</div>
					{showUsers ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
				</Button>
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
