import { Button, cl, RadioGroup, Textarea } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetBankData from '../../../apisModal/useGetBankData';
import { getOptions, getOptionsManual } from '../constant';

import styles from './styles.module.css';

function Details({
	row = {},
	setDetailsModal = () => {},
	refetch = () => {},
}) {
	const { t } = useTranslation(['incidentManagement']);
	const { data: { bankRequest = '' }, id: bankId = '', status = '' } = row || {};
	const {
		accountNumber,
		bankHolderName,
		bankName,
		branchName,
		ifscCode,
		swiftCode,
		isAccountNumberValid,
		isBankNameValid,
		isBranchNameValid,
		isIfscCodeValid,
		methodOfVerification,
	} = bankRequest || {};
	let isEditable = true;
	if (status !== 'REQUESTED') {
		isEditable = false;
	}
	const [value, setValue] = useState({
		text            : '',
		radioName       : JSON.stringify(isBankNameValid) || '',
		radioNumber     : JSON.stringify(isAccountNumberValid) || '',
		radioBranchName : JSON.stringify(isBranchNameValid) || '',
		radioIFSC       : JSON.stringify(isIfscCodeValid) || '',
		radioMethod     : methodOfVerification || '',
	});

	const { useOnActionBank:OnAction, loading } = useGetBankData({
		bankData: bankRequest,
		setDetailsModal,
		refetch,
		bankId,
		value,
		t,
	});

	const getOptionsData = getOptions({ isEditable, t });

	return (
		<div className={styles.container}>
			<div className={styles.display_box}>
				<div className={styles.company_div}>
					<div className={styles.heading}>Company Name</div>
					<div className={styles.text}>{row?.data?.organization?.businessName || ''}</div>
				</div>
				<div>
					<div className={styles.heading}>Requested By</div>
					<div className={styles.text}>{row?.createdBy?.name || ''}</div>
				</div>
				<div className={styles.invoice}>
					<div className={styles.heading}>Organization Type</div>
					<div className={styles.invoice_text}>{row?.data?.organization?.tradePartyType || ''}</div>
				</div>
			</div>
			<div className={styles.line} />

			<div>
				<div className={styles.simple_name}>{t('incidentManagement:bank_holder_name')}</div>
				<div className={styles.flex}>
					<div className={styles.font_name}>{startCase(bankHolderName) || '-'}</div>
					<div className={styles.radio}>
						<RadioGroup
							options={getOptionsData}
							onChange={(item) => setValue((prev) => ({ ...prev, radioName: item }))}
							value={value?.radioName}
						/>
					</div>
				</div>

				<div className={styles.simple_name}>
					{t('incidentManagement:account_number')}
					{' '}
				</div>
				<div className={styles.flex}>
					<div className={styles.font_name}>{accountNumber || '-'}</div>
					<div className={styles.radio}>
						<RadioGroup
							options={getOptionsData}
							onChange={(item) => setValue((prev) => ({
								...prev,
								radioNumber: item,
							}))}
							value={value?.radioNumber}
						/>
					</div>
				</div>

				<div className={styles.simple_name}>{t('incidentManagement:bank_branch_name')}</div>

				<div className={styles.flex}>
					<div className={styles.font_name_data}>
						{startCase(bankName) || '-'}

						<div className={styles.branch_name}>
							-
							{startCase(branchName) || '-'}
						</div>
					</div>
					<div className={styles.radio}>
						<RadioGroup
							options={getOptionsData}
							onChange={(item) => setValue((prev) => ({
								...prev,
								radioBranchName: item,
							}))}
							value={value?.radioBranchName}
						/>
					</div>
				</div>

				<div className={styles.simple_name}>
					{ifscCode
						? t('incidentManagement:ifsc_code')
						: t('incidentManagement:swift_code')}
				</div>

				<div className={styles.flex}>
					<div className={styles.font_name}>
						{ifscCode ? ifscCode || '-' : swiftCode || ''}
					</div>
					<div className={styles.radio}>
						<RadioGroup
							options={getOptionsData}
							onChange={(item) => setValue((prev) => ({
								...prev,
								radioIFSC: item,
							}))}
							value={value?.radioIFSC}
						/>
					</div>
				</div>

				<div className={styles.flex}>
					<div className={styles.font_name}>{t('incidentManagement:verification_method')}</div>
					<div>
						<RadioGroup
							options={getOptionsManual({ isEditable, t })}
							onChange={(item) => setValue((prev) => ({
								...prev,
								radioMethod: item,
							}))}
							value={value?.radioMethod}
						/>
					</div>
				</div>
			</div>

			{ status === 'REQUESTED' ? (
				<div>
					<div className={cl`${styles.label} 
								${styles.required_field}`}
					>
						Remarks
					</div>

					<Textarea
						name="remark"
						size="md"
						placeholder={t('incidentManagement:remarks_placeholder')}
						onChange={(v) => setValue((prev) => ({ ...prev, text: v }))}
						style={{ width: '700', height: '80px', marginBottom: '12px' }}
					/>
					<div className={styles.button_container}>

						<Button
							size="md"
							themeType="secondary"
							style={{ marginRight: '8px' }}
							disabled={!(value?.text.length) || loading}
							loading={loading}
							onClick={() => {
								OnAction('REJECTED');
							}}
						>
							Reject
						</Button>

						<Button
							size="md"
							style={{ marginRight: '8px' }}
							disabled={Object.values(value).includes('false')
									|| !(value?.text.length) || loading}
							loading={loading}
							onClick={() => {
								OnAction('APPROVED');
							}}
						>
							Approve
						</Button>
					</div>

				</div>
			) : null }

		</div>
	);
}

export default Details;
