import { Input, Select, Toggle } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import StyledTable from '../../common/StyledTable';
import useArchive from '../../hooks/useArchive';
import { getEntityOptions, serviceTypeOptions } from '../constant';

import { ARCHIVE_DECLARED, ARCHIVE_MONTH_BOOKED, ARCHIVE_MONTH_ACCRUED } from './configuration';
import Freeze from './Freeze';
import MonthInfo from './MonthInfo';
import styles from './styles.module.css';

const IS_BOOKED = (key) => (key ? styles.selected : styles.button_tab);

function Archive({ setShowTab }:{ setShowTab: React.Dispatch<React.SetStateAction<boolean>> }) {
	const [toggleValue, setToggleValue] = useState('declared');
	const [isBookedActive, setIsBookActive] = useState(true);
	const [showSub, setShowSub] = useState(false);

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

	const { totalRecords, list } = apiData || {};

	const { list:drillDataList, totalRecords:drillTotalRecords } = drillData || {};

	const { page } = globalFilters || {};

	const entityOptions = getEntityOptions() as any;

	const subComponent = (itemData) => {
		const {
			sellQuotation = '', buyQuotation = '', quotationProfit = '',
			quotationMargin = '', bookingType = '', buyQuotationCurrency = '',
			sellQuotationCurrency = '',
		} = itemData || {};

		return (
			<div className={styles.sub_comp}>
				<div className={styles.quo}>
					Quotation
					<div className={styles.quo_border} />
				</div>

				<div>
					Purchase :
					{' '}
					{formatAmount({
						amount   :	buyQuotation,
						currency : buyQuotationCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					}) || '-'}
				</div>
				<div>
					Sales :
					{' '}
					{formatAmount({
						amount   :	sellQuotation,
						currency : sellQuotationCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					}) || '-' }
				</div>
				<div>
					Margin :
					{' '}
					{formatAmount({
						amount   :	quotationProfit,
						currency : sellQuotationCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					}) || '-' }
					{' '}
					(
					{quotationMargin || '0'}
					%)
				</div>
				<div>
					Shipment Type :
					{' '}
					{' '}
					<span className={styles.span_val}>{bookingType || '-'}</span>
				</div>
			</div>
		);
	};

	return (
		<div>
			{particularMonth ? (
				<>

					<MonthInfo
						data={monthData}
						handleClick={clickHandler}
						loading={loading}
					/>
					<div className={styles.sub_tabs}>
						<div className={styles.button_value}>
							<div
								className={IS_BOOKED(isBookedActive)}
								onClick={() => {
									setGlobalFilters((p) => ({
										...p,
										archivedStatus: 'BOOKED',
									}));
									setIsBookActive(true);
								}}
								role="presentation"
							>
								Booked
							</div>

							<div
								className={IS_BOOKED(!isBookedActive)}
								onClick={() => {
									setGlobalFilters((p) => ({
										...p,
										archivedStatus: 'ACCRUED',
									}));
									setIsBookActive(false);
								}}
								role="presentation"
							>
								Accrued

							</div>
						</div>

						<div className={styles.button_container}>
							<div
								onClick={() => { setShowSub(!showSub); }}
								className={styles.hide_data}
								role="presentation"
							>
								{showSub ? 'Hide All Quotations' : 'View All Quotations'}

							</div>
							<Freeze item={monthData} refetch={refetch} />
						</div>
					</div>

				</>
			) : (
				<div className={styles.toggle_container}>
					<div
						className={styles.flex_container}
					>
						<Toggle
							name="declare"
							offLabel="Declared"
							onLabel="Actual"
							value={toggleValue}
							size="md"
							disabled
							onChange={(e) => { setToggleValue(e?.target?.checked ? 'declared' : 'actual'); }}
						/>
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
								style={{ width: '144px' }}
								size="sm"
							/>
						</div>
						<div className={styles.div_select}>
							<Select
								value={globalFilters?.entity}
								size="sm"
								onChange={(val:string) => {
									setGlobalFilters((prev) => ({ ...prev, entity: val }));
								}}
								placeholder="Entity"
								options={entityOptions}
								isClearable
								style={{ width: '100px' }}
							/>
						</div>
						{particularMonth && (
							<div className={styles.total_count}>
								<div>
									Total Shipments:&nbsp;
									<span className={styles.total_count_num}>{drillTotalRecords || 0}</span>
								</div>
							</div>
						)}
					</div>
					{particularMonth ? (
						<div className={styles.search_container}>
							<Input
								size="sm"
								value={globalFilters?.search}
								onChange={(val) => { setGlobalFilters((prev) => ({ ...prev, search: val })); }}
								placeholder="Search by SID"
								suffix={<IcMSearchlight height="15px" width="15px" style={{ marginRight: '8px' }} />}
							/>
						</div>
					) : (
						''
					)}
				</div>

				{(apiData?.list || drillData?.list || loading) && (
					<div>
						{toggleValue === 'declared' && (
							<div className={styles.table_container}>
								<StyledTable
									page={page}
									total={particularMonth ? drillTotalRecords : totalRecords}
									pageSize={10}
									data={particularMonth ? drillDataList : list}
									columns={particularMonth ? ARCHIVE_MONTH_CONFIG : ARCHIVE_DECLARED(
										setMonthData,
										particularMonth,
										setParticularMonth,
										getDrillDownArchive,
										setShowTab,
									)}
									loading={loading}
									renderRowSubComponent={particularMonth && subComponent}
									selectType="multiple"
									showAllNestedOptions={particularMonth && showSub}
									setFilters={setGlobalFilters}
									filters={globalFilters}
								/>
							</div>
						) }
					</div>
				)}
			</div>
		</div>
	);
}
export default Archive;
