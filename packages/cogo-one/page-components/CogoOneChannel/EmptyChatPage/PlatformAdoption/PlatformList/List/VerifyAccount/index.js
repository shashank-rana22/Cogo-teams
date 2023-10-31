import { Modal, Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, isEmpty } from '@cogoport/utils';
import { useMemo, useState } from 'react';

import { getOrgId } from '../../../../../../../utils/platformAdoption';

import AccountDetails from './AccountDetails';
import FileViewer from './FileViewer';
import styles from './styles.module.css';

function VerifyAccount({
	verifyAccount = {}, setVerifyAccount = () => {}, setRejectAccount = () => {},
	verifyKyc = () => {}, loading = false, updateDocument = () => {},
}) {
	const {
		show = false,
		showAccountDetails = false,
		accountData = [],
		orgData = {},
		verifyType = '',
		accountType = '',
	} = verifyAccount || {};

	const { documents = [], id = '' } = orgData || {};

	const [checked, setChecked] = useState(false);
	const [selectDoc, setSelectDoc] = useState({
		docType : '',
		docUrl  : '',
	});

	const documentOptions = useMemo(() => (accountData || []).map((itm) => ({
		label : startCase(itm?.document_type),
		value : itm?.document_type,
		url   : itm?.image_url,
	})), [accountData]);

	const hasDocument = isEmpty(accountData);

	const handleClose = () => {
		setSelectDoc({ docType: null, docUrl: null });
		setChecked(false);
		setVerifyAccount({ show: false, accountData: [], showAccountDetails: false });
	};

	const handleApprove = (status) => {
		if (verifyType === 'trade_party' && !showAccountDetails) {
			updateDocument({ val: documents?.[GLOBAL_CONSTANTS.zeroth_index] || {}, status });
		} else {
			verifyKyc({
				orgId         : getOrgId({ orgData })?.[accountType],
				type          : status,
				requestId     : id,
				requestStatus : 'processing',
			});
		}
	};

	const handleReject = () => {
		if (verifyType === 'trade_party' && !showAccountDetails) {
			updateDocument({ val: documents?.[GLOBAL_CONSTANTS.zeroth_index] || {}, status: 'rejected' });
		} else {
			setVerifyAccount((prev) => ({ ...prev, show: false }));
			setRejectAccount(() => ({ show: true }));
		}
	};

	if (!show) {
		return null;
	}

	return (
		<Modal
			size="lg"
			show={show}
			scroll={false}
			onClose={handleClose}
			className={cl`${!showAccountDetails || hasDocument ? styles.only_docs : styles.with_docs}`}
			placement="fullscreen"
			closeOnOuterClick={handleClose}
		>
			<Modal.Header title="KYC Documents Verification" />
			<Modal.Body>
				<div className={styles.container}>
					<FileViewer
						verifyAccount={verifyAccount}
						documentOptions={documentOptions}
						selectDoc={selectDoc}
						setSelectDoc={setSelectDoc}
						hasDocument={hasDocument}
					/>

					{showAccountDetails ? (
						<AccountDetails
							hasDocument={hasDocument}
							orgData={orgData}
							verifyType={verifyType}
							setChecked={setChecked}
							checked={checked}
						/>
					) : null}
				</div>
			</Modal.Body>
			<Modal.Footer>
				{!showAccountDetails && verifyType !== 'trade_party'
					? <Button themeType="accent" onClick={handleClose}>Close</Button> : (
						<>
							<Button
								className={styles.cancel_button}
								themeType="secondary"
								onClick={() => handleReject()}
								disabled={loading}
							>
								Reject
							</Button>
							<Button
								themeType="accent"
								onClick={() => handleApprove('verified')}
								loading={loading}
								disabled={!checked && showAccountDetails}
							>
								Aprove
							</Button>
						</>
					)}
			</Modal.Footer>
		</Modal>
	);
}

export default VerifyAccount;
