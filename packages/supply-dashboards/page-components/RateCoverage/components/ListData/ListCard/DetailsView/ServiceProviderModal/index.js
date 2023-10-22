import { Modal, Button, Toast } from '@cogoport/components';
import React from 'react';
import { useForm } from 'react-hook-form';

import Layout from '../../../../../../RfqEnquiries/Layout';
import newServiceProviderControls from '../../../../../configurations/controls/addNewServiceProviderControl';
import useUpdateFlashBookingRate from '../../../../../hooks/useUpdateFlashBookingRate';

function NewServiceProviderModal({
	serviceModal = false, setServiceModal = () => {},
	filter = {}, shipment_data = {}, data = {},
}) {
	const { updateFlashBookingRate, loading } = useUpdateFlashBookingRate({
		filter,
		shipment_data,
		data,
	});
	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm();

	const handleSubmitData = async (values) => {
		const resp = await updateFlashBookingRate({
			manualRevertData : values,
			isManual         : true,
		});
		if (resp === 200) {
			Toast.success('Price Successfully Reverted');
			setServiceModal(false);
		}
	};

	const service_provider_id = watch('service_provider_id');
	const fields = newServiceProviderControls.map((ctr) => {
		if (ctr.name === 'sourced_by_id') {
			return { ...ctr, params: { filters: { organization_id: service_provider_id } } };
		}
		return ctr;
	});

	return (
		<Modal size="lg" show={serviceModal} onClose={() => setServiceModal(false)} placement="top">
			<Modal.Header title="Your Price" />
			<Modal.Body>
				<Layout
					fields={fields}
					control={control}
					errors={errors}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={() => setServiceModal()}
					style={{ marginRight: '10px' }}
					themeType="secondary"
				>
					close
				</Button>
				<Button onClick={handleSubmit(handleSubmitData)} disabled={loading}>Add</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default NewServiceProviderModal;
