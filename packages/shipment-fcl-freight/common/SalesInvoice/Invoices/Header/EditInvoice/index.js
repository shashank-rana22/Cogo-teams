import { Button, Modal } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { Layout } from '@cogoport/ocean-modules';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import editLineItems from './editLineItems';
import Info from './Info';
import styles from './styles.module.css';

const geo = getGeoConstants();
const INITIAL_STATE = 0;

function EditInvoice({
	show = 'false',
	onClose = () => {},
	invoice = {},
	refetch = () => {},
	shipment_data = {},
}) {
	const { role_ids } = useSelector(({ profile }) => ({
		role_ids: profile.partner?.user_role_ids,
	}));
	const isAdminSuperAdmin = [geo.uuid.admin_id, geo.uuid.super_admin_id]
		.some((ele) => role_ids?.includes(ele));

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
	} = editLineItems({
		invoice,
		onClose,
		refetch,
		isAdminSuperAdmin,
		shipment_data,
		info: <Info />,
	});

	const disabledProps = controls?.[INITIAL_STATE]?.service_name === 'fcl_freight_service' && !isAdminSuperAdmin
	&& shipment_data?.serial_id > GLOBAL_CONSTANTS.serial_check_id;

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
						shipment_id={shipment_data?.shipment_id}
						shipment_type={shipment_data?.shipment_type}
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
