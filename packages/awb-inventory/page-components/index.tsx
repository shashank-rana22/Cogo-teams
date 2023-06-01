import { Tabs, TabPanel, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import tabs from '../configurations/tabs';
import useGetAwbList from '../hooks/useGetAwbList';

import AddAwbNumber from './AddAwbNumber';
import AwbNumber from './AwbNumber';
import AwbNumberDeleted from './AwbNumberDeleted';
import AwbNumberUsed from './AwbNumberUsed';
import Header from './Header';
import styles from './styles.module.css';

const TABS_COMPONENT_MAPPING = {
	awb_number        : AwbNumber,
	awb_number_used   : AwbNumberUsed,
	awb_number_cancel : AwbNumberDeleted,
};

function AwbInventory() {
	const [activeTab, setActiveTab] = useState('awb_number');
	const [show, setShow] = useState(false);
	const ActiveTabComponent = TABS_COMPONENT_MAPPING[activeTab] || null;

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
	} = useGetAwbList(activeTab);

	return (
		<div>
			<Header setShow={setShow} />
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
							/>
						</TabPanel>
					))}
				</Tabs>
			</div>
			{show
			&& (
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
			)}
		</div>
	);
}

export default AwbInventory;
