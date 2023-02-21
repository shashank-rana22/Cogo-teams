import { Card, Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { React, useState } from 'react';

import QuestionsList from '../QuestionsList';

import styles from './styles.module.css';

function TopicList(Tab) {
	const topics = [
		{
			Title       : 'Discover_rates',
			description : 'How long will it take to receive B/L after payment?',
		},
		{
			Title       : 'Shipment',
			description : 'How long will it take to receive B/L after payment?',
		},
		{
			Title       : 'Checkout',
			description : 'How long will it take to receive B/L after payment?',
		},
		{
			Title       : 'Spot_search',
			description : 'How long will it take to receive B/L after payment?',
		},
		{
			Title       : 'Third_party',
			description : 'How long will it take to receive B/L after payment?',
		},
		{
			Title       : 'Discover',
			description : 'How long will it take to receive B/L after payment?',
		},

		{
			Title       : 'Prices',
			description : 'How long will it take to receive B/L after payment?',
		},
		{
			Title       : 'Location',
			description : 'How long will it take to receive B/L after payment?',
		},
		{
			Title       : 'Local_rates',
			description : 'How long will it take to receive B/L after payment?',
		},
		{
			Title       : 'AirLines',
			description : 'How long will it take to receive B/L after payment?',
		},
		{
			Title       : 'OnBoarding',
			description : 'How long will it take to receive B/L after payment?',
		},
	];

	const [activeTab, setActiveTab] = useState('');
	let COUNT = 0;
	const truncate = (input) => (input?.length > 30 ? `${input.substring(0, 25)}...` : input);
	return (

		<div className={styles.gridcontainer}>

			<div style={{ margin: 5 }}>
				<Tabs
					activeTab={activeTab}
					themeType="primary-vertical"
					onChange={setActiveTab}
				>
					{topics?.map((singleOption) => (

						<TabPanel
							name={singleOption.Title}
							title={(
								<div>
									<div className={styles.subtitle}>
										Topic:
										{++COUNT}

									</div>
									<b>
										{singleOption.Title}
										:
										{' '}
									</b>
									{' '}

									{/* <p className={styles.subtitle}>{truncate(singleOption.description)}</p> */}

								</div>
							)}
						>
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
