import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Templates from '../../../../../../common/Templates';

import InstantReplies from './InstantReplies';
import styles from './styles.module.css';

function InstantRepliesModal({ data = {}, viewType = '' }) {
	const [activeTab, setActiveTab] = useState('quick_reply');
	const [openCreateReply, setOpenCreateReply] = useState(false);

	const { channel_type = '' } = data || {};

	if (channel_type !== 'whatsapp') {
		return (
			<div className={styles.container}>
				<InstantReplies
					data={data}
					activeTab={activeTab}
					openCreateReply={openCreateReply}
					setOpenCreateReply={setOpenCreateReply}
					setActiveTab={setActiveTab}
				/>
			</div>

		);
	}

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={(val) => {
					setActiveTab(val);
					setOpenCreateReply(false);
				}}
				size="sm"
			>
				<TabPanel name="quick_reply" title="Quick Reply">
					<InstantReplies
						data={data}
						activeTab={activeTab}
						openCreateReply={openCreateReply}
						setOpenCreateReply={setOpenCreateReply}
						setActiveTab={setActiveTab}
					/>
				</TabPanel>
				<TabPanel name="template" title="Template">
					<Templates
						viewType={viewType}
						data={data}
						activeTab={activeTab}
						openCreateReply={openCreateReply}
						setOpenCreateReply={setOpenCreateReply}
					/>
				</TabPanel>
			</Tabs>
		</div>
	);
}
export default InstantRepliesModal;
