import { TabPanel, Tabs } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select/components';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState, useEffect } from 'react';

import FeedbacksReceived from './components/PrimaryTabs/FeedbacksReceived';
import RequestsSent from './components/PrimaryTabs/RequestsSent';
import styles from './styles.module.css';

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
					<TabPanel name="feedbacks_received" title="Feedbacks Received">
						<FeedbacksReceived activeTab={activeTab} setActiveTab={setActiveTab} />
					</TabPanel>

					<TabPanel name="requests_sent" title="Requests Sent">
						<RequestsSent activeTab={activeTab} />
					</TabPanel>
				</Tabs>
			</div>
		</>
	);
}

export default CrmFeedback;
