import { Card, Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { React, useState } from 'react';

import useGetFaqTopic from '../../hooks/useGetFaqTopic';
import QuestionsList from '../QuestionsList';

import styles from './styles.module.css';

const topics = [
	{
		Title       : 'Discover_rates',
		description : 'How long will it take to receive B/L after payment?',
	},
	{
		Title       : 'Shipment',
		description : 'How long will it take to receive B/L after payment? ',
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

function TopicList({ TabTitle }) {
	const { fetchFaqTopic = () => {} } = useGetFaqTopic();

	const [activeTab, setActiveTab] = useState('');
	const COUNT = 0;
	const truncate = (input) => (input?.length > 30 ? `${input.substring(0, 25)}...` : input);

	return (
		<div className={styles.gridContainer}>
			<div style={{ margin: '5px 0', width: '100%', height: '10px' }}>
				<Tabs
					activeTab={activeTab}
					themeType="primary-vertical"
					onChange={setActiveTab}
					className={styles.scrollable}
				>
					{(topics || []).map((singleOption) => (
						<TabPanel
							name={singleOption.Title}
							title={(
								<div>
									<div className={styles.title}>
										{startCase(singleOption.Title)}
										:
									</div>

									<div className={styles.subtitle}>
										{singleOption.description}
									</div>
								</div>
							)}
						>
							{/* <div>This is local search</div> */}
						</TabPanel>
					))}
				</Tabs>
			</div>

			<div><QuestionsList TabTitle={TabTitle} /></div>
		</div>
	);
}

export default TopicList;
