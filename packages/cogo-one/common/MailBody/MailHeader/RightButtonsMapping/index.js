import { IcMRefresh, IcMAppDelete, IcMFtick } from '@cogoport/icons-react';

import { BUTTON_MAPPING, BUTTON_KEYS_MAPPING } from '../../../../constants/mailConstants';

import styles from './styles.module.css';

const SUCESS_MESSAGE = 'Draft delivered sucessfully';

const FAILED_MESSAGE = 'Delivery Failed. Please try again';

function DraftMailStatus({ emailStatus = '', handleClick = () => {} }) {
	if (emailStatus === 'success') {
		return (
			<div className={styles.draft_message}>
				<div>{SUCESS_MESSAGE}</div>
				<IcMFtick
					width={16}
					height={16}
					color="#849e4c"
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

	return (
		<div className={styles.failed_draft}>
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

function RightButtonsMapping({ isDraft = false, handleClick = () => {}, emailStatus = '' }) {
	const buttonKeys = BUTTON_KEYS_MAPPING[isDraft ? 'draft' : 'mail'] || [];

	if (!emailStatus) {
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
		/>
	);
}

export default RightButtonsMapping;
