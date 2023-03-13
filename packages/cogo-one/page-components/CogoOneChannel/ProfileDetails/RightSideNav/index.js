import { Tooltip, cl } from '@cogoport/components';
import { isEmpty, snakeCase } from '@cogoport/utils';

import useUpdateOmnichannelDocuments from '../../../../hooks/useUpdateOmnichannelDocuments';
import FormatData from '../../../../utils/formatData';

import IconMapping from './IconMapping';
import styles from './styles.module.css';

function RightSideNav({
	activeSelect,
	setActiveSelect,
	openNewTab,
	loading,
	disableQuickActions = false,
	data = {},
	documentCount = () => {},
	listIds = [],
	activeMessageCard,
	activeVoiceCard,
	activeTab,
}) {
	const { count } = data || {};
	const handleClick = (val) => {
		if (val === 'spot_search') {
			if (!loading) {
				openNewTab({ crm: 'searches', prm: 'searches' });
			}
		} else {
			setActiveSelect(val);
		}
	};
	const { documentCountUpdates = () => {} } = useUpdateOmnichannelDocuments({ documentCount });
	const disabledSpotSearch = loading || disableQuickActions;

	const { userId = '', userMobile = '', leadUserId = '' } = FormatData({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
	});

	const checkConditions = isEmpty(userId) && isEmpty(userMobile) && isEmpty(leadUserId);

	const handleUpdates = () => {
		documentCountUpdates({ listIds });
	};

	return (
		<div className={styles.right_container}>
			{IconMapping.map((item) => {
				const { icon, name, content } = item;
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
							{(name === 'documents' && count > 0 && !checkConditions) && (
								<div className={styles.count}>
									{count > 100 ? '99+' : (
										count
									)}
								</div>
							)}
							<div
								role="presentation"
								onClick={() => {
									if (name === 'documents' && !isEmpty(listIds)) {
										handleUpdates();
									}
								}}
							>
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
