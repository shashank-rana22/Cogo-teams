import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import { isEmpty } from '@cogoport/utils';
import React, { useContext, useEffect } from 'react';

import { getDate } from '../../helpers/getDate';
import useListShipmentContainerDetails from '../../hooks/useListShipmentContainerDetails';
import useUpdateShipmentContainerDetails from '../../hooks/useUpdateShipmentContainerDetails';

import BulkUpload from './BulkUpload';
import styles from './styles.module.css';
import getControls from './utils/getControls';

const SHIPMENT_DISABLE_STATE = ['completed', 'cancelled'];

function EditContainerDetails({ setShow = () => {}, serviceData = {} }) {
	const { shipment_data = {} } = useContext(ShipmentDetailContext);
	const disabledButton = SHIPMENT_DISABLE_STATE.includes(shipment_data?.state);

	const closeModal = () => setShow(false);
	const controls = getControls({ disabledButton });

	const { control, formState: { errors }, setValue, handleSubmit } = useForm();

	const {
		loading = false,
		data = {},
	} = useListShipmentContainerDetails({ defaultFilters: { shipment_id: serviceData.shipment_id } });

	const { onSubmit } = useUpdateShipmentContainerDetails({ setShow });

	const newValues = (data?.list || []).map((item) => {
		const {
			id = '',
			container_number = '',
			consignment_number = '',
			consignment_date = '',
			commercial_invoice_number = '',
			packages_count = '',
			gated_in_at = '',
			gated_out_at = '',
			vessel_arrived_at = '',
			vessel_departed_at = '',
			picked_up_at = '',
			empty_container_returned_at = '',
			ewb_validity = '',
			eway_bill_number = '',
		} = item;

		return ({
			id,
			container_number,
			consignment_number,
			commercial_invoice_number,
			packages_count,
			eway_bill_number,
			consignment_date            : getDate(consignment_date),
			gated_in_at                 : getDate(gated_in_at),
			gated_out_at                : getDate(gated_out_at),
			vessel_arrived_at           : getDate(vessel_arrived_at),
			vessel_departed_at          : getDate(vessel_departed_at),
			picked_up_at                : getDate(picked_up_at),
			empty_container_returned_at : getDate(empty_container_returned_at),
			ewb_validity                : getDate(ewb_validity),
		});
	});

	useEffect(() => {
		if (!isEmpty(data?.list)) {
			setValue('container_details', newValues);
		}
	}, [data?.list, setValue, newValues]);

	return (
		<Modal
			show
			closeOnOuterClick={false}
			onClose={closeModal}
			className={styles.my_modal}
			size="xl"
		>
			<Modal.Header title={(
				<h4>Update Container Details</h4>
			)}
			/>

			<Modal.Body>
				<Layout
					fields={controls}
					errors={errors}
					control={control}
				/>

			</Modal.Body>

			<Modal.Footer>

				<Button
					disabled={disabledButton || loading}
					type="button"
					onClick={handleSubmit(onSubmit)}
				>
					Update
				</Button>

				<BulkUpload disabledButton={disabledButton} shipment_id={serviceData.shipment_id} setShow={setShow} />

				<Button themeType="secondary" onClick={closeModal}>Cancel</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default EditContainerDetails;
