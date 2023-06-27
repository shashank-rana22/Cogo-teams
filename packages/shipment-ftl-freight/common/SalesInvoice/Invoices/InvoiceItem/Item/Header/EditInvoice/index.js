import { Button, Modal } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { Layout } from '@cogoport/surface-modules';
import FooterButtonWrapper from '@cogoport/surface-modules/common/FooterButtonWrapper';
import React, { useEffect } from 'react';

import editLineItemsHelper from './editLineItemsHelper';
import Info from './Info';
import styles from './styles.module.css';

function EditInvoice({
	onClose,
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
		isFclFreight : true,
		shipment_data,
		info         : <Info />,
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
	}, [newFormValues, watch, setValue, formValues]);

	return (
		<Modal
			show
			size="xl"
			onClose={onClose}
			closeOnOuterClick={false}
		>
			<Modal.Header title="Edit Invoice" />
			<Modal.Body>
				<div className={styles.forms}>
					<div className={styles.invoice_value}>
						Invoice Value -
						&nbsp;
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
				<FooterButtonWrapper>
					<Button
						size="md"
						themeType="secondary"
						onClick={onClose}
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
				</FooterButtonWrapper>
			</Modal.Footer>
		</Modal>
	);
}

export default EditInvoice;
