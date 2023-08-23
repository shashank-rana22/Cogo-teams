import { Button, RadioGroup } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import FilePreview from '../../../../commons/FilePreview';
import { OPTIONS, OptionAIR } from '../../../Constants';

import styles from './styles.module.css';

function Documents({
	id,
	documentUrl,
	onApproveReject,
	ApproveReject,
	DocumentData,
	payrunBillStatus,
	showCheckInvoices,
	handleDropdown = () => {},
	setShowCheckInvoices = () => {},
}) {
	const [radioSet, setRadioSet] = useState('mbl');
	const [radioAir, setRadioAir] = useState('mawb');
	const taggedDocument = DocumentData?.[GLOBAL_CONSTANTS.zeroth_index]?.document_url;

	function ShowDocument(radioValue, DocData) {
		let docLink = '';

		DocData?.forEach((itemData) => {
			switch (radioValue) {
				case 'mawb':
					if (itemData?.document_type === 'airway_bill') {
						docLink = itemData?.document_url;
					}
					break;
				case 'hawb':
					if (itemData?.document_type === 'house_airway_bill') {
						docLink = itemData?.document_url;
					}
					break;
				case 'do':
					if (itemData?.document_type === 'delivery_order') {
						docLink = itemData?.document_url;
					}
					break;
				case 'mbl':
					if (itemData?.document_type === 'bill_of_lading') {
						docLink = itemData?.document_url;
					}
					break;
				case 'hbl':
					if (itemData?.document_type === 'house_bill_of_lading') {
						docLink = itemData?.document_url;
					}
					break;
				default:
					break;
			}
		});

		if (docLink) {
			return (
				<div className={styles.upload_invoice}>
					<object
						data={docLink}
						type="application/pdf"
						height="100%"
						width="100%"
						aria-label="Doc Preview"
						style={{ padding: '12px 16px 16px 16px' }}
					/>
				</div>
			);
		}

		return <div className={styles.empty_data}>BILL NOT FOUND</div>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.display_documents}>
				<div className={styles.left}>
					<FilePreview url={documentUrl} />
				</div>

				{DocumentData?.loading ? (
					<div className={styles.right}>
						Loading .....
						{' '}
					</div>
				) : (
					<div className={styles.right}>
						{DocumentData?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.document_type === 'bill_of_lading'
							|| DocumentData?.data?.[GLOBAL_CONSTANTS.zeroth_index]?.document_type
								=== 'house_bill_of_lading' ? (
									<>
										<div className={styles.radiobtn}>
											<RadioGroup
												className="primary lg"
												options={OPTIONS || [{}]}
												value={radioSet || ''}
												onChange={(item) => setRadioSet(item)}
											/>
										</div>
										{radioSet && ShowDocument(radioSet, DocumentData)}
									</>
							) : (
								<>
									<div className={styles.radiobtn}>
										<RadioGroup
											className="primary lg"
											options={OptionAIR || [{}]}
											value={radioAir || ''}
											onChange={(item) => setRadioAir(item)}
										/>
									</div>
									{radioAir && ShowDocument(radioAir, DocumentData)}
								</>
							)}
					</div>
				)}
			</div>

			<div className={styles.btn_container}>
				<Button
					size="md"
					themeType="accent"
					className={styles.btn}
					onClick={() => {
						onApproveReject(
							id,
							'REJECTED',
							taggedDocument,
							handleDropdown,
							setShowCheckInvoices,
						);
					}}
					disabled={
						ApproveReject?.loading
						|| payrunBillStatus === 'APPROVED'
						|| payrunBillStatus === 'REJECTED'
						|| showCheckInvoices[id] === 'Reject'
						|| showCheckInvoices[id] === 'Tagged'
					}
				>
					Reject
				</Button>

				<Button
					size="md"
					themeType="secondary"
					className={styles.btn}
					onClick={() => {
						onApproveReject(
							id,
							'APPROVED',
							taggedDocument,
							handleDropdown,
							setShowCheckInvoices,
						);
					}}
					disabled={
						ApproveReject?.loading
						|| payrunBillStatus === 'APPROVED'
						|| payrunBillStatus === 'REJECTED'
						|| showCheckInvoices[id] === 'Tagged'
						|| showCheckInvoices[id] === 'Reject'
					}
				>
					Approve & Tag
				</Button>
			</div>
		</div>
	);
}
export default Documents;
