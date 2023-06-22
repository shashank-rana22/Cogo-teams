import { Button, Modal } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { Layout } from '@cogoport/ocean-modules';
import { useEffect } from 'react';

import editLineItemsHelper from './editLineItemsHelper';
import Info from './Info';
import styles from './styles.module.css';

function EditInvoice({
	show = 'false',
	onClose = () => {},
	invoice = {},
	refetch = () => {},
	shipment_data = {},
}) {
	const {
		controls,
		loading,
		onCreate,
		handleSubmit,
		errors,
		control,
		setValue,
		watch,
		newFormValues,
	} = editLineItemsHelper({
		invoice,
		onClose,
		refetch,
		shipment_data,
		info: <Info />,
	});

	const formValues = watch();

	useEffect(() => {
		if (newFormValues) {
			Object.keys(newFormValues).forEach((fieldName) => {
				if (!formValues[fieldName]) {
					setValue(fieldName, newFormValues[fieldName]);
				}
			});
		}
	}, [newFormValues, setValue, formValues]);

	return (
		<Modal
			size="xl"
			onClose={onClose}
			show={show}
			closeOnOuterClick={false}
		>
			<Modal.Header title="Edit Invoice" />
			<Modal.Body>
				<div className={styles.forms}>
					<div className={styles.invoice_value}>
						Invoice Value -
						{' '}
						<span className={styles.amount}>
							{formatAmount({
								amount   : invoice?.invoicing_party_total,
								currency : invoice?.invoice_total_currency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 2,
								},
							})}
						</span>
					</div>

					<Layout
						control={control}
						fields={controls}
						errors={errors}
						customValues={newFormValues}
					/>
				</div>

			</Modal.Body>

			<Modal.Footer>
				<Button
					size="md"
					themeType="secondary"
					onClick={onClose}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					size="md"
					onClick={handleSubmit(onCreate)}
					style={{ marginLeft: '16px' }}
					disabled={loading}
				>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditInvoice;
