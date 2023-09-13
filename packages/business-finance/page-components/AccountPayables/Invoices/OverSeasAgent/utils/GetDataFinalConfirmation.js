import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPdf } from '@cogoport/icons-react';
import { saveAs } from 'file-saver';

import EmptyState from '../../commons/EmptyState';

import styles from './styles.module.css';

const MAX_LENGTH_MINUS = 1;

const getDate = (date) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
	formatType : 'date',
});

function GetDataFinalConfirmation({ documents = {}, documentsList = [] }) {
	if (documents === '') {
		return (
			<EmptyState
				height={110}
				width={200}
				flexDirection="column"
				textSize="20px"
			/>
		);
	}
	return (
		<div className={styles.document_card_final}>
			{
		(documentsList || [])?.map((item) => {
			if (item?.documentUrl !== '') {
				if (item?.docName === 'Other Document') {
					return (item?.documentUrl || [])?.map((doc) => {
						const parts = doc?.split('/');
						const lastPart = parts[parts.length - MAX_LENGTH_MINUS];
						return (
							<div className={styles.document_sub_card_final} key={item.docName}>
								<div className={styles.pdf_container_final}>
									<IcMPdf width={30} height={30} />

									<div className={styles.display_name_final}>
										<div className={styles.doc_name_text_final}>
											<div>{item.docName}</div>

											<div className={styles.file_name_final}>
												(
												<span>{lastPart}</span>
												)
											</div>
										</div>

										<div className={styles.uploaded_by_final}>
											uploaded at:
											{' '}
											{getDate(item.uploadedAt)}
										</div>
									</div>
								</div>

								<div className={styles.download_doc_final}>
									<Button
										style={{ marginRight: '20px' }}
										onClick={() => window.open(doc, '_blank')}
										themeType="linkUi"
									>
										View
									</Button>

									<Button onClick={() => saveAs(doc)} themeType="linkUi">Download</Button>
								</div>
							</div>
						);
					});
				}
				return (
					<div className={styles.document_sub_card_final} key={item.docName}>
						<div className={styles.pdf_container_final}>
							<IcMPdf width={30} height={30} />

							<div>
								<div className={styles.doc_name_text_final}>{item.docName}</div>

								<div className={styles.uploaded_by_final}>
									uploaded at:
									{' '}
									{getDate(item.uploadedAt)}
								</div>
							</div>
						</div>

						<div className={styles.download_doc_final}>
							<Button
								style={{ marginRight: '20px' }}
								onClick={() => window.open(item.documentUrl, '_blank')}
								themeType="linkUi"
							>
								View
							</Button>

							<Button
								onClick={() => saveAs(item.documentUrl)}
								themeType="linkUi"
							>
								Download
							</Button>
						</div>
					</div>
				);
			}

			return null;
		})
}
		</div>
	);
}

export default GetDataFinalConfirmation;
