import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import UploadInvoiceModal from './UploadInvoiceModel';

function UploadInvoice({ itemData, refetch }) {
	const [openUpload, setOpenUpload] = useState(false);
	const [uploadProof, setUploadProof] = useState(false);
	return (
		<section>
			<Button size="sm" themeType="secondary" onClick={() => setOpenUpload(true)}>
				Upload Invoice
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
