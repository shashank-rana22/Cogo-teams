/* eslint-disable max-len */
import { Modal, Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import AccountDetails from './AccountDetails';
import FileViewer from './FileViewer';
import styles from './styles.module.css';

const DOCUMENT = [
	{
		image_url     : 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
		document_type : 'dummy.pdf',
	},
	{
		image_url     : 'https://cogoport-production.sgp1.digitaloceanspaces.com/9c919e884e651b4e58ffee79479c8a23/GST%20CERTIFICATE%20PAGE-1.pdf',
		document_type : 'gst.pdf',
	},
];

function VerifyAccount({ verifyAccount = {}, setVerifyAccount = () => {} }) {
	const {
		show = false,
		showAccountDetails = false,
		// accountData = {},
	} = verifyAccount || {};

	const DOCUMENT_OPTIONS = (DOCUMENT || []).map((itm) => ({
		label : startCase(itm?.document_type),
		value : itm?.document_type,
		url   : itm?.image_url,
	}));

	const [selectDoc, setSelectDoc] = useState({
		docType : DOCUMENT_OPTIONS?.[GLOBAL_CONSTANTS?.zeroth_index]?.value,
		docUrl  : DOCUMENT_OPTIONS?.[GLOBAL_CONSTANTS?.zeroth_index]?.url,
	});

	return (
		<Modal
			size="lg"
			show={show}
			scroll={false}
			onClose={() => {
				setVerifyAccount({ show: false, accountData: {}, showAccountDetails: false });
			}}
			className={cl`${!showAccountDetails ? styles.only_docs : styles.with_docs}`}
			placement="top"
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
					{showAccountDetails ? <AccountDetails /> : null}
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
