import { Tabs, TabPanel, Input, Button, Modal } from '@cogoport/components';
import { IcMSearchlight, IcMPlus } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetInventoryStock from '../../hooks/useGetAwbInventoryStock';
import useGetClearanceDateReport from '../../hooks/useGetClearanceDateReport';
import AddAwbNumber from '../AddAwbNumber';
import AwbInventoryStockReport from '../AwbInventoryStockReport';
import ClearanceDateReport from '../ClearanceDateReport';
import Filters from '../Filters';

import styles from './styles.module.css';

const TABS_COMPONENT_MAPPING = {
	inventory_stock: {
		name      : 'inventory_stock',
		title     : 'Awb Inventory Stock',
		Component : AwbInventoryStockReport,
	},
	clearance_date_confirmation: {
		name      : 'clearance_date_confirmation',
		title     : 'Clearance Date Confirmation',
		Component : ClearanceDateReport,
	},
};

function AwbInventoryStock() {
	const [activeTab, setActiveTab] = useState('inventory_stock');
	const [show, setShow] = useState(false);
	const [filterData, setFilterData] = useState({});

	const {
		loading,
		data = {},
		awbInventoryStockList,
		setPage,
		page,
		finalList = [],
		setFinalList,
		control,
		errors,
	} = useGetInventoryStock({ activeTab, filterData });

	const { totalRecords:totalRecordsInventoryStock } = data;

	const {
		loading: ClearanceReportLoading,
		setPage: ClearanceReportSetPage,
		page: ClearanceReportPage,
		data: ClearanceReportData,
		clearanceDateReport,
		finalList: ClearanceReportFinalList,
		setFinalList: ClearanceReportSetFinalList,
		filters,
		setFilters,
		qfilter,
		setQfilter,
	} = useGetClearanceDateReport({ activeTab });

	const { totalRecords:totalRecordsClearanceDateReport } = ClearanceReportData;

	return (
		<div>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
				style={{ marginTop: '40px' }}
			>
				{Object.values(TABS_COMPONENT_MAPPING).map((item) => {
					const { name = '', title = '', Component } = item;

					if (!Component) return null;

					return (
						<TabPanel
							key={name}
							name={name}
							title={title}
							badge={name === 'inventory_stock'
								? totalRecordsInventoryStock
								: totalRecordsClearanceDateReport}
						>
							<div className={styles.filters_container}>
								{activeTab === 'clearance_date_confirmation' && (
									<div className={styles.flex}>
										<Input
											value={qfilter}
											suffix={<IcMSearchlight className="search_icon" />}
											className={styles.input_search}
											placeholder="Search by SID or AWB Number"
											type="text"
											onChange={(val) => {
												setQfilter(val);
											}}
											style={{ margin: '10px' }}
										/>
										<Filters
											filters={filters}
											setFilters={setFilters}
											activeTab={activeTab}
										/>
									</div>
								)}
								{activeTab === 'inventory_stock' && (
									<div className={styles.flex}>
										<Button
											size="md"
											themeType="primary"
											onClick={() => setShow(true)}
										>
											<IcMPlus
												fill="#ffffff"
												width={15}
												height={15}
											/>
											ADD AWB

										</Button>
										{show && (
											<Modal
												show={show}
												onClose={() => setShow(false)}
												className={styles.modal_container}
											>
												<AddAwbNumber
													setShow={setShow}
													awbList={awbInventoryStockList}
													setActiveTab={setActiveTab}
													setFinalList={setFinalList}
													setPage={setPage}
													page={page}
												/>
											</Modal>
										)}
									</div>
								)}
							</div>
							{activeTab === 'inventory_stock' ? (
								<Component
									loading={loading}
									data={data}
									page={page}
									setPage={setPage}
									finalList={finalList}
									setFinalList={setFinalList}
									control={control}
									errors={errors}
									setFilterData={setFilterData}
								/>
							) : (
								<Component
									loading={ClearanceReportLoading}
									setPage={ClearanceReportSetPage}
									page={ClearanceReportPage}
									data={ClearanceReportData}
									finalList={ClearanceReportFinalList}
									setFinalList={ClearanceReportSetFinalList}
									clearanceDateReport={clearanceDateReport}
									setQfilter={setQfilter}
								/>
							) }
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}
export default AwbInventoryStock;
