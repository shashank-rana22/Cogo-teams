import { Modal, Button, Toast } from '@cogoport/components';
import React from 'react';
import { useForm } from 'react-hook-form';

import Layout from '../../../../../../RfqEnquiries/Layout';
import newServiceProvider from '../../../../../configurations/controls/addNewServiceProviderControl';
import { DEFAULT_VALUE } from '../../../../../configurations/helpers/constants';
import useUpdateFlashBookingRate from '../../../../../hooks/useUpdateFlashBookingRate';

function NewServiceProviderModal({
	serviceModal = false, setServiceModal = () => {},
	flashBookingRates = {}, filter = {},
}) {
	const { updateFlashBookingRate, loading } = useUpdateFlashBookingRate();
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const handleSubmitData = async (val) => {
		const resp = await updateFlashBookingRate({
			newServiceProviderData : val,
			falshBookingLineItems  : flashBookingRates?.list?.[DEFAULT_VALUE],
			filter,
		});
		if (resp === 200) {
			Toast.success('Price Successfully Reverted');
			setServiceModal(false);
		}
	};
	return (
		<Modal size="lg" show={serviceModal} onClose={() => setServiceModal(false)} placement="top">
			<Modal.Header title="Your Price" />
			<Modal.Body>
				<Layout
					fields={newServiceProvider}
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
