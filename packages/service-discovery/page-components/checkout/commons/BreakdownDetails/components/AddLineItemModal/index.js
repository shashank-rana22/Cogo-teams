import { Button, Modal, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useRef } from 'react';

import useUpdateCustomizeQuotation from '../../../../hooks/useUpdateCustomizeQuotation';

import AddLineItem from './AddLineItem';
import useListRateChargeCodes from './useListRateChargeCodes';

function AddLineItemModal({ setAddLineItemData, addLineItemData, getCheckout = () => {}, setRateDetails, rate }) {
	const ref = useRef({});

	const { service_type, service_id = '', index } = addLineItemData || {};

	const { CHARGE_CODE_DATA } = useListRateChargeCodes({ service_type });

	const {
		updateCustomizeQuotation,
		loading,
	} = useUpdateCustomizeQuotation({ setAddLineItemData, rate, setRateDetails, getCheckout, index });

	const handleSubmitForm = async () => {
		await ref.current.handleSubmit().then((res) => {
			if (!res.hasError) {
				updateCustomizeQuotation({ values: res?.values });
			}
		});
	};

	return (
		<Modal
			show={!isEmpty(addLineItemData)}
			onClose={() => {
				setAddLineItemData({});
			}}
		>
			<Modal.Header title="Add Line Item" />

			<Modal.Body>
				<AddLineItem
					CHARGE_CODE_DATA={CHARGE_CODE_DATA}
					updateCustomizeQuotation={updateCustomizeQuotation}
					setAddLineItemData={setAddLineItemData}
					service_id={service_id}
					loading={loading}
					ref={ref}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					id="checkout_edit_quotation_add_line_item_btn"
					disabled={loading}
					onClick={handleSubmitForm}
				>
					{!loading ? 'Add Line Item' : 'Saving...'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddLineItemModal;
