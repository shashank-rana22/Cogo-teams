import { Button, RadioGroup, Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import FilePreview from '../../../../commons/FilePreview';
import { OPTIONS, OPTION_AIR } from '../../../Constants';

import { ShowDocument } from './ShowDocument';
import styles from './styles.module.css';

function Documents({
	id = '',
	documentUrl = '',
	onAprrovalOrRejection = () => {},
	loadingList = false,
	documentData = [],
	payrunBillStatus = '',
	showCheckInvoices = {},
	handleDropdown = () => {},
	setShowCheckInvoices = () => {},
	billsLoading = false,
}) {
	const [radioSet, setRadioSet] = useState('mbl');
	const [radioAir, setRadioAir] = useState('mawb');
	const taggedDocument = documentData?.[GLOBAL_CONSTANTS.zeroth_index]?.document_url;

	const checkedCondition = loadingList
	|| ['APPROVED', 'REJECTED'].includes(payrunBillStatus)
	|| ['Reject', 'Tagged'].includes(showCheckInvoices[id]);

	return (
		<div className={styles.container}>
			<div className={styles.display_documents}>
				<div className={styles.left}>
					<FilePreview url={documentUrl} />
				</div>

				{billsLoading ? (
					<div className={cl`${styles.right} ${styles.paddingdiv}`}>
						<Placeholder style={{ height: '50px' }} />

						<Placeholder style={{ marginTop: '10px', height: '200px' }} />
					</div>
				) : (
					<div className={styles.right}>
						{['house_bill_of_lading', 'bill_of_lading'].includes(
							documentData?.[GLOBAL_CONSTANTS.zeroth_index]?.document_type,
						) ? (
							<>
								<div className={styles.radiobtn}>
									<RadioGroup
										options={OPTIONS || [{}]}
										value={radioSet || ''}
										onChange={(item) => setRadioSet(item)}
									/>
								</div>
								<ShowDocument radioValue={radioSet} documentData={documentData} />
							</>
							) : (
								<>
									<div className={styles.radiobtn}>
										<RadioGroup
											options={OPTION_AIR || [{}]}
											value={radioAir || ''}
											onChange={(item) => setRadioAir(item)}
										/>
									</div>
									<ShowDocument radioValue={radioAir} documentData={documentData} />
								</>
							)}
					</div>
				)}
			</div>

			<div className={styles.btn_container}>
				<Button
					size="md"
					themeType="secondary"
					className={styles.btn}
					onClick={() => {
						onAprrovalOrRejection(
							id,
							'REJECTED',
							taggedDocument,
							handleDropdown,
							setShowCheckInvoices,
						);
					}}
					disabled={checkedCondition}
				>
					Reject
				</Button>

				<Button
					size="md"
					themeType="primary"
					className={styles.btn}
					onClick={() => {
						onAprrovalOrRejection(
							id,
							'APPROVED',
							taggedDocument,
							handleDropdown,
							setShowCheckInvoices,
						);
					}}
					disabled={checkedCondition}
				>
					Approve & Tag
				</Button>
			</div>
		</div>
	);
}
export default Documents;
