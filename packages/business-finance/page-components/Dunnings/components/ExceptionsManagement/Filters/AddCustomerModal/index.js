import { Modal, Button } from '@cogoport/components';
import { AsyncSelectController, SelectController } from '@cogoport/forms';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

const TRADE_PARTY_PARAMS = {
	filters: { status: 'active', account_type: 'importer_exporter' },

};
const SAMPLE_PDF_URL = GLOBAL_CONSTANTS.pdf_url.exception_customer_sample_url;

function AddCustomerModal({
	show = false,
	setShow = () => {},
	watch = () => {},
	control = {},
	handleSubmit = undefined,
	getUploadList = () => {},
	uploadListLoading = false,
	reset = () => {},
	showEntityFilter = true,
}) {
	const [fileValue, setFileValue] = useState('');

	const entityOptions = Object.keys(GLOBAL_CONSTANTS.cogoport_entities).map((entityValue) => (
		{
			label : String(entityValue),
			value : String(entityValue),
		}
	));

	const excludedNums = watch('excludedRegistrationNos');
	const entity = watch('entity');

	const onSubmit = (data) => {
		getUploadList({ data, fileValue, entity });
	};

	const handleClose = () => {
		setShow(false);
		reset();
	};

	const isSubmitDisable = showEntityFilter
		? ((isEmpty(excludedNums) && !fileValue) || isEmpty(entity) || uploadListLoading)
		: ((isEmpty(excludedNums) && !fileValue) || uploadListLoading);

	return (
		<Modal
			size="md"
			show={show}
			onClose={handleClose}
			placement="top"
		>
			<Modal.Header title="Add To List - Upload List" />
			<Modal.Body style={{ overflow: 'visible' }}>
				<div className={styles.body_container}>
					{showEntityFilter && (
						<div>
							<h5>Entity</h5>
							<SelectController
								name="entity"
								control={control}
								placeholder="Entity"
								options={entityOptions}
								className={styles.select}
							/>
						</div>
					)}
					<div className={styles.upload}>
						<FileUploader
							value={fileValue}
							onChange={(val) => { setFileValue(val); }}
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
					disabled={isSubmitDisable}
				>
					Submit

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddCustomerModal;
