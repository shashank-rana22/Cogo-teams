import { Button, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcMCloudUpload } from '@cogoport/icons-react';
import React, { useState } from 'react';

import FileFilter from '../../commons/FileFilter';
import { STATISTICS_HEAD, STATISTICS_HEAD_LIMIT_INDEX } from '../../helpers/constants';
import useGetLeadData from '../../hooks/useGetLeadData';
import LeadInfo from '../LeadInfo';
import Statistics from '../Statistics';

import CsvFilter from './CsvFilter';
import MainFilters from './MainFilters';
import styles from './styles.module.css';

function Accounts() {
	const [showUsers, setShowUsers] = useState(false);
	const [fileName, setFileName] = useState('');
	const [showCsv, setShowCsv] = useState(false);

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

	const onRemoveCsvFilter = () => {
		try {
			setParams((previousParams) => ({
				...previousParams,
				filters: {
					...(previousParams.filters || {}),
					csv_filter: undefined,
				},
			}));
			setFileName('');
		} catch (error) {
			Toast.error(error);
		}
	};

	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<div>Leads Statistics</div>
				{fileName
					? (
						<FileFilter
							fileName={fileName}
							onRemoveCsvFilter={onRemoveCsvFilter}
						/>
					) : (
						<Button themeType="secondary" className={styles.upload_btn} onClick={() => setShowCsv(true)}>
							<IcMCloudUpload style={{ width: '20px', height: 'auto' }} />
							Upload CSV
						</Button>
					)}

				{showCsv
					? (
						<CsvFilter
							setFileName={setFileName}
							setParams={setParams}
							showCsv={showCsv}
							setShowCsv={setShowCsv}
						/>
					) : null}
			</div>

			<div className={styles.filterContainer}>
				<MainFilters
					className={styles.mainFilters}
					control={control}
					loading={loading}
					reset={reset}
					debounceQuery={debounceQuery}
					params={params}
					setParams={setParams}
					setFileName={setFileName}
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
