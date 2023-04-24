import { Input, Select, Toggle } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import StyledTable from '../../common/StyledTable';
import useArchive from '../../hooks/useArchive';
import { optionsEntity, serviceTypeOptions } from '../constant';

import { ARCHIVE_DECLARED, ARCHIVE_MONTH_BOOKED } from './configuration';
import Freeze from './Freeze';
import MonthInfo from './MonthInfo';
import styles from './styles.module.css';

function Archive({ setShowTab }:{ setShowTab: React.Dispatch<React.SetStateAction<boolean>> }) {
	const [toggleValue, setToggleValue] = useState('declared');

	const [showSub, setShowSub] = useState(false);

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
					{getFormattedPrice(buyQuotation, buyQuotationCurrency) || '-'}
				</div>
				<div>
					Sales :
					{' '}
					{getFormattedPrice(sellQuotation, sellQuotationCurrency) || '-' }
				</div>
				<div>
					Margin :
					{' '}
					{quotationProfit || '0'}
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
					<Freeze item={monthData} refetch={refetch} />
					<MonthInfo
						data={monthData}
						handleClick={clickHandler}
						loading={loading}
					/>
					<div className={styles.button_container}>
						<div
							onClick={() => { setShowSub(!showSub); }}
							className={styles.hide_data}
							role="presentation"
						>
							{showSub ? 'Hide All Quotations' : 'View All Quotations'}

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
								style={{ width: '200px' }}
							/>
						</div>
						<div className={styles.div_select}>
							<Select
								value={globalFilters?.archivedStatus}
								onChange={(val:string) => {
									setGlobalFilters((prev) => ({ ...prev, archivedStatus: val }));
								}}
								placeholder="Archived Status"
								options={[
									{ label: 'Booked', value: 'BOOKED' },
									{ label: 'Accrued', value: 'ACCRUED' }]}
								isClearable
								style={{ width: '180px' }}
							/>
						</div>
						<div className={styles.div_select}>
							<Select
								value={globalFilters?.entity}
								onChange={(val:string) => {
									setGlobalFilters((prev) => ({ ...prev, entity: val }));
								}}
								placeholder="Entity"
								options={optionsEntity}
								isClearable
								style={{ width: '150px' }}
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
						{toggleValue === 'declared' && (
							<div className={styles.table_container}>
								<StyledTable
									page={page}
									total={particularMonth ? drillTotalRecords : totalRecords}
									pageSize={10}
									data={particularMonth ? drillDataList : list}
									columns={particularMonth ? ARCHIVE_MONTH_BOOKED : ARCHIVE_DECLARED(
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
