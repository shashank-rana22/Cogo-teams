import { Button } from '@cogoport/components';
import { IcMPdf, IcMDelete } from '@cogoport/icons-react';
import { saveAs } from 'file-saver';

import styles from './styles.module.css';

function GetData({
	documents = {},
	documentsList = [],
	getDate = () => {},
	deleteTaggedDocuments = () => {},
	setSelectBankShow = () => {},
}) {
	if (
		documents?.billPdfUrl === undefined
		&& documents?.shipmentPdfUrl === undefined
	) {
		return (
			<div className={styles.merge_doc_msg}>
				PLEASE MERGE INVOICES
			</div>
		);
	}

	return (documentsList || []).map((item) => {
		if (item?.documentUrl !== '') {
			return (
				<div className={styles.document_card} key={item.docName}>
					<div className={styles.document_sub_card}>
						<div className={styles.pdf_container}>
							<IcMPdf width={30} height={30} />

							<div>
								<div className={styles.doc_name_text}>{item.docName}</div>

								<div className={styles.uploaded_by}>
									uploaded at:
									{' '}
									{getDate(item.uploadedAt)}
								</div>
							</div>
						</div>

						<div className={styles.download_doc}>
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

							{item.showDeleteIcon ? (
								<IcMDelete
									width={24}
									height={24}
									className={styles.delete}
									onClick={() => {
										deleteTaggedDocuments(item);
										setSelectBankShow(false);
									}}
								/>
							) : null}
						</div>
					</div>
				</div>
			);
		}
		return null;
	});
}

export default GetData;
