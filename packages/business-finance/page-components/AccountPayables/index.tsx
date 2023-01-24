import { useRequestBf } from '@cogoport/request';
import {useState} from "react"
import React, { useEffect } from 'react';
import {Tabs, TabPanel} from '@cogoport/components';
import { IcMProfile} from '@cogoport/icons-react';
import OverHead from './OverHeads';
import styles from "./styles.module.css"

function AccountPayables() {
	const [activeTab, setActiveTab] = useState('dashboard');

	const [{ data, loading, error }, trigger] = useRequestBf(
		{
			url     : '/purchase/payable-bill/list',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_list',
		},
		{ autoCancel: false },
	);

	const tabMapping = {
		"DASHBOARD":{
			"tabValue": "DASHBOARD",
			"component": <h1>DASHBOARD</h1>
		},
		"INVOICES":{
			"tabValue": "INVOICES",
			"component": <h1>hello invoices</h1>
		},
		"PAYRUN":{
			"tabValue": "PAYRUN",
			"component": <h1>hello payrun</h1>
		},
		"OUTSTANDING":{
			"tabValue": "OUTSTANDING",
			"component": <h1>hello outstanding</h1>
		},
		"OVERHEADS":{
			"tabValue": "OVERHEADS",
			"component": <OverHead />
		},
		"TREASURY":{
			"tabValue": "TREASURY",
			"component": <h1>hello treasury</h1>
		}
	}

	const renderTabs = () =>{
		return  (
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				fullWidth
				onChange={setActiveTab}
			>
				{
					Object.keys(tabMapping).map ((key)=>{
						const {tabValue='', component = null} = tabMapping?.[key];
						return (
							<TabPanel name={key} title={tabValue}>
								{component}
							</TabPanel>	
						)
					})
				}
			</Tabs>
		)
	}

	useEffect(() => {
		trigger();
	}, []);

	return (
		<div className={styles.container}>
			<h1 className = {styles.heading}>Account Payables</h1>
			<div>
				{renderTabs()}
			</div>
		</div>
	);
}

export default AccountPayables;
