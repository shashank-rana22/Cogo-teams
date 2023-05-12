import { Textarea, Modal, Button } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function BankDatailsModal({
	itemData, setRemarks, remarks, onSave, onRaiseAgain,
	setSelectedFile, selectedFile, name, showModal, setShowModal,
	loadingOnSave,
	loadingOnRaise,
}) {
	const { status, userIncidentStatus, userNotes } = itemData || {};
	const { data } = itemData || {};
	const { organization, bankRequest } = data || {};
	const {
		bankHolderName, accountNumber, ifscCode, swiftCode, remark, bankName, branchName, documentUrls,
	} = bankRequest || {};
	const { businessName, tradePartyType, category_types:categoryTypes } = organization || {};
	return (
		<div>
			{status === 'REJECTED' ? (
				<Button size="sm" themeType="tertiary" onClick={() => { setShowModal(true); }}>
					{status === 'REJECTED' && userIncidentStatus === 'PENDING_ACTION'
					&& name === 'Raise Again' ? 'Raise Again' : 'View'}

				</Button>
			)
				: (
					<Button size="md" themeType="secondary" onClick={() => { setShowModal(true); }}>
						View
					</Button>
				)}
			<Modal size="lg" show={showModal} onClose={() => { setShowModal(false); }}>
				<Modal.Header title="Bank Account Add/Edit" />
				<div className={styles.rate_conatiner}>
					<div className={styles.name_container}>
						<div className={styles.value}>
							Organization Name
						</div>
						<div className={styles.label}>
							{businessName}
						</div>
					</div>
					<div className={styles.name_container}>
						<div className={styles.value}>
							Trade Party Type
						</div>
						<div className={styles.type_value}>
							{startCase(tradePartyType)}
						</div>
					</div>
					<div className={styles.name_container}>
						<div className={styles.value}>
							Category Type
						</div>
						<div className={styles.category_flex}>
							{categoryTypes?.map((itm, index) => {
								if (index !== categoryTypes.length - 1) return `${itm},`;
								return `${itm}`;
							})}
						</div>
					</div>
				</div>
				<Modal.Body>
					<div className={styles.rate_conatiner}>
						<div className={styles.bank_details}>
							<div className={styles.value}>
								Bank Holder Name
							</div>
							<div className={styles.label}>
								{bankHolderName}
							</div>
						</div>

					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.bank_details}>
							<div className={styles.value}>
								Account Number
							</div>
							<div className={styles.label}>
								{accountNumber}
							</div>
						</div>

					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.bank_details}>
							<div className={styles.value}>
								Bank & Branch Name
							</div>
							<div className={styles.label}>
								{bankName}
							</div>
							<div className={styles.label}>
								{branchName}
							</div>
						</div>

					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.bank_details}>
							<div className={styles.value}>
								{ifscCode ? 'IFSC Code' : 'Swift Code'}
							</div>
							<div className={styles.label}>
								{ifscCode ? ifscCode || '' : swiftCode || ''}
							</div>
						</div>

					</div>

					<div className={styles.rate_conatiner}>
						<div className={styles.value}>
							Remark -
						</div>
						<div className={styles.label}>
							{remark}
						</div>
					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.value}>
							Document -
						</div>
						<div className={styles.value}>
							{documentUrls?.map((url:string) => (url !== '' ? (
								<div className={styles.link}>
									<a href={url} target="_blank" rel="noreferrer">
										{url?.split('/')?.pop() || '-'}
									</a>
								</div>
							) : (
								<span>No document available</span>
							)))}
						</div>
					</div>
					{name !== 'Raise Again'
					&& (
						<div className={styles.remarks_style}>
							Notes (only visible to self)
							<Textarea
								name="remarks"
								className={styles.text_area}
								size="lg"
								placeholder="Enter here..."
								onChange={(values) => setRemarks(values)}
								defaultValue={userNotes}
							/>
						</div>
					)}
					<div className={styles.rate_conatiner}>
						{status === 'REJECTED' && userIncidentStatus === 'PENDING_ACTION'
					&& name === 'Raise Again'
					&& (
						<FileUploader
							value={selectedFile}
							onChange={setSelectedFile}
							showProgress
							draggable
							multipleUploadDesc="Upload Invoice"
						/>
					)}
					</div>

				</Modal.Body>
				<Modal.Footer>
					{status === 'REJECTED' && userIncidentStatus === 'PENDING_ACTION' && name === 'Raise Again'
						? (
							<Button
								disabled={selectedFile === undefined || loadingOnRaise}
								onClick={() => {
									onRaiseAgain();
								}}
								className={styles.raise_button}
							>
								Raise Again
							</Button>
						)
						: (
							<Button
								disabled={!(remarks.length > 0) || loadingOnSave}
								onClick={() => {
									onSave();
								}}
							>
								Save

							</Button>
						)}
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default BankDatailsModal;
