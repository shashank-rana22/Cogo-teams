import { Button, cl, RadioGroup, Textarea, Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetBankData from '../../../apisModal/useGetBankData';
import ClipBoard from '../../../common/Clipboard';
import RejectModal from '../../../common/RejectModal/index';
import { getOptions } from '../constant';

import styles from './styles.module.css';

function Details({
	row = {},
	setDetailsModal = () => {},
	refetch = () => {
	},
}) {
	const { t } = useTranslation(['incidentManagement']);
	const { data: { bankRequest = '', organization = {} }, id: bankId = '', status = '' } = row || {};
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
	const { tradePartyName = '', businessName = '', tradePartyType = '' } = organization || {};
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
	const [showRejectModal, setShowRejectModal] = useState(false);

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
					<div className={styles.text}>
						<div className={styles.tooltip_title}>
							<Tooltip
								interactive
								content={(tradePartyName || businessName || '')}
							>
								<div className={styles.wrapper}>{(tradePartyName || businessName || '')}</div>
							</Tooltip>
						</div>
					</div>
				</div>
				<div className={styles.organization_div}>
					<div className={styles.requested_div}>
						<div className={styles.heading}>Requested By</div>
						<div className={styles.text}>{row?.createdBy?.name || ''}</div>
					</div>
					<div className={styles.requested_div}>
						<div className={styles.heading}>Organization Type</div>
						<div className={styles.text}>{tradePartyType || ''}</div>
					</div>
				</div>
			</div>
			<div className={styles.line} />

			<div className={styles.radio_box}>
				<div className={styles.simple_name}>{t('incidentManagement:bank_holder_name')}</div>
				<div className={styles.flex}>
					<div className={styles.font_name}>{startCase(bankHolderName) || '-'}</div>
					<div className={styles.radio}>
						<RadioGroup
							className={styles.radio_text}
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
					<div className={styles.font_name}>{<ClipBoard data={accountNumber} /> || '-'}</div>
					<div className={styles.radio}>
						<RadioGroup
							className={styles.radio_text}
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
							className={styles.radio_text}
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
						{ifscCode ? <ClipBoard data={ifscCode} /> || '-'
							: <ClipBoard data={swiftCode} /> || ''}
					</div>
					<div className={styles.radio}>
						<RadioGroup
							className={styles.radio_text}
							options={getOptionsData}
							onChange={(item) => setValue((prev) => ({
								...prev,
								radioIFSC: item,
							}))}
							value={value?.radioIFSC}
						/>
					</div>
				</div>

				<div className={styles.simple_name}>{t('incidentManagement:verification_method')}</div>
				<div className={styles.method_flex}>
					<div className={styles.font_name}>Manual Testing</div>
					<div>
						<RadioGroup
							className={styles.radio_text}
							options={getOptionsData}
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
						className={styles.textarea}
						name="remark"
						size="md"
						placeholder={t('incidentManagement:remarks_placeholder')}
						onChange={(v) => setValue((prev) => ({ ...prev, text: v }))}
					/>
					<div className={styles.button_container}>

						<Button
							size="md"
							themeType="secondary"
							style={{ marginRight: '8px' }}
							disabled={!(value?.text.length) || loading}
							loading={loading}
							onClick={() => setShowRejectModal(true)}
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
					{showRejectModal
					&& (
						<RejectModal
							setShowRejectModal={setShowRejectModal}
							onAction={OnAction}
							showRejectModal={showRejectModal}
							loading={loading}
						/>
					)}

				</div>
			) : null }

		</div>
	);
}

export default Details;
