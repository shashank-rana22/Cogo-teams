import { RadioGroup, Textarea, Modal, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetBankData from '../../apisModal/useGetBankData';

import styles from './styles.module.css';

function BankDetails({
	bankData,
	bankId,
	organization,
	refetch,
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
	});

	const options = [
		{
			label : 'Approve',
			value : 'true',
		},
		{
			label : 'Reject',
			value : 'false',
		}];

	const optionsManual = [
		{ label: 'Penny Testing', value: 'PENNY' },
		{ label: 'Manual Verification', value: 'MANUAL' },
	];

	const onApprove = () => {
		OnAction(value, 'APPROVED');
	};

	const onReject = () => {
		OnAction(value, 'REJECTED');
	};

	const {
		tradePartyType,
		id,
		tradePartyName,
		businessName,
	} = organization || {};

	const checkData = () => {
		push('/details/supply/[organization_id]', `/details/supply/${id}`);
	};

	return (
		<div>
			<div>
				<Button
					style={{ height: '30px', fontSize: '12px', width: '70px', fontWeight: '600' }}
					themeType="secondary"
					onClick={() => {
						setShowBankModal(true);
					}}
				>
					View
				</Button>
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
						<div className={styles.name_data}>
							<div>Organization Name - </div>
							<div role="presentation" onClick={() => checkData()} className={styles.name}>
								{tradePartyType === 'SELF'
									? businessName : tradePartyName}

							</div>

						</div>
						<div className={styles.name_data}>
							<div>Trade Party Type - </div>
							<div className={styles.party_name}>
								{startCase(tradePartyType)}
							</div>
						</div>

						<div className={styles.border} />

						<div>
							<div className={styles.simple_name}>Bank Holder Name </div>
							<div className={styles.flex}>
								<div className={styles.font_name}>{startCase(bankHolderName)}</div>
								<div>
									<RadioGroup
										options={options}
										onChange={(item: string) => setValue((prev) => ({ ...prev, radioName: item }))}
										value={value?.radioName}
									/>
								</div>
							</div>

							<div className={styles.simple_name}>Account Number </div>
							<div className={styles.flex}>
								<div className={styles.font_name}>{accountNumber}</div>
								<div>
									<RadioGroup
										options={options}
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
									{startCase(bankName)}

									<div className={styles.branch_name}>
										-
										{startCase(branchName)}
									</div>
								</div>
								<div>
									<RadioGroup
										options={options}
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
									{ifscCode}
								</div>
								<div>
									<RadioGroup
										options={options}
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
										options={optionsManual}
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
									{remark}
								</div>
							</div>
						)}
						<div className={styles.document_flex}>
							<div className={styles.document}>Document -</div>
							{documentUrls?.map((url:any) => (url !== '' ? (
								<a href={url} target="_blank" rel="noreferrer">
									{url.split('/')[4]}
								</a>
							) : (
								<div> No document available</div>
							)))}
						</div>
						<div className={styles.remarks}>Remarks*</div>
						<Textarea
							name="remark"
							size="md"
							placeholder="Enter Remark Here..."
							onChange={(v: string) => setValue((prev) => ({ ...prev, text: v }))}
							style={{ width: '700', height: '100px', marginBottom: '12px' }}
						/>

					</Modal.Body>
					{isEditable && (
						<Modal.Footer>
							<div className={styles.button}>
								<Button
									size="md"
									themeType="secondary"
									style={{ marginRight: '8px' }}
									disabled={!(value?.text.length) || loading}
									onClick={() => {
										onReject();
									}}
								>
									Reject
								</Button>

								<Button
									size="md"
									style={{ marginRight: '8px' }}
									disabled={!(value?.text.length) || loading}
									onClick={() => {
										onApprove();
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
