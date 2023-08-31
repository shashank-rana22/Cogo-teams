import { useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function ContentDotsData({ row, deleteId, uploadId }) {
	const { push } = useRouter();

	const { fileStatus, status, fileUrl, id } = row || {};
	const { t } = useTranslation(['compliance']);
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
				{t('compliance:view')}
			</div>
			{status === 'DISABLE' || fileStatus === 'ERROR_IN_EXPORT' ? (
				<div
					className={styles.card_data}
					onClick={() => { deleteId(id); }}
					role="presentation"
				>
					{t('compliance:delete')}
				</div>
			) : fileStatus === 'READY' && (
				<div
					className={styles.card_data}
					onClick={() => { uploadId(id); }}
					role="presentation"
				>
					{t('compliance:upload')}
				</div>
			) }
			<div
				className={styles.card_data}
				onClick={() => { window.open(fileUrl, '_blank'); }}
				role="presentation"
			>
				{t('compliance:download')}
			</div>
		</div>
	);
}

export default ContentDotsData;
