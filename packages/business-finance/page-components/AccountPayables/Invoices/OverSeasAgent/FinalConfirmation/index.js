import { Button, Placeholder, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMPdf } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { saveAs } from 'file-saver';
import React, { useState } from 'react';

import useGetBankList from '../../hooks/useGetBankList';
import useListTaggedInvoices from '../../hooks/useListTaggedInvoice';

import styles from './styles.module.css';

const MAX_LENGTH_MINUS = 1;

function FinalConfirmation({ setActive = () => {}, setShowSaveAsDraft = () => {} }) {
	const { push } = useRouter();

	const { data, loadingList, selectBank, loadingSaveBank } = useListTaggedInvoices();
	const [selectBankShow, setSelectBankShow] = useState(false);
	const [bankObject, setBankObject] = useState({});

	const { bankDetails } = useGetBankList();

	const { documents = '' } = data || {};

	const getDate = (date) => formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
	});
	const saveBankButtonValue = loadingSaveBank ? 'SAVING...' : 'SAVE BANK';

	const handleClick = () => {
		const callback = () => setSelectBankShow(true) || setShowSaveAsDraft(true);
		selectBank(bankObject?.id, callback);
	};

	const PAYMENT_INITIATED = 'PAYMENT_INITIATED';

	const handleSavePayrun = () => {
		push(
			`/business-finance/account-payables/[active_tab]?initiated=${PAYMENT_INITIATED}`,
			`/business-finance/account-payables/payruns?initiated=${PAYMENT_INITIATED}`,
		);
	};

	const documentsList = [
		{
			docName        : 'Purchase Invoices',
			documentUrl    : documents.billPdfUrl || '',
			uploadedAt     : documents.createdAt,
			showDeleteIcon : true,
		},
		{
			docName        : 'Shipment Documents',
			documentUrl    : documents.shipmentPdfUrl || '',
			uploadedAt     : documents.createdAt,
			showDeleteIcon : true,
		},
		{
			docName     : 'Tax Declaration',
			documentUrl : documents.taxDeclarationFormUrl || '',
			uploadedAt  : documents.createdAt,
		},
		{
			docName     : 'Bank Form',
			documentUrl : documents.bankFormUrl || '',
			uploadedAt  : documents.createdAt,
		},
		{
			docName     : 'Other Document',
			documentUrl : documents?.otherDocumentsUrl?.split(',') || '',
			uploadedAt  : documents.createdAt,
		},
	];

	const GetData = () => {
		if (documents === '') {
			<div>DOCUMENT NOT FOUND</div>;
		}
		return documentsList.map((item) => {
			if (item.documentUrl !== '') {
				if (item.docName === 'Other Document') {
					return item.documentUrl.map((doc) => {
						const parts = doc.split('/');
						const lastPart = parts[parts.length - MAX_LENGTH_MINUS];

						return (
							<div className={styles.document_sub_card} key={item.docName}>
								<div className={styles.pdf_container}>
									<div>
										<IcMPdf width={30} height={30} />
									</div>

									<div className={styles.display_name}>
										<div className={styles.doc_name_text}>
											<div>{item.docName}</div>
											<div className={styles.file_name}>
												(
												<span>{lastPart}</span>
												)
											</div>
										</div>
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
										onClick={() => window.open(doc, '_blank')}
										themeType="linkUi"
									>
										View
									</Button>

									<Button
										onClick={() => saveAs(doc)}
										themeType="linkUi"
									>
										Download
									</Button>
								</div>
							</div>
						);
					});
				}
				return (
					<div className={styles.document_sub_card} key={item.docName}>
						<div className={styles.pdf_container}>
							<div>
								<IcMPdf width={30} height={30} />
							</div>
							<div>
								<div>
									<div className={styles.doc_name_text}>{item.docName}</div>
									<div className={styles.uploaded_by}>
										uploaded at:
										{' '}
										{getDate(item.uploadedAt)}
									</div>
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
						</div>
					</div>
				);
			}

			return null;
		});
	};

	return (
		<div>
			<div className={styles.header}>
				Final Review
				<div className={styles.dash} />
			</div>

			<div className={styles.document_ctn}>
				<div className={styles.header}>
					Uploaded Documents
					<div className={styles.dash} />
				</div>

				{loadingList ? documentsList.map((item) => (
					<div className={styles.forms} key={item.docName}>
						<Placeholder width="90%" height="135px" margin="10px 0px" />
					</div>
				))
					: (
						<div className={styles.document_card}>
							{GetData()}
						</div>
					)}
			</div>

			<div className={styles.bank_ctn}>
				<div className={styles.header}>
					Allot Bank
					<div className={styles.dash} />
				</div>

				{loadingList ? (
					<div>
						<Placeholder width="80%" height="35px" />
					</div>
				) : (
					<div className={styles.bank_ctn_select}>
						<div className={styles.header}>
							Select Bank
						</div>

						<div className={styles.select}>
							<Select
								theme="admin"
								placeholder="Select bank"
								options={bankDetails}
								value={bankObject?.value}
								onChange={(val, obj) => {
									setBankObject(obj);
								}}
							/>
						</div>

						<Button
							size="lg"
							themeType="accent"
							onClick={() => {
								handleClick();
							}}
							disabled={loadingSaveBank || selectBankShow}
						>
							{saveBankButtonValue}
						</Button>
					</div>
				)}
			</div>

			<div className={styles.btn_container}>
				<div className={styles.btn}>
					<Button
						size="md"
						onClick={() => {
							setActive('invoice_selection');
							handleSavePayrun();
						}}
						disabled={!selectBankShow || loadingSaveBank}
					>
						Save Pay Run
					</Button>
				</div>
			</div>
		</div>
	);
}

export default FinalConfirmation;
