import { TabPanel, Tabs } from '@cogoport/components';
import React, { useState } from 'react';

import TAB_OPTION_MAPPING from '../../utils/tab_options_mapping';
import FinanceDashBoard from '../FinanceDashBoard';
import useGetBfList from '../hooks/useGetBfList';
import Profile from '../Profile';
import ServicesUsers from '../Services&Users';

import styles from './styles.module.css';

function MainData({ data = {} }) {
	const [activeTab, setActiveTab] = useState('local_rates');
	// const options = Object.values(TAB_OPTION_MAPPING);

	return (

		<div className={styles.main}>

			<Tabs
				activeTab={activeTab}
				themeType="primary-vertical"
				onChange={setActiveTab}
				className={styles.change}

			>
				{/* {options?.map((option) => {
					const { key = '', title = '', containerComponent: ContainerComponent = null } = option;

					if (!ContainerComponent) return null;

					return (
						<TabPanel name={key} title={title}>
							<ContainerComponent
								data={data}
							/>

						</TabPanel>
					);
				})} */}

				<TabPanel name="local_rates" title="Services & Users">
					<div><ServicesUsers /></div>
				</TabPanel>

				<TabPanel name="suggested_rates" title="Profile">
					<div><Profile data={data} /></div>
				</TabPanel>

				<TabPanel name="freight_bookings" title="Finance DashBoard &emsp;&emsp; ">
					<div><FinanceDashBoard /></div>
				</TabPanel>
			</Tabs>

		</div>
	);
}

export default MainData;
