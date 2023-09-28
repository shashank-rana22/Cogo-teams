import { Button, Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { Layout } from '@cogoport/ocean-modules';
import { useSelector } from '@cogoport/store';
import { useEffect, useContext } from 'react';

import editLineItems from './editLineItems';
import Info from './Info';
import styles from './styles.module.css';

function EditInvoice({
	show = 'false',
	onClose = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const geo = getGeoConstants();
	const allowedRoles = {
		IN : [geo.uuid.admin_id, geo.uuid.super_admin_id],
		VN : [geo.uuid.admin_id, geo.uuid.super_admin_id, ...geo.uuid.kam_ids],
		SG : [geo.uuid.admin_id, geo.uuid.super_admin_id, ...geo.uuid.kam_ids],
		ID : [geo.uuid.admin_id, geo.uuid.super_admin_id],
		TH : [geo.uuid.admin_id, geo.uuid.super_admin_id],
		CN : [geo.uuid.admin_id, geo.uuid.super_admin_id],
	};

	const { role_ids } = useSelector(({ profile }) => ({
		role_ids: profile.partner?.user_role_ids,
	}));

	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);

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
		shipment_data,
		primary_service,
		info: <Info />,
	});

	const editAliasNames = allowedRoles[geo.country.code].some(
		(ele) => role_ids?.includes(ele),
	) && shipment_data?.shipment_type === 'fcl_freight';

	const disabledProps = controls?.[GLOBAL_CONSTANTS.zeroth_index]?.service_name === 'fcl_freight_service'
	&& !editAliasNames;

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
