import { Toast, Input } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { IcMSearchlight, IcMCross, IcMArrowLeft } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({
	activeTab = 'faq',
	search = '',
	setSearch = () => {},
	announcementHeaderProps = {},
	topic = '',
	setTopic = () => {},
	question,
	setQuestion,
	showHistory,
	setShowHistory = () => {},
	setShowNotificationContent = () => {},
	showNotificationContent,
	refetch,
	from,
}) {
	const {
		searchAnnouncement = '',
		setSearchAnnouncement = () => {},
	} = announcementHeaderProps;

	const suffix = !search && !searchAnnouncement ? (
		<IcMSearchlight />
	) : (
		<IcMCross
			onClick={() => { setSearch(''); setQuestion(null); setSearchAnnouncement(''); }}
			style={{ cursor: 'pointer', color: '#000000' }}
		/>
	);

	const onClickBackButton = async () => {
		if (question && topic) {
			setQuestion(null);
		} else if (question && !topic) {
			setQuestion(null);
			try {
				const res = await refetch();
				if (isEmpty(res?.data?.notification_details || [])) {
					setShowNotificationContent(false);
				}
			} catch (e) {
				if (e?.response) {
					Toast.error(getApiErrorString(e?.response?.data));
				}
			}
		} else {
			setTopic(null);
			setQuestion(null);
			setShowHistory(false);
			setShowNotificationContent(false);
		}
	};

	const showBackIcon = (!search && topic) || question || showHistory || showNotificationContent;

	const TABS_CONTENT_MAPPING = {
		faq: {
			back_icon_visible : true,
			placeholder       : 'Search for a question or a topic',
			input_value       : search,
			input_onchange    : setSearch,
		},
		announcements: {
			back_icon_visible : false,
			placeholder       : 'Search for an announcement',
			input_value       : searchAnnouncement,
			input_onchange    : setSearchAnnouncement,
		},
	};

	return (

		<div className={`${styles.container} ${styles[from]}`}>

			<div className={styles.wrapper}>
				{from !== 'test_module' ? (
					<div className={styles.heading_container}>
						{showBackIcon && TABS_CONTENT_MAPPING[activeTab].back_icon_visible ? (
							<div role="presentation" className={styles.arrow} onClick={onClickBackButton}>
								<IcMArrowLeft style={{ height: '25px', width: '25px' }} />
							</div>
						) : (
							<div className={styles.gap} />
						)}
						<div className={styles.title}>Cogo Assist</div>
					</div>
				) : null}

				<div className={`${styles.input_container} ${styles[from]}`}>
					<Input
						className="primary lg"
						placeholder={TABS_CONTENT_MAPPING[activeTab].placeholder}
						value={TABS_CONTENT_MAPPING[activeTab].input_value}
						onChange={(e) => {
							const searchFn = TABS_CONTENT_MAPPING[activeTab].input_onchange;
							searchFn(e);
							setQuestion(null);
						}}
						suffix={suffix}
						style={{ padding: '0 10px' }}
					/>
				</div>
			</div>
		</div>
	);
}

export default Header;
