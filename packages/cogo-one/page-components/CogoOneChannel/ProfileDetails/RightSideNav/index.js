import { cl } from '@cogoport/components';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import getFormatData from '../../../../utils/getFormatData';
import getIconMapping from '../../../../utils/getIconMapping';

import SearchSpotModal from './SearchSpotModal';
import styles from './styles.module.css';

const MAX_DISPLAY_COUNT = 100;

function RightSideNav({
	activeSelect = '',
	setActiveSelect = () => {},
	openNewTab = () => {},
	loading = false,
	disableQuickActions = false,
	documentsCount = 0,
	activeMessageCard = {},
	activeVoiceCard = {},
	activeTab = '',
	quotationEmailSentAt = '',
	orgId = '',
	viewType = '',
	formattedMessageData = {},
	expandSideBar = false,
	setActiveTab = () => {},
	isMobile = false,
}) {
	const { profileData } = useSelector(({ profile }) => ({
		profileData: profile,
	}));
	const dispatch = useDispatch();

	const [searchSpotModal, setSearchSpotmodal] = useState(false);

	const disabledSpotSearch = loading || disableQuickActions;

	const { userId = '', userMobile = '', leadUserId = '' } = getFormatData({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
	});

	const checkConditions = isEmpty(userId) && isEmpty(userMobile) && isEmpty(leadUserId);

	const ICON_MAPPING = getIconMapping({
		viewType,
		expandSideBar,
		channelType : formattedMessageData?.channel_type,
		isTeams     : activeTab === 'teams',
		isMobile,
	}) || [];

	const check = () => {
		dispatch(
			setProfileState({
				...profileData,
				showFaq: true,
			}),
		);
	};

	const handleClick = (val) => {
		if (val === 'spot_search') {
			if (loading) {
				return;
			}

			if (!orgId) {
				setSearchSpotmodal(true);
				return;
			}

			openNewTab({ crm: 'searches', prm: 'searches' });
		} else if (val === 'user_chat') {
			setActiveTab((prev) => ({
				...prev,
				showSidebar   : false,
				expandSideBar : false,
			}));
		} else if (val === 'help_desk') {
			check();
		} else if (val === 'sidebar_control') {
			setActiveTab((prev) => {
				setActiveSelect(!prev?.expandSideBar ? 'profile' : '');

				return {
					...prev,
					expandSideBar : !prev?.expandSideBar,
					showSidebar   : !prev?.showSidebar,
				};
			});
		} else if (activeTab === 'teams') {
			setActiveSelect((prev) => (((prev === val) && expandSideBar) ? '' : val));
			setActiveTab((prev) => ({
				...prev,
				expandSideBar: !prev?.expandSideBar,
			}));
		} else {
			setActiveSelect(val);
		}
	};

	return (
		<>
			<div className={styles.right_container}>
				{ICON_MAPPING.map((item) => {
					const { icon, name, content } = item || {};

					const showDocumentCount = activeSelect !== 'documents' && name === 'documents'
				&& !!documentsCount && !checkConditions;

					const showQuotationSentData = orgId && activeSelect !== 'organization'
				&& name === 'organization' && !!quotationEmailSentAt;

					return (
						<div
							key={name}
							className={cl`${styles.icon_div} ${
								activeSelect === name ? styles.active : ''
							}
						 ${
							(disabledSpotSearch && item.name === 'spot_search')
								? styles.icon_div_load
								: ''
							}`}
							role="presentation"
							onClick={() => handleClick(name)}
						>
							{showDocumentCount && (
								<div className={styles.count}>
									{documentsCount > MAX_DISPLAY_COUNT ? '99+' : (
										documentsCount
									)}
								</div>
							)}
							{showQuotationSentData && (
								<div className={styles.quotation} />
							)}
							<div title={content}>
								{icon || null}
							</div>
						</div>
					);
				})}
			</div>
			{!orgId ? (
				<SearchSpotModal
					searchSpotModal={searchSpotModal}
					setSearchSpotmodal={setSearchSpotmodal}
					openNewTab={openNewTab}
					loading={loading}
					formattedMessageData={formattedMessageData}
				/>
			) : null}
		</>
	);
}

export default RightSideNav;
