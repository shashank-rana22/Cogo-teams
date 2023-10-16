import { Button, RadioGroup, Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import FilePreview from '../../../../commons/FilePreview';
import { OPTIONS, OPTION_AIR } from '../../../Constants';

import { ShowDocument } from './ShowDocument';
import styles from './styles.module.css';

const getDoc = ({ radioValue, documentData }) => {
	let docLink = '';
	documentData?.forEach((itemData) => {
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
	return docLink;
};

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

	const checkedCondition = loadingList
		|| ['APPROVED', 'REJECTED'].includes(payrunBillStatus)
		|| ['Reject', 'Tagged'].includes(showCheckInvoices[id]);

	const isNotAir = ['house_bill_of_lading', 'bill_of_lading'].includes(
		documentData?.[GLOBAL_CONSTANTS.zeroth_index]?.document_type,
	);

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
						{isNotAir ? (
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
							getDoc({ radioValue: isNotAir ? radioSet : radioAir, documentData }),
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
							getDoc({ radioValue: isNotAir ? radioSet : radioAir, documentData }),
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
