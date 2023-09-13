import { Button, Placeholder, Select } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useGetBankList from '../../hooks/useGetBankList';
import useListTaggedInvoices from '../../hooks/useListTaggedInvoice';
import useSaveBank from '../../hooks/useSaveBank';
import GetDataFinalConfirmation from '../utils/GetDataFinalConfirmation';

import styles from './styles.module.css';

function FinalConfirmation({ setActive = () => {}, setShowSaveAsDraft = () => {} }) {
	const { push } = useRouter();

	const { data = {}, loadingList = false } = useListTaggedInvoices();
	const { selectBank = () => {}, loadingSaveBank = false } = useSaveBank();
	const { bankDetails = [] } = useGetBankList();

	const [selectBankShow, setSelectBankShow] = useState(false);
	const [bankObject, setBankObject] = useState({});
	const { documents = {} } = data || {};

	const saveBankButtonValue = loadingSaveBank ? 'SAVING...' : 'SAVE BANK';

	const handleClick = () => {
		const callback = () => setSelectBankShow(true) || setShowSaveAsDraft(true);
		selectBank(bankObject?.id, callback);
	};

	const handleSavePayrun = () => {
		push(
			'/business-finance/account-payables/[active_tab]?initiated=PAYMENT_INITIATED',
			'/business-finance/account-payables/payruns?initiated=PAYMENT_INITIATED',
		);
	};

	const documentsList = [
		{
			docName        : 'Purchase Invoices',
			documentUrl    : documents?.billPdfUrl || '',
			uploadedAt     : documents?.createdAt,
			showDeleteIcon : true,
		},
		{
			docName        : 'Shipment Documents',
			documentUrl    : documents?.shipmentPdfUrl || '',
			uploadedAt     : documents?.createdAt,
			showDeleteIcon : true,
		},
		{
			docName     : 'Tax Declaration',
			documentUrl : documents?.taxDeclarationFormUrl || '',
			uploadedAt  : documents?.createdAt,
		},
		{
			docName     : 'Bank Form',
			documentUrl : documents?.bankFormUrl || '',
			uploadedAt  : documents?.createdAt,
		},
		{
			docName     : 'Other Document',
			documentUrl : documents?.otherDocumentsUrl?.split(',') || '',
			uploadedAt  : documents?.createdAt,
		},
	];

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
					<div className={styles.forms} key={item?.docName}>
						<Placeholder width="90%" height="135px" margin="10px 0px" />
					</div>
				))
					: (
						<GetDataFinalConfirmation documentsList={documentsList} documents={documents} />
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
								onChange={(val, obj) => { setBankObject(obj); }}
							/>
						</div>

						<Button
							size="lg"
							themeType="accent"
							onClick={handleClick}
							disabled={loadingSaveBank || selectBankShow}
						>
							{saveBankButtonValue}
						</Button>
					</div>
				)}
			</div>

			<div className={styles.btn_container}>
				<Button
					className={styles.btn}
					size="md"
					onClick={() => { setActive('invoice_selection'); handleSavePayrun(); }}
					disabled={!selectBankShow || loadingSaveBank}
				>
					Save Pay Run
				</Button>
			</div>
		</div>
	);
}

export default FinalConfirmation;
