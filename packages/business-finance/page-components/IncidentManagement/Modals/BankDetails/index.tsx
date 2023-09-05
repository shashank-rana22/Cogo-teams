import { RadioGroup, Textarea, Modal, Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useGetBankData from '../../apisModal/useGetBankData';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import { getOptionsManual, getOptions } from './constant';
import styles from './styles.module.css';

function BankDetails({
	bankData,
	id:bankId,
	organization,
	refetch,
	row,
	isEditable = true,
	remark = '',
}) {
	const { push } = useRouter();
	const { t } = useTranslation(['incidentManagement']);

	const {
		accountNumber,
		bankHolderName,
		bankName,
		branchName,
		documentUrls,
		ifscCode,
		swiftCode,
		isAccountNumberValid,
		isBankNameValid,
		isBranchNameValid,
		isIfscCodeValid,
		methodOfVerification,
	} = bankData || {};
	const [showBankModal, setShowBankModal] = useState(false);

	const [value, setValue] = useState({
		text            : '',
		radioName       : JSON.stringify(isBankNameValid) || '',
		radioNumber     : JSON.stringify(isAccountNumberValid) || '',
		radioBranchName : JSON.stringify(isBranchNameValid) || '',
		radioIFSC       : JSON.stringify(isIfscCodeValid) || '',
		radioMethod     : methodOfVerification || '',
	});

	const { useOnActionBank:OnAction, loading } = useGetBankData({
		bankData,
		setShowBankModal,
		refetch,
		bankId,
		value,
		t,
	});

	const {
		tradePartyType,
		id,
		tradePartyName,
		businessName,
		category_types:categoryTypes = [''],
	} = organization || {};

	const checkData = () => {
		push('/details/supply/[organization_id]', `/details/supply/${id}`);
	};
	const getOptionsData = getOptions({ isEditable, t });
	return (
		<div>
			<div>
				<ViewButton state={setShowBankModal} />
			</div>
			{showBankModal && (
				<Modal
					size="md"
					show={showBankModal}
					onClose={() => {
						setShowBankModal(false);
					}}
				>
					<Modal.Header title={t('incidentManagement:bank_acc_title')} />
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}
						<div className={styles.name_data}>
							<div>{`${t('incidentManagement:org_name')} -`}</div>
							<div role="presentation" onClick={() => checkData()} className={styles.name}>
								{tradePartyType === 'SELF'
									? businessName || '-' : tradePartyName || '-'}

							</div>

						</div>
						<div className={styles.name_data}>
							<div>{`${t('incidentManagement:trade_party_type')} -`}</div>
							<div className={styles.party_name}>
								{startCase(tradePartyType) || '-'}
							</div>
						</div>

						<div className={styles.name_data}>
							<div>{`${t('incidentManagement:select_category_placeholder')} -`}</div>
							{categoryTypes ? (
								<div className={styles.category}>
									{categoryTypes.map((itm, index) => {
										if (index !== categoryTypes.length - 1) return `${itm},`;
										return `${startCase(itm)}`;
									})}
								</div>
							) : '-'}
						</div>

						<div className={styles.border} />

						<div>
							<div className={styles.simple_name}>{t('incidentManagement:bank_holder_name')}</div>
							<div className={styles.flex}>
								<div className={styles.font_name}>{startCase(bankHolderName) || '-'}</div>
								<div>
									<RadioGroup
										options={getOptionsData}
										onChange={(item: string) => setValue((prev) => ({ ...prev, radioName: item }))}
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
								<div>
									<RadioGroup
										options={getOptionsData}
										onChange={(item: string) => setValue((prev) => ({
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
								<div>
									<RadioGroup
										options={getOptionsData}
										onChange={(item: string) => setValue((prev) => ({
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
								<div>
									<RadioGroup
										options={getOptionsData}
										onChange={(item: string) => setValue((prev) => ({
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
										onChange={(item: string) => setValue((prev) => ({
											...prev,
											radioMethod: item,
										}))}
										value={value?.radioMethod}
									/>
								</div>
							</div>
						</div>
						{remark && (
							<div className={styles.flex_remark}>
								{`${t('incidentManagement:remark_title')} -`}
								<div className={styles.font_name}>
									{remark || '-'}
								</div>
							</div>
						)}
						<div className={styles.document_flex}>
							<div className={styles.document}>{`${t('incidentManagement:doc')} -`}</div>
							{documentUrls?.map((url:any) => (url !== '' ? (
								<a href={url} target="_blank" rel="noreferrer" key={url}>
									<div className={styles.view_flex}>
										<div className={styles.view}>{t('incidentManagement:view_doc_link')}</div>
										<IcMEyeopen />
									</div>
								</a>
							) : (
								<div key={url}>
									{' '}
									{t('incidentManagement:no_doc_available')}
									{' '}
								</div>
							)))}
						</div>
						{isEditable && (
							<>
								<div className={styles.remarks}>{`${t('incidentManagement:remarks')}*`}</div>
								<Textarea
									name="remark"
									size="md"
									placeholder={t('incidentManagement:remarks_placeholder')}
									onChange={(v: string) => setValue((prev) => ({ ...prev, text: v }))}
									style={{ width: '700', height: '100px', marginBottom: '12px' }}
								/>
							</>
						)}

					</Modal.Body>
					{isEditable && (
						<Modal.Footer>
							<div className={styles.button}>
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
									{t('incidentManagement:reject_btn')}
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
									{t('incidentManagement:approve_btn')}
								</Button>
							</div>
						</Modal.Footer>
					)}
				</Modal>
			)}
		</div>
	);
}
export default BankDetails;
