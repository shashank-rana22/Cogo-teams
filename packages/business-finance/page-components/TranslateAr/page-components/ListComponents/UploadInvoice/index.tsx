import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import { Refetch } from '../../../common/interfaces';

import UploadInvoiceModal from './UploadInvoiceModel';

type Props = {
	itemData: {
		id?: string,
		[key: string]: string
	};
	refetch: Refetch;
};

function UploadInvoice({ itemData, refetch }: Props) {
	const [openUpload, setOpenUpload] = useState(false);
	const [uploadProof, setUploadProof] = useState();
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
