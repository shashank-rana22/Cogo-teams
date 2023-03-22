import { Input, SingleDateRange, Select, Toggle } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import StyledTable from '../../common/StyledTable';
import useArchive from '../../hooks/useArchive';
import { serviceTypeOptions } from '../constant';

import { ARCHIVE_DECLARED, ARCHIVE_MONTH_ACCRUED, ARCHIVE_MONTH_BOOKED } from './constant';
import Freeze from './Freeze';
import MonthInfo from './MonthInfo';
import styles from './styles.module.css';

function Archive({ setShowTab }) {
	const [toggleValue, setToggleValue] = useState('declared');
	const [isBookedActive, setIsBookActive] = useState(true);
	let ARCHIVE_MONTH_CONFIG;

	if (isBookedActive) {
		ARCHIVE_MONTH_CONFIG = ARCHIVE_MONTH_BOOKED;
	} else {
		ARCHIVE_MONTH_CONFIG = ARCHIVE_MONTH_ACCRUED;
	}
	const {
		apiData,
		drillData,
		monthData,
		particularMonth,
		clickHandler,
		setMonthData,
		globalFilters,
		setGlobalFilters,
		setParticularMonth,
		refetch,
		loading,
		getDrillDownArchive,
	} = useArchive({ toggleValue, setShowTab });

	const drillDataList = drillData?.list || [];
	const apiDataList = apiData?.list || [];

	return (
		<div>
			{!particularMonth && (
				<div className={styles.toggle_container}>
					<div
						className={styles.flex_container}
					>
						<Toggle
							offLabel="Declared"
							onLabel="Actual"
							value={toggleValue}
							disabled
							onChange={(e) => { setToggleValue(e?.target?.checked ? 'declared' : 'actual'); }}
						/>
					</div>
				</div>
			)}
			{particularMonth && (
				<Freeze item={monthData} refetch={refetch} />
			)}
			{particularMonth && (
				<MonthInfo
					data={monthData}
					handleClick={clickHandler}
					loading={loading}
				/>
			)}
			{particularMonth && (
				<div className={styles.button_container}>
					<div
						className={isBookedActive ? styles.selected : styles.button_tab}
						onClick={() => {
							setGlobalFilters((p) => ({
								...p,
								archivedStatus: 'BOOKED',
							}));
							getDrillDownArchive(monthData);
							setIsBookActive(true);
						}}
						role="presentation"
					>
						Booked
					</div>

					<div
						className={!isBookedActive ? styles.selected : styles.button_tab}
						onClick={() => {
							setGlobalFilters((p) => ({
								...p,
								archivedStatus: 'ACCRUED',
							}));
							getDrillDownArchive(monthData);
							setIsBookActive(false);
						}}
						role="presentation"
					>
						Accrued
					</div>
				</div>
			)}
			<div className={styles.backlist}>
				<div className={styles.header_container}>

					<div className={styles.filter_container}>
						<div className={styles.div_select}>
							<Select
								value={globalFilters?.serviceType}
								onChange={(val:string) => {
									setGlobalFilters((prev) => ({ ...prev, serviceType: val }));
								}}
								placeholder="Service Type"
								options={serviceTypeOptions}
								isClearable
								style={{ width: '200px' }}
							/>
						</div>
						{particularMonth && (
							<div className={styles.div_select}>
								<SingleDateRange
									placeholder="Date"
									dateFormat="MM/dd/yyyy"
									name="date"
									onChange={(val:any) => { setGlobalFilters((prev) => ({ ...prev, date: val })); }}
									value={globalFilters?.date}
								/>
							</div>
						)}
					</div>
					{particularMonth ? (
						<div className={styles.search_container}>
							<Input
								value={globalFilters?.search}
								onChange={(val) => { setGlobalFilters((prev) => ({ ...prev, search: val })); }}
								placeholder="Search by SID"
								suffix={<IcMSearchlight height="20px" width="20px" style={{ marginRight: '8px' }} />}
							/>
						</div>
					) : (
						''
					)}
				</div>

				{(apiData?.list || drillData?.list || loading) && (
					<div>
						{toggleValue === 'declared' ? (
							<div className={styles.table_container}>
								<StyledTable
								// page={page}
								// total={total}
								// pageSize={pageSize}
									data={particularMonth ? drillDataList : apiDataList}
									columns={particularMonth ? ARCHIVE_MONTH_CONFIG : ARCHIVE_DECLARED(
										setMonthData,
										particularMonth,
										setParticularMonth,
										getDrillDownArchive,
										setShowTab,
									)}
									loading={loading}
									setFilters={setGlobalFilters}
									filters={globalFilters}
								/>
							</div>
						) : (
							<div className={styles.table_container}>
								{/* <StyledTable
								// page={page}
								// total={total}
								// pageSize={pageSize}
								data={particularMonth ? drillData?.list : apiData?.list}
								// columns={accrualColumn(getTableBodyCheckbox, getTableHeaderCheckbox)}
								// loading={shipmentLoading}
								setFilters={setGlobalFilters}
								filters={globalFilters}
							/> */}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
export default Archive;
