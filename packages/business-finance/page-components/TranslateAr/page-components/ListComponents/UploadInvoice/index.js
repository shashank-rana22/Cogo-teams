import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';
import UploadInvoiceModal from './UploadInvoiceModel';

function UploadInvoice({ itemData, refetch }) {
	const [openUpload, setOpenUpload] = useState(false);
	const [uploadProof, setUploadProof] = useState();
	return (
		<section className={styles.section}>
			<Button size="sm" themeType="secondary" onClick={() => setOpenUpload(true)}>
				<span className={styles.text}>Upload Invoice</span>
			</Button>
			{openUpload && (
				<UploadInvoiceModal
					setOpen={setOpenUpload}
					uploadProof={uploadProof}
					setUploadProof={setUploadProof}
					itemData={itemData}
					refetch={refetch}
					open={openUpload}
				/>
			)}
		</section>
	);
}

export default UploadInvoice;
