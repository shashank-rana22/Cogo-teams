import { Tabs, TabPanel, Input, Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState, useEffect } from 'react';

// import tabs from '../configurations/tabs';
import CONSTANTS from '../constants/constants';
import useGetAwbList from '../hooks/useGetAwbList';

// import AddAwbNumber from './AddAwbNumber';
import AwbInventoryStock from './AwbInventoryStock';
import AwbNumber from './AwbNumber';
import AwbNumberDeleted from './AwbNumberDeleted';
import AwbNumberUsed from './AwbNumberUsed';
import Filters from './Filters';
import Header from './Header';
import styles from './styles.module.css';

const { START_PAGE } = CONSTANTS;
const status_value = [
	{ label: 'Available', value: 'available' },
	{ label: 'Cancelled', value: 'cancelled' },
	{ label: 'Used', value: 'used' },
];

// const TABS_COMPONENT_MAPPING = {
// 	awb_number        : AwbNumber,
// 	awb_number_used   : AwbNumberUsed,
// 	awb_number_cancel : AwbNumberDeleted,
// };
const getVariableTabMapping = ({ value }) => {
	const tabComponentMapping = {
		overview: {
			name      : 'overview',
			title     : 'OVERVIEW',
			Component : AwbInventoryStock,
		},
		awb_details: {
			name      : 'awb_details',
			title     : 'AWB DETAILS',
			Component : (value === 'available' && AwbNumber)
						|| (value === 'cancelled' && AwbNumberDeleted)
						|| AwbNumberUsed,
		},
	};
	return tabComponentMapping;
};
// const TABS_COMPONENT_MAPPING = {
// 	overview: {
// 		name      : 'overview',
// 		title     : 'OVERVIEW',
// 		Component : AwbNumber,
// 	},
// 	awb_details: {
// 		name      : 'awb_details',
// 		title     : 'AWB DETAILS',
// 		Component : AwbNumberUsed,
// 	},
// };

// const STATUS_MAPPING = {
// 	available : 'available',
// 	used      : '',
// 	cancelled : 'cancelled',
// };

function AwbInventory() {
	const [activeTab, setActiveTab] = useState('overview');
	const [value, setValue] = useState('available');
	// const [show, setShow] = useState(false);
	// const ActiveTabComponent = TABS_COMPONENT_MAPPING[activeTab] || null;
	const profile = useSelector((state) => state);

	const { profile: { authParams } } = profile || {};

	const {
		loading,
		data = {},
		awbList,
		setPage,
		page,
		finalList = [],
		setFinalList,
		filters,
		setFilters,
		qfilter,
		setQfilter,
	} = useGetAwbList({ activeTab, value });

	useEffect(() => {
		setFinalList([]);
		if (page === START_PAGE) {
			awbList();
		} else {
			setPage(START_PAGE);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(authParams)]);

	return (
		<div>
			<Header />
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
				style={{ marginTop: '40px' }}
			>
				{Object.values(getVariableTabMapping({ value })).map((item) => {
					const { name = '', title = '', Component } = item;

					if (!Component) return null;

					return (
						<TabPanel
							key={name}
							name={name}
							title={title}
						>
							{activeTab === 'awb_details' && (
								<div className={styles.filters_container}>
									<div className={styles.flex}>
										<Select
											value={value}
											onChange={(selectedValue) => {
												setValue(selectedValue);
												setPage(START_PAGE);
												setFinalList([]);
											}}
											placeholder="Select here..."
											options={status_value}
											style={{ width: '250px', margin: '10px' }}
											size="sm"
										/>
										<Input
											value={qfilter}
											suffix={<IcMSearchlight className="search_icon" />}
											className={styles.input_search}
											placeholder="Search by SID or AWB Number"
											type="text"
											onChange={(val) => {
												setQfilter(val);
											}}
										/>
										<Filters
											filters={filters}
											setFilters={setFilters}
											activeTab={activeTab}
										/>
									</div>
								</div>
							)}
							<Component
								key={activeTab}
								data={data}
								loading={loading}
								awbList={awbList}
								page={page}
								setPage={setPage}
								finalList={finalList}
								setFinalList={setFinalList}
								setQfilter={setQfilter}
								activeTab={activeTab}
								status={value}
							/>
						</TabPanel>
					);
				})}
			</Tabs>
			{/* <div className={styles.filters_container}>
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
					/>
					<Filters
						filters={filters}
						setFilters={setFilters}
						activeTab={activeTab}
					/>
				</div>
			</div>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					onChange={setActiveTab}
				>
					{tabs.map((tab) => (
						<TabPanel name={tab.name} title={tab.title} key={tab.key}>
							<ActiveTabComponent
								key={activeTab}
								data={data}
								loading={loading}
								awbList={awbList}
								page={page}
								setPage={setPage}
								finalList={finalList}
								setFinalList={setFinalList}
								setQfilter={setQfilter}
								activeTab={activeTab}
								status={STATUS_MAPPING[activeTab]}
							/>
						</TabPanel>
					))}
				</Tabs>
			</div> */}
			{/* {show && (
				<Modal
					show={show}
					onClose={() => setShow(false)}
					className={styles.modal_container}
				>
					<AddAwbNumber
						setShow={setShow}
						awbList={awbList}
						setActiveTab={setActiveTab}
						setFinalList={setFinalList}
						setPage={setPage}
						page={page}
					/>
				</Modal>
			)} */}
		</div>
	);
}

export default AwbInventory;
