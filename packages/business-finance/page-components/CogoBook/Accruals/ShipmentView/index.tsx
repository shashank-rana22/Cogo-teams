import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import StyledTable from '../../common/StyledTable';
import useShipmentView from '../../hooks/useShipmentView';

import Card from './Card';
import { accrualColumn } from './Card/constant';
import Footer from './Footer';
import styles from './styles.module.css';

function ShipmentView() {
	const [checkedRows, setCheckedRows] = useState({});
	const [viewSelected, setViewSelected] = useState(true);
	const [showBtn, setShowBtn] = useState(false);
	const [bulkSection, setBulkSection] = useState({ value: false, bulkAction: '' });
	const [filters, setFilters] = useState({
		year          : '',
		month         : '',
		date          : '',
		service       : '',
		shipmentType  : '',
		tradeType     : '',
		range         : '',
		profitAmount  : '',
		jobState      : '',
		profitPercent : '',
		query         : '',
		profitType    : 'amount',
		page          : 1,
		pageLimit     : 10,
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
		crossProfitHandler,
		tickProfitHandler,
		profit:profitData,
	} =	 useShipmentView({ filters, checkedRows, setBulkSection, bulkAction, setCheckedRows });

	const {
		totalRecords = 0,
		list = [],
	} = apiData || {};

	const { page } = filters || {};

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
				</div>
				<div className={styles.input_container}>
					<Input
						value={filters?.query}
						onChange={(val) => { setFilters((prev) => ({ ...prev, query: val })); }}
						placeholder="Search by SID"
						disabled={!filters.year && !filters.month}
						suffix={<IcMSearchlight height="20px" width="20px" style={{ marginRight: '8px' }} />}
					/>
				</div>

			</div>
			<div className={styles.table_data}>
				<StyledTable
					page={page}
					total={totalRecords}
					pageSize={10}
					data={list}
					columns={accrualColumn(
						getTableBodyCheckbox,
						getTableHeaderCheckbox,
						editProfitHandler,
						changeProfitHandler,
						crossProfitHandler,
						tickProfitHandler,
						profitValue,
						profitData,
					)}
					loading={shipmentLoading}
					setFilters={setFilters}
					filters={filters}
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
