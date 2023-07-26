import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useRef } from 'react';

import useCreateOrganizationLineItemAlias from '../../../../hooks/useCreateOrganizationLineItemAlias';

import EditLineItem from './EditLineItem';

function EditLineItemModal({
	editLineItemData = {},
	setEditLineItemData = () => {},
	rateDetails = [],
	detail = {},
	getCheckout = () => {},
	checkoutLoading = false,
}) {
	const ref = useRef({});

	const { service_id = '', service_type = '' } = editLineItemData || {};

	const { createOrganizationLineItemAlias, loading } = useCreateOrganizationLineItemAlias({
		setEditLineItemData,
		getCheckout,
	});

	const handleSubmitForm = async () => {
		await ref.current.handleSubmit().then((res) => {
			if (!res.hasError) {
				createOrganizationLineItemAlias({ values: res?.values });
			}
		});
	};

	const serviceObject = rateDetails.find((item) => item.id === service_id) || {};

	const lineItems = (serviceObject?.line_items || []).reduce((acc, cur) => {
		if (!acc.map((item) => item.value).includes(cur?.value)) {
			return [...acc, { label: cur?.name, value: cur?.name }];
		}

		return acc;
	}, []);

	return (
		<Modal
			show={!isEmpty(editLineItemData)}
			onClose={() => {
				setEditLineItemData({});
			}}
		>
			<Modal.Header title="Edit Line Item (Alias Creation)" />

			<Modal.Body>
				<EditLineItem
					ref={ref}
					lineItemOptions={lineItems}
					service_type={service_type}
					lineItems={serviceObject.line_items}
					detail={detail}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button loading={loading || checkoutLoading} onClick={handleSubmitForm}>
					{!loading && !checkoutLoading ? 'Edit Line Item' : 'Saving...'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditLineItemModal;
