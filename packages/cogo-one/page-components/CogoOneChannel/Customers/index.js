import { Tabs, TabPanel, Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React, { useState } from 'react';

import getTabMappings from '../../../configurations/getTabMappings';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../constants/viewTypeMapping';
import useGetUnreadMessagesCount from '../../../hooks/useGetUnreadMessagesCount';

import AgentStatus from './AgentStatus';
import CommunicationModals from './CommunicationModals';
import MailList from './MailList';
import MessageList from './MessageList';
import styles from './styles.module.css';
import VoiceList from './VoiceList';

const COMPONENT_MAPPING = {
	message : MessageList,
	voice   : VoiceList,
	mail    : MailList,
};

function Customers({
	setActiveTab,
	activeTab,
	userId = '',
	setModalType = () => {},
	modalType = {},
	tagOptions = [],
	mailProps = {},
	firestore,
	viewType = '',
}) {
	const [isBotSession, setIsBotSession] = useState(false);

	const { unReadChatsCount } = useGetUnreadMessagesCount({
		firestore,
		viewType,
		agentId: userId,
		isBotSession,
	});

	const componentPropsMapping = {
		message: {
			userId,
			firestore,
			viewType,
			isBotSession,
			setIsBotSession,
			tagOptions,
		},
		voice: {
			setActiveVoiceCard: (val) => {
				setActiveTab((prev) => ({ ...prev, data: val }));
			},
			activeVoiceCard : activeTab?.data || {},
			activeTab       : activeTab?.tab,
		},
		mail: {
			...mailProps,
		},
	};

	const tabMappings = getTabMappings({ unReadChatsCount });

	const Component = COMPONENT_MAPPING[activeTab?.tab] || null;

	return (
		<div className={styles.container}>
			<div className={styles.filters_container}>
				<div className={styles.logo}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.cogo_one_logo}
						alt="cogo_one_logo"
						width={25}
						height={25}
					/>
					<div className={styles.title}>
						CogoOne
					</div>
				</div>

				{VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions.toggle_self_status && (
					<div className={styles.styled_toggle}>
						<AgentStatus />
					</div>
				)}

				{VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions.bot_message_toggle && (
					<div className={styles.bot_messages}>
						<div>Bot Messages</div>
						<Toggle
							name="online"
							size="sm"
							onChange={() => setIsBotSession((prev) => !prev)}
							checked={isBotSession}
						/>
					</div>
				)}
			</div>

			<div className={styles.tabs}>
				<Tabs
					activeTab={activeTab?.tab}
					fullWidth
					themeType="secondary"
					onChange={(val) => {
						setActiveTab({ tab: val, data: {} });
					}}
				>
					{tabMappings.map((eachTab) => {
						if (!eachTab.show) {
							return null;
						}

						return (
							<TabPanel
								key={eachTab?.value}
								name={eachTab?.value}
								title={eachTab?.label}
								badge={eachTab?.badge || null}
							/>
						);
					})}
				</Tabs>
			</div>

			{Component && (
				<Component
					key={activeTab?.tab}
					{...(componentPropsMapping[activeTab?.tab] || {})}
					setActiveTab={setActiveTab}
					activeTab={activeTab}
				/>
			)}

			<CommunicationModals
				mailProps={mailProps}
				setModalType={setModalType}
				modalType={modalType}
				userId={userId}
			/>
		</div>
	);
}

export default Customers;
