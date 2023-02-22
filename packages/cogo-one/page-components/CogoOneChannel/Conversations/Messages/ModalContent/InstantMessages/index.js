import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import InstantReplies from './InstantReplies';
import styles from './styles.module.css';
import Templates from './Templates';

function InstantRepliesModal({ data = {} }) {
	const [activeTab, setActiveTab] = useState('quick_reply');
	const [openCreateReply, setOpenCreateReply] = useState(false);

	const { channel_type = '' } = data || {};

	return (
		<div className={styles.container}>
			<Tabs
				// tabIcon={<IcMProfile />}
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
				{channel_type === 'whatsapp' && (
					<TabPanel name="template" title="Template">
						<Templates
							data={data}
							activeTab={activeTab}
							openCreateReply={openCreateReply}
							setOpenCreateReply={setOpenCreateReply}
							setActiveTab={setActiveTab}
						/>
					</TabPanel>
				)}
			</Tabs>

		</div>
	);
}
export default InstantRepliesModal;
