/* eslint-disable max-lines-per-function */
import { cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

import { firebaseConfig } from '../../configurations/firebase-config';
import {
	ENABLE_EXPAND_SIDE_BAR, ENABLE_SIDE_BAR,
} from '../../constants';
import { getInitialData } from '../../helpers/getInitialData';
import useAgentWorkPrefernce from '../../hooks/useAgentWorkPreference';
import useGetIsMobile from '../../hooks/useGetIsMobile';
import useListCogooneGroupMembers from '../../hooks/useListCogooneGroupMembers';

import Calender from './Calendar';
import Conversations from './Conversations';
import Customers from './Customers';
import EmptyChatPage from './EmptyChatPage';
import styles from './styles.module.css';

function CogoOne() {
	const { query: { assigned_chat = '', channel_type = '' } } = useRouter();

	const [activeTab, setActiveTab] = useState(getInitialData({ assigned_chat, channel_type }));
	const [viewType, setViewType] = useState('');
	const [modalType, setModalType] = useState({ type: null, data: {} });
	const [selectedAutoAssign, setSelectedAutoAssign] = useState({});
	const {
		viewType: initialViewType = '',
	} = useAgentWorkPrefernce();

	const { isMobile = false } = useGetIsMobile();
	const { group_id = '' } = activeTab?.data || {};

	const {
		listCogooneGroupMembers = () => {},
		membersList = [],
	} = useListCogooneGroupMembers({ globalGroupId: group_id });

	const app = isEmpty(getApps()) ? initializeApp(firebaseConfig) : getApp();
	const firestore = getFirestore(app);

	const commonProps = {
		setActiveTab,
		selectedAutoAssign,
		queryAssignedChat: assigned_chat,
		isMobile,
		setSelectedAutoAssign,
		viewType,
	};

	const teamsSideBarCheck = (activeTab?.tab === 'teams' && (!!activeTab?.data?.id || !!activeTab?.data?.group_id));
	const expandedSideBar = (ENABLE_SIDE_BAR.includes(activeTab?.data?.channel_type)
		|| ((ENABLE_EXPAND_SIDE_BAR.includes(
			activeTab?.data?.channel_type,
		) || teamsSideBarCheck) && activeTab?.expandSideBar));
	const collapsedSideBar = (ENABLE_EXPAND_SIDE_BAR.includes(activeTab?.data?.channel_type) || teamsSideBarCheck)
								&& !activeTab?.expandSideBar;

	useEffect(() => setViewType(initialViewType), [initialViewType]);
	console.log(activeTab?.showSidebar, 'Send Bulk Templates');

	return (
		<>
			<div className={styles.layout_container}>
				<div
					style={(!isMobile || isEmpty(activeTab?.data)) ? {} : { display: 'none' }}
					className={isMobile ? styles.mobile_customer_layout : styles.customers_layout}
				>
					<Customers
						activeTab={activeTab}
						setModalType={setModalType}
						modalType={modalType}
						firestore={firestore}
						{...commonProps}
					/>
				</div>
				{isEmpty(activeTab?.data)
					? (
						<div
							className={styles.empty_page}
						>
							<EmptyChatPage
								activeTab={activeTab}
							/>
						</div>
					) : null}
				{isEmpty(activeTab?.data) ? null : (
					<div
						style={(!isMobile || !activeTab?.expandSideBar) ? {} : { display: 'none' }}
						className={cl`${styles.chat_body} ${expandedSideBar ? styles.chats_layout : ''} 
									${collapsedSideBar ? styles.mail_layout : ''} 
								${!expandedSideBar && !collapsedSideBar ? styles.nosidebar_layout : ''}
								${isMobile ? styles.mobile_nosidebar_layout : ''}`}
					>
						<Conversations
							activeTab={activeTab}
							firestore={firestore}
							listCogooneGroupMembers={listCogooneGroupMembers}
							membersList={membersList}
							{...commonProps}
						/>
					</div>
				)}
			</div>
			{!isMobile ? <Calender firestore={firestore} /> : null}
		</>
	);
}

export default CogoOne;
