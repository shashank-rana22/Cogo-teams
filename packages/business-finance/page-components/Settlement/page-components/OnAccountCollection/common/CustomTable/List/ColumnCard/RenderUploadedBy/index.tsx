import { Tooltip } from '@cogoport/components';

import getFormattedDate from '../../../../../../../commons/Utils/getFormattedDate';

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
								? getFormattedDate({ date: transactionDate })
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
							? getFormattedDate({ date: transactionDate })
							: '--'}
					</div>

				</div>
			</Tooltip>
		</div>
	);
};

export default renderUploadedBy;
