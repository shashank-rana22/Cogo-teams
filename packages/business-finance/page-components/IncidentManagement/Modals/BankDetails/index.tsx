import { RadioGroup, Textarea, Modal, Button } from '@cogoport/components';
import { IcMEyeopen } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetBankData from '../../apisModal/useGetBankData';
import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

import { optionsManual, options } from './constant';
import styles from './styles.module.css';

function BankDetails({
	bankData,
	bankId,
	organization,
	refetch,
	row,
	isEditable = true,
	remark = '',
}) {
	const { push } = useRouter();
	const {
		accountNumber,
		bankHolderName,
		bankName,
		branchName,
		documentUrls,
		ifscCode,
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
					<Modal.Header title="Bank Account - Add/Edit" />
					<Modal.Body>
						{!isEditable && <ApproveAndReject row={row} />}
						<div className={styles.name_data}>
							<div>Organization Name - </div>
							<div role="presentation" onClick={() => checkData()} className={styles.name}>
								{tradePartyType === 'SELF'
									? businessName || '-' : tradePartyName || '-'}

							</div>

						</div>
						<div className={styles.name_data}>
							<div>Trade Party Type - </div>
							<div className={styles.party_name}>
								{startCase(tradePartyType) || '-'}
							</div>
						</div>

						<div className={styles.name_data}>
							<div>Category - </div>
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
							<div className={styles.simple_name}>Bank Holder Name </div>
							<div className={styles.flex}>
								<div className={styles.font_name}>{startCase(bankHolderName) || '-'}</div>
								<div>
									<RadioGroup
										options={options(isEditable)}
										onChange={(item: string) => setValue((prev) => ({ ...prev, radioName: item }))}
										value={value?.radioName}
									/>
								</div>
							</div>

							<div className={styles.simple_name}>Account Number </div>
							<div className={styles.flex}>
								<div className={styles.font_name}>{accountNumber || '-'}</div>
								<div>
									<RadioGroup
										options={options(isEditable)}
										onChange={(item: string) => setValue((prev) => ({
											...prev,
											radioNumber: item,
										}))}
										value={value?.radioNumber}
									/>
								</div>
							</div>

							<div className={styles.simple_name}>Bank & Branch Name </div>

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
										options={options(isEditable)}
										onChange={(item: string) => setValue((prev) => ({
											...prev,
											radioBranchName: item,
										}))}
										value={value?.radioBranchName}
									/>
								</div>
							</div>

							<div className={styles.simple_name}>IFSC Code</div>

							<div className={styles.flex}>
								<div className={styles.font_name}>
									{ifscCode || '-'}
								</div>
								<div>
									<RadioGroup
										options={options(isEditable)}
										onChange={(item: string) => setValue((prev) => ({
											...prev,
											radioIFSC: item,
										}))}
										value={value?.radioIFSC}
									/>
								</div>
							</div>

							<div className={styles.flex}>
								<div className={styles.font_name}>Method of Verification</div>
								<div>
									<RadioGroup
										options={optionsManual(isEditable)}
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
								Remark -
								<div className={styles.font_name}>
									{remark || '-'}
								</div>
							</div>
						)}
						<div className={styles.document_flex}>
							<div className={styles.document}>Document -</div>
							{documentUrls?.map((url:any) => (url !== '' ? (
								<a href={url} target="_blank" rel="noreferrer">
									<div className={styles.view_flex}>
										<div className={styles.view}>View Document</div>
										<IcMEyeopen />
									</div>
								</a>
							) : (
								<div> No document available</div>
							)))}
						</div>
						{isEditable && (
							<>
								<div className={styles.remarks}>Remarks*</div>
								<Textarea
									name="remark"
									size="md"
									placeholder="Enter Remark Here..."
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
						</Modal.Footer>
					)}
				</Modal>
			)}
		</div>
	);
}
export default BankDetails;
