import { TabPanel, Tabs } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select/components';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState, useEffect } from 'react';

import FeedbacksReceived from './components/PrimaryTabs/FeedbacksReceived';
import RequestsSent from './components/PrimaryTabs/RequestsSent';
import styles from './styles.module.css';

const TAB_PANEL_MAPPING = {
	feedbacks_received: {
		name      : 'feedbacks_received',
		title     : 'Feedbacks Received',
		Component : FeedbacksReceived,
	},
	relations: {
		name      : 'requests_sent',
		title     : 'Requests Sent',
		Component : RequestsSent,
	},
};

function CrmFeedback() {
	const { profile } = useSelector((state) => state);

	const dispatch = useDispatch();

	const [activeTab, setActiveTab] = useState('feedbacks_received');

	useEffect(() => {
		if (activeTab !== 'feedbacks_received') {
			dispatch(
				setProfileState({
					...profile,
					authParams: undefined,
				}),
			);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab, dispatch]);

	return (
		<>
			<section className={styles.header_container}>
				<div className={styles.title}>CRM Feedback Dashboard</div>

				{activeTab === 'feedbacks_received' ? <ScopeSelect size="md" showChooseAgent={false} /> : null}
			</section>

			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					{Object.values(TAB_PANEL_MAPPING).map((item) => {
						const { name = '', title = '', Component } = item;

						if (!Component) return null;

						return (
							<TabPanel key={name} name={name} title={title}>
								<Component activeTab={activeTab} setActiveTab={setActiveTab} />
							</TabPanel>
						);
					})}
				</Tabs>
			</div>
		</>
	);
}

export default CrmFeedback;
