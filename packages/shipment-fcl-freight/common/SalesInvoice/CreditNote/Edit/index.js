import { Modal, Button } from '@cogoport/components';
import { TextAreaController, UploadController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React from 'react';

import useGetShipmentCreditNote from '../../../../hooks/useGetShipmentCreditNote';

import styles from './styles.module.css';

function Edit({
	setOpen,
	CNstatusMapping,
	serial_id,
	prevData,
	item = {},
	refetch = () => {},
	invoiceData = {},
}) {
	const { id, live_invoice_number, status } = item || {};

	const { data, loading } = useGetShipmentCreditNote({
		defaultParams: {
			id,
		},
	});

	const { control } = useForm();

	return (
		<Modal
			show
			onClose={() => setOpen(false)}
			size="lg"
		>
			<Modal.Header title={(
				<header className={styles.heading}>
					EDIT CREDIT NOTE
					<div className={`${styles[CNstatusMapping[status]]} ${styles.status_text}`}>
						{status === 'rejected' ? <div>!</div> : null}
						{startCase(CNstatusMapping[status])}
					</div>
				</header>
			)}
			/>

			<Modal.Body>
				<div style={{ fontSize: 14 }}>
					<b>
						SID
						{serial_id}
						&nbsp;- Invoice number -
						&nbsp;
						<u>{live_invoice_number}</u>
					</b>
				</div>

				<div>
					<b>Requested By</b>
					<span>
						&nbsp;
						-
						{data?.requested_by?.name}
					</span>
				</div>
				<div>
					<b>Date</b>
					<span>
						&nbsp;
						-
						{formatDate({
							date       : data?.created_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</span>
				</div>
				<form>
					<TextAreaController
						name="details"
						control={control}
					/>
					<UploadController
						name="file"
						control={control}
					/>
				</form>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.button_wrapper}>
					<Button themeType="secondary" onClick={() => setOpen(false)}>
						Cancel
					</Button>

					<Button>
						Re-Apply
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default Edit;
