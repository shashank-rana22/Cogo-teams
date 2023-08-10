import { Modal, Button } from '@cogoport/components';
import FooterButtonWrapper from '@cogoport/surface-modules/common/FooterButtonWrapper';
import { useMemo, useRef } from 'react';

import useCreateShipmentFortigoTripDetail from '../../../../../../../../hooks/useCreateShipmentFortigoTripDetail';
import useGetShipmentFortigoTripDetail from '../../../../../../../../hooks/useGetShipmentFortigoTripDetail';
import useListShipmentTradePartners from '../../../../../../../../hooks/useListShipmentTradePartners';
import { formControls } from '../commons/controls/formControls';
import { getFormatValue } from '../commons/utils/getFormatValue';

import Form from './Form';
import { useFillFormData } from './utils/useFillFormData';

function UpdateCustomerInvoice(props) {
	const {
		setShowModal = () => {},
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

	const [firstElement = {}] = tradePartnerData?.list || [];
	const { trade_partner_details: { registration_number: shipperTradePartyPanNumber } = {} } = firstElement;

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
		setShowModal(false);
	};

	const { apiTrigger } = useCreateShipmentFortigoTripDetail({ refetch: callback });

	const onSubmit = (values) => {
		const formatValues = getFormatValue({
			values,
			shipment_id            : `${shipmentData?.serial_id}`,
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
			show
			closeOnOuterClick={false}
			showCloseIcon={false}
		>
			<Modal.Header title="Update Customer Invoice" />
			<Modal.Body>
				<Form defaultValues={defaultValues} finalControls={finalControls} ref={formRef} />
			</Modal.Body>
			<Modal.Footer>
				<FooterButtonWrapper>
					<Button
						themeType="secondary"
						onClick={() => setShowModal(false)}
					>
						Cancel
					</Button>
					<Button onClick={handleFormSubmit}>
						Submit
					</Button>
				</FooterButtonWrapper>
			</Modal.Footer>
		</Modal>
	);
}

export default UpdateCustomerInvoice;
