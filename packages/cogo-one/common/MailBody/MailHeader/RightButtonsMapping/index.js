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
}) {
	const buttonKeys = BUTTON_KEYS_MAPPING[isDraft ? 'draft' : 'mail'] || [];

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
