import { Modal, Button } from '@cogoport/components';
import { useForm, AsyncSelectController } from '@cogoport/forms';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import React, { useState } from 'react';

import useAddUploadList from '../../../../hooks/useAddUploadList';

import styles from './styles.module.css';

function AddCustomerModal({
	show, setShow,
	subTabsValue,

}) {
	const [fileValue, setFileValue] = useState('');
	const onClose = () => {
		setShow((pv) => !pv);
	};
	const { getUploadList, uploadListLoading } = useAddUploadList({ onClose, subTabsValue });
	const { control, handleSubmit, watch } = useForm();

	const selectCustomerName = watch();

	const onSubmit = (data) => {
		getUploadList(data, fileValue);
	};
	console.log(subTabsValue, 'subTabsValue');

	return (
		<Modal size="md" show={show} onClose={onClose}>
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
						rules={{ required: true }}
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
