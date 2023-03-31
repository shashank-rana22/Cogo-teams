import { Tooltip, cl } from '@cogoport/components';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty, snakeCase } from '@cogoport/utils';

import FormatData from '../../../../utils/formatData';

import IconMapping from './IconMapping';
import styles from './styles.module.css';

function RightSideNav({
	activeSelect,
	setActiveSelect,
	openNewTab,
	loading,
	disableQuickActions = false,
	documents_count = {},
	activeMessageCard,
	activeVoiceCard,
	activeTab,
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

	return (
		<div className={styles.right_container}>
			{IconMapping.map((item) => {
				const { icon, name, content } = item;

				const showDocumentCount = activeSelect !== 'documents' && name === 'documents'
				&& documents_count > 0 && !checkConditions;

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
						role="presentation"
						onClick={() => handleClick(name)}
					>
						<Tooltip content={content} placement="left">
							{showDocumentCount && (
								<div className={styles.count}>
									{documents_count > 100 ? '99+' : (
										documents_count
									)}
								</div>
							)}
							<div>
								{icon}
							</div>
						</Tooltip>
					</div>
				);
			})}
		</div>
	);
}

export default RightSideNav;
