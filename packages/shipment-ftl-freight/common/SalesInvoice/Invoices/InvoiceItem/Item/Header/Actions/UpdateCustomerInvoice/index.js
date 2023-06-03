import { Modal, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useRef } from 'react';

import useCreateShipmentFortigoTripDetail from '../../../../../../../../hooks/useCreateShipmentFortigoTripDetail';
import useGetShipmentFortigoTripDetail from '../../../../../../../../hooks/useGetShipmentFortigoTripDetail';
import useListShipmentTradePartners from '../../../../../../../../hooks/useListShipmentTradePartners';

import { formControls } from './configs/formControls';
import Form from './Form';
import styles from './styles..module.css';
import { getFormatValue } from './utils/getFormatValue';
import { useFillFormData } from './utils/useFillFormData';

function UpdateCustomerInvoice(props) {
	const {
		show = false,
		closeModal = () => {},
		shipmentData = {},
		invoice = {},
		refetch = () => {},
	} = props;

	const formRef = useRef(null);

	const { data: tradePartnerData } = useListShipmentTradePartners({
		defaultFilters: {
			shipment_id      : shipmentData?.id,
			trade_party_type : 'shipper',
		},
		defaultParams: {
			add_service_objects_required: true,
		},
	});

	const finalControls = useMemo(() => Object.values(formControls).flat(), []);

	const shipperTradePartyPanNumber = tradePartnerData?.list?.[0]?.trade_partner_details?.registration_number;

	const { data: customData } = useGetShipmentFortigoTripDetail({
		defaultParams: {
			shipment_id                 : shipmentData?.serial_id,
			invoice_combination_id      : invoice?.id,
			shipper_registration_number : shipperTradePartyPanNumber,
		},

	});
	const defaultValues = useFillFormData({
		customData,
		finalControls,
	});

	const callback = () => {
		refetch();
		closeModal();
	};

	const { apiTrigger } = useCreateShipmentFortigoTripDetail({ refetch: callback });

	const onSubmit = (values) => {
		const formatValues = getFormatValue({
			values,
			shipment_id            : shipmentData?.id,
			invoice_combination_id : invoice?.id,
		});
		apiTrigger(formatValues);
	};

	const handleFormSubmit = () => {
		if (formRef.current) {
			formRef.current.handleSubmit(onSubmit)();
		}
	};

	return (
		<Modal
			size="xl"
			show={show}
			closeOnOuterClick={false}
			showCloseIcon={false}
		>
			<Modal.Header title="Update Customer Invoice" />
			<Modal.Body>
				{!isEmpty(defaultValues?.rate)
					? <Form defaultValues={defaultValues} finalControls={finalControls} ref={formRef} /> : null}
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_wrapper}>
					<Button
						themeType="secondary"
						onClick={() => closeModal()}
					>
						Cancel
					</Button>
					<Button onClick={handleFormSubmit}>
						Submit
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default UpdateCustomerInvoice;
