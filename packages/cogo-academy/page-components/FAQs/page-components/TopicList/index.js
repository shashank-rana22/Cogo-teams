import { Tabs, TabPanel } from '@cogoport/components';
import { React, useState } from 'react';

import QuestionsList from '../QuestionsList';

import styles from './styles.module.css';

function TopicList(Tab) {
	const topics = ['discover_rates', 'shipment', 'checkout', 'discover_rates2',
		'shipment2', 'checkout2', 'discover_rates3', 'shipment3', 'checkout3'];
	const data = [
		{
			question : 'How long will it take to receive B/L after payment?',
			topics   : ['discover_rates', 'shipment', 'checkout'],
			tags     : ['spot_search', 'trade_party'],
		},
		{
			question : 'What are the payment terms?',
			topics   : ['discover_rates', 'shipment', 'checkout'],
			tags     : ['spot_search', 'trade_party'],
		},
		{
			question : 'How long will it take to receive B/L after payment?',
			topics   : ['discover_rates', 'shipment', 'checkout'],
			tags     : ['spot_search', 'trade_party'],
		},
		{
			question : 'When will I receive Booking Note?',
			topics   : ['discover_rates', 'shipment', 'checkout'],
			tags     : ['spot_search', 'trade_party'],
		},
		{
			question : 'How long will it take to receive B/L after payment?',
			topics   : ['discover_rates', 'shipment', 'checkout', 'discover_rates',
				'shipment', 'checkout', 'discover_rates', 'shipment', 'checkout'],
			tags: ['spot_search', 'trade_party', 'trade_party', 'spot_search', 'trade_party'],
		},
		{
			question : 'What is the process of shipment booking?',
			topics   : ['discover_rates', 'shipment', 'checkout'],
			tags     : ['spot_search', 'trade_party'],
		},
		{
			question : 'What are Incoterms?',
			topics   : ['discover_rates', 'shipment', 'checkout'],
			tags     : ['spot_search', 'trade_party'],
		},
		{
			question : 'How long will it take to receive B/L after payment?',
			topics   : ['discover_rates', 'shipment', 'checkout'],
			tags     : ['spot_search', 'trade_party'],
		},
		{
			question : 'How long will it take to receive B/L after payment?',
			topics   : ['discover_rates', 'shipment', 'checkout'],
			tags     : ['spot_search', 'trade_party'],
		},
		{
			question : 'When will I receive Booking Note?',
			topics   : ['discover_rates', 'shipment', 'checkout'],
			tags     : ['spot_search', 'trade_party'],
		},
	];
	const [activeTab, setActiveTab] = useState('');
	return (

		<div className={styles.gridcontainer}>

			<div style={{ margin: 20 }}>
				<Tabs
					activeTab={activeTab}
					themeType="primary-vertical"
					onChange={setActiveTab}
				>
					{topics?.map((singleOption) => (
						<TabPanel name={singleOption} title={singleOption}>
							{/* <div>This is local search</div> */}
						</TabPanel>

					))}

				</Tabs>
			</div>

			<div><QuestionsList Tabtitle={Tab.Tabtitle} /></div>

		</div>
	);
}

export default TopicList;
