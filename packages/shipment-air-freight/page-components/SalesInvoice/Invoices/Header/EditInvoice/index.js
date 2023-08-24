import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import editLineItems from './editLineItems';
import Info from './Info';
import styles from './styles.module.css';

const ALLOWED_ROLES = [GLOBAL_CONSTANTS.uuid.vinod_talapa_user_id,
	GLOBAL_CONSTANTS.uuid.linh_nguyen_duy_user_id,
	GLOBAL_CONSTANTS.uuid.santram_gurjar_user_id];

function EditInvoice({
	show = 'false',
	onClose = () => {},
	invoice = {},
	refetch = () => {},
	shipment_data = {},
}) {
	const { profile } = useSelector((state) => state);

	const isRoleAllowed = ALLOWED_ROLES.includes(profile?.user?.id);

	const {
		controls,
		loading,
		onCreate,
		handleSubmit,
		errors,
		control,
		setValue,
		watch,
		onError,
		newFormValues,
	} = editLineItems({
		invoice,
		onClose,
		refetch,
		isRoleAllowed,
		shipment_data,
		info: <Info />,
	});

	const disabledProps = controls?.[GLOBAL_CONSTANTS.zeroth_index]?.service_name === 'air_freight_service'
	&& !isRoleAllowed && shipment_data?.serial_id > GLOBAL_CONSTANTS.serial_check_id;

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
						disabledProps={disabledProps}
						shipment_id={shipment_data?.id}
					/>
				</div>

			</Modal.Body>

			<Modal.Footer>
				<Button
					size="md"
					themeType="secondary"
					onClick={onClose}
				>
					Cancel
				</Button>

				<Button
					size="md"
					onClick={handleSubmit(onCreate, onError)}
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
