import { Input } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMOverview, IcMSearchlight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import StyledTable from '../../common/StyledTable';
import useShipmentView from '../../hooks/useShipmentView';

import Card from './Card';
import { accrualColumn } from './constant';
import Footer from './Footer';
import styles from './styles.module.css';

function ShipmentView() {
	const [checkedRows, setCheckedRows] = useState({});
	const [showBtn, setShowBtn] = useState(false);
	const [bulkSection, setBulkSection] = useState({ value: false, bulkAction: '' });
	const [showSub, setShowSub] = useState(false);
	const [filters, setFilters] = useState({
		year               : '',
		month              : '',
		date               : '',
		service            : '',
		shipmentType       : '',
		tradeType          : '',
		range              : '',
		entity             : '',
		profitAmount       : '',
		jobState           : '',
		profitPercent      : '',
		profitPercentUpper : '',
		profitAmountUpper  : '',
		query              : '',
		profitType         : 'amount',
		sortBy             : '',
		sortType           : 'ASC',
		page               : 1,
		pageLimit          : 10,
	});

	const { bulkAction } = bulkSection;

	const {
		refetch,
		shipmentLoading,
		getTableBodyCheckbox,
		checkedData,
		getTableHeaderCheckbox,
		payload,
		setPayload,
		addSelect,
		checkedRowsSerialId,
		apiData,
		editProfitHandler,
		profitValue,
		changeProfitHandler,
		selectedDataLoading,
		crossProfitHandler,
		tickProfitHandler,
		profit:profitData,
		viewSelected,
		setViewSelected,
	} =	 useShipmentView({ filters, checkedRows, setBulkSection, bulkAction, setCheckedRows });

	const {
		totalRecords = 0,
		list = [],
	} = apiData || {};

	const { page, year, month } = filters || {};

	const isApplyEnable = year?.length > 0 && month?.length > 0;
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
			<Card
				refetch={refetch}
				setPayload={setPayload}
				setCheckedRows={setCheckedRows}
				shipmentLoading={shipmentLoading}
				setFilters={setFilters}
				setViewSelected={setViewSelected}
				setShowBtn={setShowBtn}
				filters={filters}
				isApplyEnable={isApplyEnable}
			/>

			<div className={styles.flex}>
				<div className={styles.sub_flex}>
					{filters?.service && (
						<div className={styles.card_small}>
							Service -
							{' '}
							{startCase(filters?.service)}
						</div>
					)}

					{filters?.tradeType && (
						<div className={styles.card_small}>
							{' '}
							{filters?.tradeType}
						</div>
					)}

					<div className={styles.card_small}>
						<span className={styles.steps}>Step 1 -</span>

						{' '}
						<span className={styles.text_step}>Select The Shipments You Want To Accrue/Book</span>
					</div>

					<div className={styles.card_small}>
						Remaining -
						{' '}
						<span className={styles.color}>{totalRecords}</span>
					</div>
				</div>

			</div>

			<div className={styles.table_data}>
				<div className={styles.input_data_container}>
					<div className={styles.icon_container}>
						<div
							onClick={() => { setShowSub(!showSub); }}
							className={styles.hide_data}
							role="presentation"
						>
							{showSub ? 'Hide All Quotations' : 'View All Quotations'}
						</div>
						<div className={styles.icon}><IcMOverview height="20px" width="20px" /></div>
					</div>

					<div className={styles.input_container}>
						<Input
							value={filters?.query}
							onChange={(val) => { setFilters((prev) => ({ ...prev, query: val })); }}
							placeholder="Search by SID"
							disabled={!isApplyEnable}
							suffix={<IcMSearchlight height="20px" width="20px" style={{ marginRight: '8px' }} />}
						/>
					</div>
				</div>
				<StyledTable
					page={page}
					total={totalRecords}
					pageSize={10}
					data={list}
					renderRowSubComponent={subComponent}
					columns={accrualColumn(
						getTableBodyCheckbox,
						getTableHeaderCheckbox,
						editProfitHandler,
						changeProfitHandler,
						crossProfitHandler,
						tickProfitHandler,
						profitValue,
						profitData,
						filters,
						setFilters,
					)}
					selectType="multiple"
					loading={shipmentLoading}
					setFilters={setFilters}
					filters={filters}
					showAllNestedOptions={showSub}
				/>
			</div>
			<div>
				<Footer
					addSelect={addSelect}
					checkedData={checkedData}
					checkedRowsSerialId={checkedRowsSerialId}
					payload={payload}
					filters={filters}
					bulkSection={bulkSection}
					viewSelected={viewSelected}
					selectedDataLoading={selectedDataLoading}
					showBtn={showBtn}
					setBulkSection={setBulkSection}
					shipmentLoading={shipmentLoading}
					setCheckedRows={setCheckedRows}
				/>
			</div>
		</div>
	);
}
export default ShipmentView;
