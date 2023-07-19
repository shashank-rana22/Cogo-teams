import { Tabs, TabPanel, Input, Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState, useEffect } from 'react';

import CONSTANTS from '../constants/constants';
import useGetAwbList from '../hooks/useGetAwbList';

import AwbInventoryStock from './AwbInventoryStock';
import AwbNumber from './AwbNumber';
import AwbNumberDeleted from './AwbNumberDeleted';
import AwbNumberUsed from './AwbNumberUsed';
import Filters from './Filters';
import Header from './Header';
import styles from './styles.module.css';

const { START_PAGE } = CONSTANTS;
const STATUS_VALUE = [
	{ label: 'Available(Non-reserved)', value: 'available_non_reserved' },
	{ label: 'Available(Reserved)', value: 'available_reserved' },
	{ label: 'Cancelled', value: 'cancelled' },
	{ label: 'Used', value: 'used' },
];

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
			Component : (value === 'available_non_reserved' && AwbNumber)
						|| (value === 'available_reserved' && AwbNumber)
						|| (value === 'cancelled' && AwbNumberDeleted)
						|| AwbNumberUsed,
		},
	};
	return tabComponentMapping;
};

function AwbInventory() {
	const [activeTab, setActiveTab] = useState('overview');
	const [value, setValue] = useState('available_non_reserved');
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
											options={STATUS_VALUE}
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
		</div>
	);
}

export default AwbInventory;
