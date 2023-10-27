import { Modal, Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, isEmpty } from '@cogoport/utils';
import { useMemo, useState } from 'react';

import { getOrgId } from '../../../../../../../utils/platformAdoption';

import AccountDetails from './AccountDetails';
import FileViewer from './FileViewer';
import styles from './styles.module.css';

// const DUMMY_PDF = [{
// 	id            : '5667e89d-1d32-44f9-a482-f7fb7edc7fc3',
// 	document_type : 'booking_proof',
// 	state         : 'document_accepted',
// 	document_url  : 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
// 	data          : null,
// 	created_at    : '2022-10-12T09:59:48.237Z',
// 	updated_at    : '2022-10-12T09:59:48.379Z',
// 	source        : null,
// }];

function VerifyAccount({
	verifyAccount = {}, setVerifyAccount = () => {}, setRejectAccount = () => {},
	verifyDocument = () => {}, loading = false, updateDocument = () => {},
}) {
	const {
		show = false,
		showAccountDetails = false,
		accountData = [],
		orgData = {},
		verifyType = '',
		accountType = '',
	} = verifyAccount || {};

	const [checked, setChecked] = useState(false);

	const { documents = [] } = orgData || {};

	const DOCUMENT_OPTIONS = useMemo(() => (accountData || []).map((itm) => ({
		label : startCase(itm?.document_type),
		value : itm?.document_type,
		url   : itm?.image_url,
	})), [accountData]);

	const [selectDoc, setSelectDoc] = useState({
		docType : '',
		docUrl  : '',
	});

	// const hasDocument = isEmpty(DUMMY_PDF);
	const hasDocument = isEmpty(accountData);

	// const DOCUMENT_OPTIONS = useMemo(() => (DUMMY_PDF || []).map((itm) => ({
	// 	label : startCase(itm?.document_type),
	// 	value : itm?.document_type,
	// 	url   : itm?.document_url,
	// })), []);

	const handleClose = () => {
		setSelectDoc({ docType: null, docUrl: null });
		setVerifyAccount({ show: false, accountData: [], showAccountDetails: false });
	};

	const handleApprove = (status) => {
		if (verifyType === 'trade_party' && !showAccountDetails) {
			updateDocument({ val: documents?.[GLOBAL_CONSTANTS.zeroth_index] || {}, status });
		} else {
			verifyDocument({
				orgId : getOrgId({ orgData })?.[accountType],
				type  : status,
			});
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
			placement="top"
			closeOnOuterClick={handleClose}
		>
			<Modal.Header title="KYC Documents Verification" />
			<Modal.Body>
				<div className={styles.container}>
					<FileViewer
						verifyAccount={verifyAccount}
						documentOptions={DOCUMENT_OPTIONS}
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
								onClick={() => {
									setVerifyAccount((prev) => ({ ...prev, show: false }));
									setRejectAccount(() => ({ show: true }));
								}}
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
