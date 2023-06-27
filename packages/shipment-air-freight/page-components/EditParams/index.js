import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useContext, useRef } from 'react';

import useUpdateShipmentBookingParamter from '../../hooks/useUpdateShipmentBookingParameter';

import ParameterDetails from './ParamterDetails';
import styles from './styles.module.css';
import checkValuesChanged from './utils/checkValuesChanged';
import getUpdateBookingParameterPaylaod from './utils/getUpdateBookingParameterPayload';

export default function EditParams({ setShow, serviceData }) {
	const { servicesList, shipment_data, refetch, refetchServices } = useContext(ShipmentDetailContext);
	const closeModal = () => setShow(false);

	const servicesToShow = (servicesList || []).filter(
		(service) => service?.service_type === `${shipment_data?.shipment_type}_service`,
	);

	const formRefs = useRef([]);

	const afterUpdateRefetch = () => {
		refetch();
		refetchServices();
		closeModal();
	};

	const { apiTrigger: updateBookingParams, loading } = useUpdateShipmentBookingParamter({
		refetch: afterUpdateRefetch,
	});

	const handleSubmit = async () => {
		const validationFlags = await Promise.all(formRefs.current.map(({ trigger }) => trigger()));
		const isFormValid = validationFlags.every((valid) => valid);

		if (isFormValid) {
			const formValues = formRefs.current.map(({ getValues }) => getValues());

			if (checkValuesChanged({ formRefs })) {
				const payload = getUpdateBookingParameterPaylaod({
					formValues, shipment_data, serviceData, servicesList,
				});

				updateBookingParams(payload);
			}
		}
	};

	return (
		<Modal
			show
			onClose={closeModal}
			closeOnOuterClick={false}
			className={styles.my_modal}
			size="lg"
			showCloseIcon={!loading}
		>
			<Modal.Header title={(
				<>
					<h4>Update Details</h4>
					<p className={styles.sub_heading}>Updating the booking details will impact the quotation(s)</p>
				</>
			)}
			/>

			<Modal.Body>
				{servicesToShow.map((service, i) => (
					<ParameterDetails
						key={service?.id}
						service={service}
						ref={(r) => { formRefs.current[i] = r; }}
					/>
				))}
			</Modal.Body>

			<Modal.Footer>
				<Button themeType="secondary" disabled={loading} onClick={closeModal}>Cancel</Button>

				<Button disabled={loading} onClick={handleSubmit}>Update</Button>
			</Modal.Footer>
		</Modal>
	);
}
