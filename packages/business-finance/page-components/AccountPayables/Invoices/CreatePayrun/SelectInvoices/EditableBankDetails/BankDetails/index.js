import { Toast } from '@cogoport/components';
import { IcMUndo, IcMEdit, IcMEyeopen } from '@cogoport/icons-react';
import { useState } from 'react';

import BankSelect from '..';

import styles from './styles.module.css';

const viewDocument = (url) => {
	if (url) {
		window.open(url, '_blank');
	} else {
		Toast.info('Document not found ');
	}
};

function BankDetails({ itemData, setEditedValue }) {
	const newItem = itemData;
	const [bankEdit, setBankEdit] = useState(false);
	const [rollback, showRollback] = useState(true);
	const {
		invoiceType = '',
		bankDetail,
		tradePartyMappingId,
	} = itemData || {};
	const {
		bankName = '',
		ifscCode = '',
		accountNo = '',
		imageUrl = '',
		bank_name = '',
		ifsc_number = '',
		bank_account_number = '',
	} = bankDetail || {};

	let renderComponent = null;

	if (bankEdit) {
		renderComponent = (
			<BankSelect
				itemData={itemData}
				setBankEdit={setBankEdit}
				showRollback={showRollback}
				setEditedValue={setEditedValue}
			/>
		);
	} else if (bankDetail) {
		const getBankName = bankName || bank_name;
		const getAccountNumber = accountNo || bank_account_number;
		const getIFSCCode = ifscCode || ifsc_number;
		renderComponent = (
			<div className={styles.flex}>
				<div className={styles.font}>
					<div className={styles.bold}>{getBankName}</div>
					<div className={styles.flex}>
						A/C No.
						{' '}
						{getAccountNumber}
					</div>

					<div style={{ display: 'flex' }}>
						<div>{getIFSCCode}</div>

						<div role="presentation" className={styles.icon} onClick={() => viewDocument(imageUrl)}>
							<IcMEyeopen className={styles.eye} />
						</div>
					</div>
				</div>
				{
					tradePartyMappingId && (
						<div className={styles.edit}>
							<IcMEdit
								className={styles.pointer}
								height={12}
								width={12}
								onClick={setBankEdit}
							/>
							{newItem?.bankDetail && rollback && (
								<IcMUndo
									className={styles.pointer}
									height={14}
									width={14}
									onClick={() => {
										setEditedValue(newItem, newItem.bankValue, 'bankDetail', true);
										setBankEdit(false);
										showRollback(false);
									}}
								/>
							)}
						</div>
					)
				}
			</div>
		);
	}

	if (invoiceType === 'CREDIT NOTE') {
		return null;
	}
	return <div>{renderComponent}</div>;
}

export default BankDetails;
