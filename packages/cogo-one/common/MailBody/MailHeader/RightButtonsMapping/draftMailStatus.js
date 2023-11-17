import { IcMRefresh, IcMAppDelete, IcMFtick, IcMTimer } from '@cogoport/icons-react';

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
					onClick={(e) => {
						e.stopPropagation();
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
				onClick={(e) => {
					e.stopPropagation();
					handleClick({ buttonType: 'preview' });
				}}
			/>
		</div>

	);
}

export default DraftMailStatus;
