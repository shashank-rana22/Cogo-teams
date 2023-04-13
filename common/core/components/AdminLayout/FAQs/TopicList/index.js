import { Tabs, TabPanel } from '@cogoport/components';
import React, { useEffect, useState } from 'react';

import Announcements from '../../Announcements';
import QuestionListComponent from '../../QuestionListComponent';
import Header from '../QuestionList/Header';

import styles from './styles.module.css';
import useTopicList from './useTopicList';

function TopicList({
	faqNotificationApiLoading = false,
	fetchFaqNotification = () => {},
	faqNotificationData = {},
	refetch = () => {},
	from = 'cogo_assist',
	setShow = () => {},
	announcementProps = {},
	selectedAnnouncement = '',

}) {
	const [activeTab, setActiveTab] = useState('faq');

	const {
		search,
		setSearch,
		list,
		loading,
		paginationData,
		page,
		setPage,
		topic,
		setTopic,
		question,
		setQuestion,
		showHistory,
		setShowHistory,
		showNotificationContent,
		setShowNotificationContent,
	} = useTopicList();

	const {
		announcementModalData = {},
		setAnnouncementModalData = () => {},
		searchAnnouncement = '',
		setSearchAnnouncement = () => {},
		setParams = () => {},
	} = announcementProps;

	const announcementHeaderProps = {
		announcementModalData,
		setAnnouncementModalData,
		setShow,
		searchAnnouncement,
		setSearchAnnouncement,
	};

	useEffect(() => {
		fetchFaqNotification();
	}, [fetchFaqNotification, showNotificationContent]);

	useEffect(() => {
		if (from === 'test_module') return;
		setAnnouncementModalData({});
		setSearch('');
		setSearchAnnouncement('');
		if (activeTab === 'faq') {
			setParams({
				page    : 1,
				filters : {
					q                 : '',
					toggle            : false,
					announcement_type : '',
				},
			});
		}
	}, [activeTab, from, setAnnouncementModalData, setParams, setSearch, setSearchAnnouncement]);

	const TABS_MAPPING = [
		{
			name      : 'faq',
			title     : 'FAQs',
			component : QuestionListComponent,
			props     : {
				question,
				setQuestion,
				loading,
				search,
				faqNotificationApiLoading,
				paginationData,
				page,
				setPage,
				list,
				faqNotificationData,
				topic,
				setTopic,
				showHistory,
				setSearch,
				fetchFaqNotification,
				showNotificationContent,
				setShowNotificationContent,
				setShowHistory,
			},
		},
		{
			name      : 'announcements',
			title     : 'Announcements',
			component : Announcements,
			props     : {
				announcementProps,
				selectedAnnouncement,
			},
		},
	];

	return (
		<div className={`${styles.container} ${(showHistory || from === 'test_module') && styles.hide_tabs}`}>
			<Header
				activeTab={activeTab}
				search={search}
				setSearch={setSearch}
				announcementHeaderProps={announcementHeaderProps}
				topic={topic}
				setTopic={setTopic}
				question={question}
				showHistory={showHistory}
				setQuestion={setQuestion}
				setShowHistory={setShowHistory}
				setShowNotificationContent={setShowNotificationContent}
				showNotificationContent={showNotificationContent}
				fetchFaqNotification={fetchFaqNotification}
				refetch={refetch}
				from={from}
			/>

			<Tabs
				activeTab={activeTab}
				onChange={setActiveTab}
				fullWidth
				className={styles.tab_hide}
				themeType="main_tabs"
			>
				{TABS_MAPPING.map((tabItem) => {
					const { name, title, component: Component, props } = tabItem;

					return (
						<TabPanel key={name} name={name} title={title}>
							<Component {...props} />
						</TabPanel>
					);
				})}
			</Tabs>
		</div>
	);
}

export default TopicList;
