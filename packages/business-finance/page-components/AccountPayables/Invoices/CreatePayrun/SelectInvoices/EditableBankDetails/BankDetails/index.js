import { Toast } from '@cogoport/components';
import { IcMUndo, IcMEdit, IcMEyeopen } from '@cogoport/icons-react';
import { useState } from 'react';

import BankSelect from '..';

import styles from './styles.module.css';

function BankDetails({ itemData, payrun_type }) {
	const newItem = itemData;
	const [bankEdit, setBankEdit] = useState(false);
	const [rollback, showRollback] = useState(true);
	const {
		invoiceType = '',
		bankDetail,
		tradePartyMappingId,
		oldBankData,
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

	const viewDocument = (url) => {
		if (url) {
			window.open(url, '_blank');
		} else {
			Toast.info('Document not found ');
		}
	};

	let renderComponent = null;

	if (bankEdit) {
		renderComponent = (
			<BankSelect
				itemData={itemData}
				setBankEdit={setBankEdit}
				showRollback={showRollback}
				oldBankData={oldBankData}
			/>
		);
	} else if (bankDetail) {
		const BankName = bankName || bank_name;
		const AccountNumber = accountNo || bank_account_number;
		const IFSCode = ifscCode || ifsc_number;
		renderComponent = (
			<div className={styles.flex}>
				{payrun_type === 'normal_payrun' ? (
					<div className={styles.font}>
						<span className={styles.bold}>{bankName || bank_name}</span>
						<span>{`A/C No: ${accountNo || bank_account_number}`}</span>
						<span style={{ display: 'flex' }}>
							{`IFSC: ${ifscCode || ifsc_number}`}
							{' '}
							<div role="presentation" onClick={() => viewDocument(imageUrl)}>
								<IcMEyeopen className={styles.iconeye} />
							</div>
						</span>
					</div>
				) : (
					<div className={styles.font}>
						<div className={styles.bold}>{BankName}</div>
						<div className={styles.flex}>
							A/C No.
							{AccountNumber}
						</div>

						<div style={{ display: 'flex' }}>
							<div>{IFSCode}</div>

							<div role="presentation" className={styles.icon} onClick={() => viewDocument(imageUrl)}>
								<IcMEyeopen className={styles.eye} />
							</div>
						</div>
					</div>
				)}
				{
					tradePartyMappingId && (
						<div className={styles.edit}>
							<IcMEdit
								className={styles.pointer}
								height={12}
								width={12}
								onClick={setBankEdit}
							/>
							{oldBankData && rollback && (
								<IcMUndo
									className={styles.pointer}
									height={14}
									width={14}
									onClick={() => {
										newItem.bankDetail = newItem.bankValue;
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

	if (invoiceType !== 'CREDIT NOTE') {
		return <div>{renderComponent}</div>;
	}
	return null;
}

export default BankDetails;
