import { Modal, Button } from '@cogoport/components';
import React, { useEffect, useState } from 'react';

import Layout from '../../../../../../Tasks/TaskExecution/helpers/Layout';

import useCreateCreditNoteHelper from './helpers/useCreateCreditNoteHelper';
import styles from './styles.module.css';

function RequestCN({
	show = false,
	setShow = () => {},
	shipment_serial_id = '',
	invoice = {},
	refetchCN = () => {},
	invoiceData = {},
}) {
	const [servicesIDs, setServicesIDs] = useState([]);

	const services = invoice?.services || [];

	useEffect(() => {
		const servicesID = [];
		invoice?.services?.forEach((service) => {
			servicesID.push(service?.service_id);
		});

		setServicesIDs(servicesID);
	}, [invoice?.services]);

	const {
		controls,
		errors,
		control,
		defaultValues,
		handleSubmit,
		onCreate,
	} = useCreateCreditNoteHelper({
		setShow,
		services,
		invoice,
		servicesIDs,
		refetchCN,
		invoiceData,
	});
	return (
		<Modal show={show} onClose={() => setShow(false)} size="xl">
			<Modal.Header title="REQUEST CREDIT NOTE" />
			<Modal.Body>
				<div className={styles.div}>
					<div className={styles.bold_text}>
						SID
						&nbsp;
						{shipment_serial_id}
						&nbsp;
						- Invoice number -
						&nbsp;
						<div className={styles.underLined_text}>{invoice?.live_invoice_number}</div>
					</div>
				</div>
				<Layout
					control={control}
					fields={controls}
					errors={errors}
					customValues={defaultValues}
				/>

			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_wrap}>
					<Button themeType="secondary">Cancel </Button>
					<Button
						type="button"
						onClick={handleSubmit(onCreate)}
					>
						Request
					</Button>
				</div>
			</Modal.Footer>

		</Modal>
	);
}

export default RequestCN;
