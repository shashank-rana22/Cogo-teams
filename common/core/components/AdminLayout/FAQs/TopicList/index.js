import { Pagination, Tooltip, Tabs, TabPanel } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import Announcements from '../../Announcements';
import History from '../History';
import QuestionList from '../QuestionList';
import Header from '../QuestionList/Header';

import HeaderText from './Header';
import IconMapping from './iconMapping';
import Loader from './Loader';
import NotificationBar from './NotificationBar';
import styles from './styles.module.css';
import useTopicList from './useTopicList';

const generalIcon = (
	<img
		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/General.svg"
		alt="logo cogoport"
		className={styles.general_icon}
	/>
);

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

	const render = () => {
		if (topic) {
			return (
				<QuestionList
					question={question}
					setQuestion={setQuestion}
					topic={topic}
					setTopic={setTopic}
				/>
			);
		}

		if (showHistory) {
			return (
				<History
					question={question}
					setQuestion={setQuestion}
					setShowHistory={setShowHistory}
					setSearch={setSearch}
				/>
			);
		}

		const renderIcon = ({ item }) => {
			const { name = '' } = item || {};

			let includesKey = '';
			Object.keys(IconMapping).forEach((key) => {
				if (name.includes(key)) {
					includesKey = key;
				}
			});

			const DisplayIcon = IconMapping[includesKey]?.icon || generalIcon;

			return <div className={styles.icon}>{DisplayIcon}</div>;
		};

		return (
			<div className={styles.container}>
				<NotificationBar
					faqNotificationData={faqNotificationData}
					question={question}
					setQuestion={setQuestion}
					showNotificationContent={showNotificationContent}
					setShowNotificationContent={setShowNotificationContent}
					faqNotificationApiLoading={faqNotificationApiLoading}
					fetchFaqNotification={fetchFaqNotification}
				/>

				{
					!showNotificationContent
					&& (
						<div>

							<div>
								<HeaderText setShowHistory={setShowHistory} />
							</div>

							<div className={styles.display_topics}>
								{(list || []).map((item) => (
									<div
										role="presentation"
										onClick={() => setTopic(item)}
										className={styles.square_div}
									>
										<div className={styles.icon_grid}>
											{renderIcon({ item })}

											<div className={styles.display_name_and_topic}>
												<Tooltip
													theme="light"
													content={startCase(item?.display_name)}
													placement="bottom"
													animation="shift-away"
												>
													<div className={styles.display_name}>
														{startCase(item?.display_name)}
													</div>
												</Tooltip>
												<div className={styles.question_count}>
													{item?.question_count}
													{' '}
													Questions
												</div>
											</div>
										</div>
									</div>
								))}
							</div>

							{paginationData?.total_count > 20
							&& (
								<div className={styles.pagination_container}>
									<Pagination
										totalItems={paginationData?.total_count || 0}
										currentPage={page || 1}
										pageSize={paginationData?.page_limit}
										onPageChange={setPage}
									/>
								</div>
							)}
						</div>
					)

				}
			</div>

		);
	};

	const renderQuestionList = () => {
		if (search) {
			return (
				<QuestionList
					search={search}
					question={question}
					setQuestion={setQuestion}
				/>
			);
		}

		if (loading) return <Loader />;

		return render();
	};

	const TABS_MAPPING = [
		{
			name      : 'faq',
			title     : 'FAQs',
			component : renderQuestionList,
			props     : {},
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
		<div className={styles.container}>
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

			{showHistory || from === 'test_module' ? (
				renderQuestionList()
			) : (
				<Tabs
					activeTab={activeTab}
					onChange={setActiveTab}
					fullWidth
					themeType="primary"
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
			)}
		</div>
	);
}

export default TopicList;
