import { IcMRefresh, IcMAppDelete, IcMFtick, IcMTimer } from '@cogoport/icons-react';

import { BUTTON_MAPPING, BUTTON_KEYS_MAPPING } from '../../../../constants/mailConstants';

import styles from './styles.module.css';

const SUCCESS_MESSAGE = 'Draft delivered successfully';

const FAILED_MESSAGE = 'Delivery Failed. Please try again';

const PENDING_MESSAGE = 'Pending';

function DraftMailStatus({
	emailStatus = '',
	handleClick = () => {},
	isDraftAlreadySent = false,
}) {
	if (emailStatus === 'delivered') {
		return (
			<div className={styles.draft_message}>
				<div>{SUCCESS_MESSAGE}</div>
				<IcMFtick
					width={16}
					height={16}
					color="#849e4c"
					className={styles.tick_styles}
				/>
				<IcMAppDelete
					width={16}
					height={16}
					color="#f68b21"
					className={styles.delete_svg}
					onClick={() => {
						handleClick({ buttonType: 'delete' });
					}}
				/>
			</div>
		);
	}

	if (isDraftAlreadySent && !emailStatus) {
		return (
			<div className={styles.failed_draft}>
				<div>{PENDING_MESSAGE}</div>
				<IcMTimer
					width={13}
					height={13}
					color="#F68B21"
					className={styles.delete_svg}
				/>
			</div>
		);
	}

	return (
		<div className={styles.pending_draft}>
			<div>{FAILED_MESSAGE}</div>
			<IcMRefresh
				width={13}
				height={13}
				color="#f68b21"
				className={styles.delete_svg}
				onClick={() => {
					handleClick({ buttonType: 'preview' });
				}}
			/>
		</div>

	);
}

function RightButtonsMapping({
	isDraft = false,
	handleClick = () => {},
	emailStatus = '',
	isDraftAlreadySent = false,
	loading = false,
}) {
	const buttonKeys = BUTTON_KEYS_MAPPING[isDraft ? 'draft' : 'mail'] || [];

	if (!isDraftAlreadySent || !isDraft) {
		return BUTTON_MAPPING.map(
			(item) => {
				const { key = '', icon = '' } = item || {};

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
						style={{ loading: loading ? 'not-allowed' : 'pointer' }}
						onClick={(e) => {
							e.stopPropagation();
							handleClick({ buttonType: key });
						}}
					>
						{icon}
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
