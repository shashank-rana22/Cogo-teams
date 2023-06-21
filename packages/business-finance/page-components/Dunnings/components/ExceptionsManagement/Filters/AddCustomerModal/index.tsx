import { Modal, Button } from '@cogoport/components';
import { AsyncSelectController } from '@cogoport/forms';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDownload } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { AddCustomerInterface } from '../../Interfaces';

import styles from './styles.module.css';

const TRADE_PARTY_PARAMS = {
	filters: { status: 'active', account_type: 'importer_exporter' },

};
const SAMPLE_PDF_URL = GLOBAL_CONSTANTS.pdf_url.exception_customer_sample_url;

function AddCustomerModal({
	show,
	setShow,
	watch,
	control,
	handleSubmit,
	getUploadList,
	uploadListLoading,
}:AddCustomerInterface) {
	const [fileValue, setFileValue] = useState('');

	const selectCustomerName = watch();

	const onSubmit = (data) => {
		getUploadList(data, fileValue);
	};

	return (
		<Modal size="md" show={show} onClose={() => setShow(false)}>
			<Modal.Header title="Add To List - Upload List" />
			<Modal.Body>
				<div className={styles.body_container}>
					<div className={styles.upload}>
						<FileUploader
							value={fileValue}
							onChange={(val:string) => { setFileValue(val); }}
							showProgress
							draggable
							accept=".csv,.xlsx"
						/>
						<div className={styles.download_container}>
							<p className={styles.sample_text}>Sample</p>
							<IcMDownload
								width={16}
								height={16}
								cursor="pointer"
								onClick={() => window.open(SAMPLE_PDF_URL, '_blank')}

							/>
						</div>
					</div>

					<div className={styles.heading}>
						Or Add Customer
					</div>
					<AsyncSelectController
						control={control}
						name="excludedRegistrationNos"
						asyncKey="list_trade_parties"
						placeholder="Search Customer Name"
						valueKey="registration_number"
						multiple
						isClearable
						initialCall
						style={{ width: '50%' }}
						params={TRADE_PARTY_PARAMS}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div style={{ margin: '6px 20px' }}>Current Data is subjected to change upon submission.</div>
				<Button
					onClick={handleSubmit(onSubmit)}
					disabled={(!selectCustomerName?.excludedRegistrationNos?.length && !fileValue) || uploadListLoading}
				>
					Submit

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddCustomerModal;
