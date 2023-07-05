import { Modal, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/ocean-modules';
import { useEffect, useState, useContext } from 'react';

import useCreateShipmentCreditNote from '../../../../../../../../hooks/useCreateShipmentCreditNote';
import creditNoteControls from '../../../../../../helpers/creditNoteControls';
import generateDefaultValues from '../../../../../../helpers/generateDefaultValuesOfCreditNote';
import updateFormValueOfCreditNote from '../../../../../../helpers/updateFormValuesOfCreditNote';

import styles from './styles.module.css';

function PartialCN({
	show = false,
	setShow = () => {},
	invoice = {},
	refetchCN = () => {},
	invoiceData = {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const [servicesIDs, setServicesIDs] = useState([]);

	const controls = creditNoteControls({ services: invoice?.services });

	const defaultValues = generateDefaultValues({ values: controls });

	const { handleSubmit, control, watch, formState:{ errors = {} } } =	useForm({ defaultValues });
	const formValues = watch();

	const updatedObj = updateFormValueOfCreditNote({ formValues });

	const afterRefetch = () => {
		setShow(false);
		refetchCN();
	};
	const { onCreate, loading } = useCreateShipmentCreditNote({
		refetch: afterRefetch,
		servicesIDs,
		invoice,
		invoiceData,
	});

	useEffect(() => {
		const servicesID = invoice?.services?.map((service) => (service?.service_id)) || [];
		setServicesIDs(...servicesID);
	}, [invoice?.services]);

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
						disabled={loading}
					>
						Cancel

					</Button>
					<Button
						type="button"
						onClick={handleSubmit(onCreate)}
						disabled={loading}
					>
						Request
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default PartialCN;
