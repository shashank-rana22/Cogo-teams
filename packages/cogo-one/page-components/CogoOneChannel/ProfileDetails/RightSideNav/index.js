import { Tooltip, cl } from '@cogoport/components';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty, snakeCase } from '@cogoport/utils';

import FormatData from '../../../../utils/formatData';
import getIconMapping from '../../../../utils/getIconMapping';

import styles from './styles.module.css';

const MAX_DISPLAY_COUNT = 100;

function RightSideNav({
	activeSelect,
	setActiveSelect,
	openNewTab,
	loading,
	disableQuickActions = false,
	documentsCount = 0,
	activeMessageCard,
	activeVoiceCard,
	activeTab,
	quotationEmailSentAt = '',
	orgId = '',
	viewType,
}) {
	const dispatch = useDispatch();
	const { profileData } = useSelector(({ profile }) => ({
		profileData: profile,
	}));

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
			if (!loading) {
				openNewTab({ crm: 'searches', prm: 'searches' });
			}
		} else if (val === 'help_desk') {
			check();
		} else {
			setActiveSelect(val);
		}
	};

	const disabledSpotSearch = loading || disableQuickActions;

	const { userId = '', userMobile = '', leadUserId = '' } = FormatData({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
	});

	const checkConditions = isEmpty(userId) && isEmpty(userMobile) && isEmpty(leadUserId);

	const ICON_MAPPING = getIconMapping(viewType) || [];

	return (
		<div className={styles.right_container}>
			{ICON_MAPPING.map((item) => {
				const { icon, name, content } = item;

				const showDocumentCount = activeSelect !== 'documents' && name === 'documents'
				&& !!documentsCount && !checkConditions;

				const showquotationSentData = orgId && activeSelect !== 'organization'
				&& name === 'organization' && !!quotationEmailSentAt;

				return (
					<div
						key={snakeCase(name)}
						className={cl`${styles.icon_div} ${
							activeSelect === name ? styles.active : ''
						}
						 ${
							disabledSpotSearch && item.name === 'spot_search'
								? styles.icon_div_load
								: ''
						}`}
						role="button"
						tabIndex={0}
						onClick={() => handleClick(name)}
					>
						<Tooltip content={content} placement="left">
							{showDocumentCount && (
								<div className={styles.count}>
									{documentsCount > MAX_DISPLAY_COUNT ? '99+' : (
										documentsCount
									)}
								</div>
							)}
							{showquotationSentData && (
								<div className={styles.quotation} />
							)}
							<div>
								{icon && icon}
							</div>
						</Tooltip>
					</div>
				);
			})}
		</div>
	);
}

export default RightSideNav;
