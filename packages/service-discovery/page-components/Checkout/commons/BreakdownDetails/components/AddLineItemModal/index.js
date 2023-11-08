import { Button, Modal } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useRef } from 'react';

import useUpdateCustomizeQuotation from '../../../../hooks/useUpdateCustomizeQuotation';
import ContainerDetails from '../ContainerDetails';

import AddLineItem from './AddLineItem';
import styles from './styles.module.css';
import useListRateChargeCodes from './useListRateChargeCodes';

function AddLineItemModal({
	setAddLineItemData = () => {},
	addLineItemData = {},
	checkout_id = '',
	getCheckout = () => {},
	checkoutLoading = false,
}) {
	const ref = useRef({});

	const { service_type, service_id = '', details = {}, addedLineItems = [] } = addLineItemData || {};

	const { CHARGE_CODE_DATA } = useListRateChargeCodes({ service_type });

	const { updateCustomizeQuotation, loading } = useUpdateCustomizeQuotation({
		setAddLineItemData,
		getCheckout,
	});

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

				<AddLineItem
					CHARGE_CODE_DATA={CHARGE_CODE_DATA}
					service_id={service_id}
					ref={ref}
					checkout_id={checkout_id}
					addedLineItems={addedLineItems}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					id="checkout_edit_quotation_add_line_item_btn"
					loading={loading || checkoutLoading}
					onClick={handleSubmitForm}
				>
					{!loading && !checkoutLoading ? 'Add Line Item' : 'Saving...'}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddLineItemModal;
