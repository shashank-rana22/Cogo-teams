import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

interface UploadInterface {
	item?:{
		uploadedBy?:string
		transactionDate?:Date
		customerName?:string
		accCode?:string
		bankAccountNumber?:string
		orgSerialId?:string
		bankName?:string
		paymentNumValue?:string
		amount?:string
		utr?:string
		entityType?:string
		currency?:string

	}
}

const renderUploadedBy = ({ item }:UploadInterface) => {
	const { uploadedBy = '', transactionDate } = item;

	return (
		<div className={styles.upload_container}>
			<Tooltip
				content={(
					<div>
						<div>{uploadedBy || '----'}</div>

						<div>
							{transactionDate
								? formatDate({
									date       : new Date(transactionDate),
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})
								: '--'}
						</div>

					</div>
				)}
				placement="top"
				interactive
			>
				<div className={styles.flex}>

					<div className={styles.text_truncate}>{uploadedBy || '----'}</div>

					<div className={styles.text_truncate}>
						{transactionDate
							? formatDate({
								date       : new Date(transactionDate),
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})
							: '--'}
					</div>

				</div>
			</Tooltip>
		</div>
	);
};

export default renderUploadedBy;
