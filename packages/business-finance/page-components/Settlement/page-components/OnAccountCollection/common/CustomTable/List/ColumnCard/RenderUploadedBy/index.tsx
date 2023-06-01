import { Tooltip } from '@cogoport/components';

import { formatDate } from './formatDate';
import styles from './styles.module.css';

const renderUploadedBy = ({ item }) => {
	const { uploadedBy = '', transactionDate = '' } = item;

	return (
		<div className={styles.upload_container}>
			<Tooltip
				content={(
					<div>
						{uploadedBy && <div>{uploadedBy || '----'}</div>}

						<div>
							{transactionDate
								? formatDate(new Date(transactionDate), 'dd/MMM/yy', {}, false)
								: '--'}
						</div>

					</div>
				)}
				placement="top"
				interactive
			>
				<div className={styles.flex}>
					{uploadedBy && (
						<div className={styles.text_truncate}>{uploadedBy || '----'}</div>
					)}

					<div className={styles.text_truncate}>
						{transactionDate
							? formatDate(new Date(transactionDate), 'dd/MMM/yy', {}, false)
							: '--'}
					</div>

				</div>
			</Tooltip>
		</div>
	);
};

export default renderUploadedBy;
