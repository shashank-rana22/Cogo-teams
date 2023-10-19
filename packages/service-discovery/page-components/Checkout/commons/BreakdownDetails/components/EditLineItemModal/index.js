import { Button, Modal } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useRef } from 'react';

import useCreateOrganizationLineItemAlias from '../../../../hooks/useCreateOrganizationLineItemAlias';
import ContainerDetails from '../ContainerDetails';

import EditLineItem from './EditLineItem';
import styles from './styles.module.css';

function EditLineItemModal({
	editLineItemData = {},
	setEditLineItemData = () => {},
	rateDetails = [],
	detail = {},
	getCheckout = () => {},
	checkoutLoading = false,
}) {
	const ref = useRef({});

	const { service_id = '', service_type = '', details = {} } = editLineItemData || {};

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
			onClose={() => setEditLineItemData({})}
		>
			<Modal.Header title="Edit Line Item (Alias Creation)" />

			<Modal.Body className={styles.body}>
				<div className={styles.flex}>
					<div className={styles.label}>{startCase(service_type)}</div>

					<div className={styles.container_details}>
						<ContainerDetails
							service_type={service_type}
							details={details}
						/>
					</div>
				</div>

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
