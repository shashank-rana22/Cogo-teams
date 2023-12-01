import { cl } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';

import { BUTTON_MAPPING, BUTTON_KEYS_MAPPING } from '../../../../constants/mailConstants';

import DraftMailStatus from './draftMailStatus';
import styles from './styles.module.css';

function RightButtonsMapping({
	isDraft = false,
	handleClick = () => {},
	emailStatus = '',
	isDraftAlreadySent = false,
	loading = false,
	isMobile = false,
	eachMessage = {},
	showSync = false,
	syncRpaEmail = () => {},
}) {
	const buttonKeys = BUTTON_KEYS_MAPPING[isDraft ? 'draft' : 'mail'] || [];

	const {
		outlook_draft = false,
	} = eachMessage || {};

	if (outlook_draft) {
		return (
			<div
				role="presentation"
				className={cl`${styles.sync_icon} ${(showSync || isMobile) ? styles.mobile_sync_icon : ''}`}
				style={{ cursor: (loading) ? 'not-allowed' : 'pointer' }}
				onClick={(e) => {
					e.stopPropagation();
					syncRpaEmail();
				}}
			>
				<IcMRefresh
					width={18}
					height={18}
				/>
				{(isMobile || showSync) ? ' Sync' : ''}
			</div>
		);
	}

	if (!isDraftAlreadySent || !isDraft) {
		return BUTTON_MAPPING.map(
			(item) => {
				const { key = '', icon = '', buttonName = '' } = item || {};

				if (
					!icon || !buttonKeys.includes(key)
				) {
					return null;
				}

				return (
					<div
						role="presentation"
						key={key}
						className={styles.icon_styles}
						style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
						onClick={(e) => {
							handleClick({ buttonType: key });
							e.stopPropagation();
						}}
					>
						{icon}
						{isMobile ? ` ${buttonName}` : ''}
					</div>
				);
			},
		);
	}

	return (
		<DraftMailStatus
			emailStatus={emailStatus}
			handleClick={handleClick}
			isDraftAlreadySent={isDraftAlreadySent}
		/>
	);
}

export default RightButtonsMapping;
