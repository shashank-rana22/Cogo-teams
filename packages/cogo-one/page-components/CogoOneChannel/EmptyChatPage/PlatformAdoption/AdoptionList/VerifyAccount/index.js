import { Modal, Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import AccountDetails from './AccountDetails';
import FileViewer from './FileViewer';
import styles from './styles.module.css';

function VerifyAccount({ verifyAccount = {}, setVerifyAccount = () => {} }) {
	const {
		show = false,
		showAccountDetails = false,
		accountData = [],
	} = verifyAccount || {};

	const DOCUMENT_OPTIONS = (accountData || []).map((itm) => ({
		label : startCase(itm?.document_type),
		value : itm?.document_type,
		url   : itm?.document_url,
	}));

	const [selectDoc, setSelectDoc] = useState({
		docType : DOCUMENT_OPTIONS?.[GLOBAL_CONSTANTS?.zeroth_index]?.value,
		docUrl  : DOCUMENT_OPTIONS?.[GLOBAL_CONSTANTS?.zeroth_index]?.url,
	});

	const hasDocument = isEmpty(accountData);

	const handleClose = () => {
		setSelectDoc({ docType: null, docUrl: null });
		setVerifyAccount({ show: false, accountData: [], showAccountDetails: false });
	};

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
					/>
					{/* )} */}

					{showAccountDetails ? <AccountDetails hasDocument={hasDocument} /> : null}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className={styles.cancel_button}
					themeType="secondary"
					// onClick={() => setShowReject(true)}
					// disabled={loading}
				>
					Reject
				</Button>
				<Button themeType="accent">Aprove</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default VerifyAccount;
