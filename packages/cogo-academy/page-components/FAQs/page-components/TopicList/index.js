import { Card, Tabs, TabPanel } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { React, useState } from 'react';

import useListFaqTopic from '../../hooks/useListFaqTopic';
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

function TopicList({ tabTitle }) {
	const {
		refetchTopic = () => {},
		data,
		loading = false,
		activeTab,
		setActiveTab,
	} = useListFaqTopic();

	return (
		<div className={styles.gridContainer}>
			<div style={{ margin: '5px 0', width: '100%', height: '490px' }} className={styles.scrollable}>
				<Tabs
					activeTab={activeTab}
					themeType="primary-vertical"
					onChange={setActiveTab}

				>
					{(data?.list || []).map((singleOption) => (
						<TabPanel
							name={singleOption?.name}
							title={(
								<div>
									<div className={styles.title}>
										{startCase(singleOption?.name)}
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

			<div>{activeTab ? <QuestionsList tabTitle={activeTab} /> : <QuestionsList tabTitle={tabTitle} />}</div>
		</div>
	);
}

export default TopicList;
