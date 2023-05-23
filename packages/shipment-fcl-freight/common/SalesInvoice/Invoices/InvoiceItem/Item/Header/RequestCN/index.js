import { Modal, Button, Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState, useContext } from 'react';

import useCreateShipmentCreditNote from '../../../../../../../hooks/useCreateShipmentCreditNote';
import Layout from '../../../../../../Tasks/TaskExecution/helpers/Layout';
import formatCreditNoteData from '../../../../../CreditNote/helpers/format-credit-note-data';
import creditNoteControls from '../../../../../helpers/creditNoteControls';
import generateDefaultValues from '../../../../../helpers/generateDefaultValuesOfCreditNote';
import updateFormValueOfCreditNote from '../../../../../helpers/updateFormValuesOfCreditNote';

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

<<<<<<< Updated upstream
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
=======
	const controls = creditNoteControls({
		services,
>>>>>>> Stashed changes
	});

	const defaultValues = generateDefaultValues({ values: controls });

	const { handleSubmit, control, watch, formState:{ errors = {} } } =	useForm({ defaultValues });
	const formValues = watch();

	const updatedObj = updateFormValueOfCreditNote({ formValues });

	const afterRefetch = () => {
		setShow(false);
		refetchCN();
	};
	const { apiTrigger } = useCreateShipmentCreditNote({ refetch: afterRefetch });

	const onCreate = async (data) => {
		const { submit_data, checkError } = formatCreditNoteData({
			data,
			servicesIDs,
			invoice,
			invoiceData,
		});

		if (submit_data?.line_items?.length === 0) {
			Toast.error('Line Items is required');
		}
		let isError = false;
		Object.keys(checkError).forEach((key) => {
			checkError[key].forEach((t) => {
				if (!isEmpty(t)) {
					isError = true;
				}
			});
		});

		if (isError === false) {
			await apiTrigger(submit_data);
		}
	};

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
					customValues={updatedObj}
				/>

			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_wrap}>
					<Button
						themeType="secondary"
						onClick={() => setShow(false)}
					>
						Cancel

					</Button>
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
