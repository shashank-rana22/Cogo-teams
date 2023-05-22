import { Modal, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import React, { useEffect, useState, useContext } from 'react';

import Layout from '../../../../../../Tasks/TaskExecution/helpers/Layout';

import useCreateCreditNoteHelper from './helpers/useCreateCreditNoteHelper';
import styles from './styles.module.css';

function RequestCN({
	show = false,
	setShow = () => {},
	invoice = {},
	refetchCN = () => {},
	invoiceData = {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const [servicesIDs, setServicesIDs] = useState([]);

	useEffect(() => {
		const servicesID = invoice?.services?.map((service) => (service?.service_id)) || [];
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
		services: invoice?.services,
		invoice,
		servicesIDs,
		refetchCN,
		invoiceData,
	});
	return (
		<Modal show={show} onClose={() => setShow(false)} size="xl" closeOnOuterClick={false}>
			<Modal.Header title="REQUEST CREDIT NOTE" />
			<Modal.Body>
				<div className={styles.div}>
					<div className={styles.bold_text}>
						{`SID ${shipment_data?.serial_id} - Invoice number -`}
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
