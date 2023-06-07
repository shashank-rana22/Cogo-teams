import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import { useMemo, useEffect, useState } from 'react';

import useCreateShipmentFortigoTripDetail from '../../../../../../../../hooks/useCreateShipmentFortigoTripDetail';
import useListShipmentTradePartners from '../../../../../../../../hooks/useListShipmentTradePartners';
import { formControls } from '../commons/controls/formControls';
import { companyToIdMap } from '../commons/utils/companyIdMapper';
import { getFormatValue } from '../commons/utils/getFormatValue';

import getFieldLikeControls from './utils/getFieldLikeControls';
import { getFormatPrefillValues } from './utils/getFormatPrefillValues';

function FillCustomerPortalData({
	show = false,
	closeModal = () => {},
	shipmentData = {},
	invoice = {},
}) {
	const [customerObj, setCustomerObj] = useState({});

	const controls = useMemo(() => Object.values(formControls).flat(), []);

	const { data } = useListShipmentTradePartners({
		defaultFilters: {
			shipment_id: shipmentData?.id,
		},
		defaultParams: {
			add_service_objects_required: true,
		},
	});

	const defaultValues = getFormatPrefillValues({ data, invoice, customerObj });

	const {
		formState: { errors },
		control,
		setValue,
		handleSubmit,
		watch,
	} = useForm({ defaultValues });

	const fieldsLikeControls = getFieldLikeControls({ controls, shipmentData, setValue, setCustomerObj, customerObj });

	const watchCustomerName = watch('customer_name');

	useEffect(() => {
		setValue('customer_id', companyToIdMap[watchCustomerName]);
	}, [watchCustomerName, setValue]);

	const { loading, apiTrigger } = useCreateShipmentFortigoTripDetail();

	const onSubmit = (values) => {
		const payload = getFormatValue({
			values,
			shipment_id            : `${shipmentData?.serial_id}`,
			invoice_combination_id : invoice?.id,
		});
		apiTrigger(payload);
	};

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
					fields={fieldsLikeControls}
					errors={errors}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={closeModal} themeType="secondary" disabled={loading}>Cancel</Button>
				<Button onClick={handleSubmit(onSubmit)} disabled={loading}>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default FillCustomerPortalData;
