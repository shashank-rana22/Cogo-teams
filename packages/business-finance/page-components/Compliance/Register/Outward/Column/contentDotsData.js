import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function ContentDotsData({ row, deleteId, uploadId }) {
	const { push } = useRouter();

	const { fileStatus, status, fileUrl, id } = row || {};
	return (
		<div>
			<div
				className={styles.card_data}
				onClick={() => {
					push(
						`/business-finance/compliance/[active_tab]/view?id=${id}`,
						`/business-finance/compliance/register/view?id=${id}`,
					);
				}}
				role="presentation"
			>
				View
			</div>
			{status === 'DISABLE' || fileStatus === 'ERROR_IN_EXPORT' ? (
				<div
					className={styles.card_data}
					onClick={() => { deleteId(id); }}
					role="presentation"
				>
					Delete
				</div>
			) : fileStatus === 'READY' && (
				<div
					className={styles.card_data}
					onClick={() => { uploadId(id); }}
					role="presentation"
				>
					Upload
				</div>
			) }
			<div
				className={styles.card_data}
				onClick={() => { window.open(fileUrl, '_blank'); }}
				role="presentation"
			>
				Download
			</div>
		</div>
	);
}

export default ContentDotsData;
