import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import { useMemo, useEffect } from 'react';

import useCreateShipmentFortigoTripDetail from '../../../../../../../../hooks/useCreateShipmentFortigoTripDetail';
import { companyToIdMap } from '../commons/utils/companyIdMapper';
import { useFillFormData } from '../UpdateCustomerInvoice/utils/useFillFormData';

import { formControls } from './configs/formControls';

function FillCustomerPortalData({ show = false, closeModal = () => {}, shipmentData = {}, invoice = {} }) {
	const finalControls = useMemo(() => Object.values(formControls).flat(), []);

	const { loading, apiTrigger } = useCreateShipmentFortigoTripDetail({
		shipment_id            : `${shipmentData?.serial_id}`,
		invoice_combination_id : invoice?.id,
	});

	const {
		formState: { errors },
		control,
		setValue,
		watch,
	} = useForm();

	const watchCustomerName = watch('customer_name');

	useEffect(() => {
		setValue('customer_id', companyToIdMap[watchCustomerName]);
	}, [watchCustomerName, setValue]);

	return (
		<Modal
			show={show}
			closeOnOuterClick={false}
			showCloseIcon={false}
			size="xl"

		>
			<Modal.Header title="Fill Customer Portal Data" />
			<Modal.Body>
				<Layout
					control={control}
					fields={finalControls}
					errors={errors}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={closeModal} themeType="secondary">Cancel</Button>
				<Button>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default FillCustomerPortalData;
