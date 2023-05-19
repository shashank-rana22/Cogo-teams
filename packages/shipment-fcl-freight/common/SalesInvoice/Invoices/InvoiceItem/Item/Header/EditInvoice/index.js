import { Button, Modal } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useSelector } from '@cogoport/store';
import React, { useEffect } from 'react';

// import getDefaultValues from '../../../../../../Tasks/TaskExecution/utils/get-default-values';
// import controls from './controls';
// import Info from './Info';
import Form from './Form';
import Info from './Info';
import styles from './styles.module.css';
import useEditLineItems from './useEditLineItems';

const geo = getGeoConstants();

function EditInvoice({
	show = 'false',
	onClose,
	invoice = {},
	refetch = () => {},
	shipment_data = {},
}) {
	const { role_ids } = useSelector(({ profile, general }) => ({
		role_ids : profile.partner?.user_role_ids,
		isMobile : general.isMobile,
	}));
	const isFclFreight = [geo.uuid.admin_id, geo.uuid.super_admin_id]
		.some((ele) => role_ids?.includes(ele));

	const {
		controls,
		loading,
		onCreate,
		handleSubmit,
		customValues,
		errors,
		control,
		setValue,
		watch,
		defaultValues,
	} = useEditLineItems({
		invoice,
		onClose,
		refetch,
		isFclFreight : true,
		shipment_data,
		info         : <Info />,
	});

	const disabledProps = controls?.[0]?.service_name === 'fcl_freight_service'
		&& !isFclFreight
		&& shipment_data?.serial_id > 130000;

	const formValues = watch();

	useEffect(() => {
		if (defaultValues) {
			Object.keys(defaultValues).forEach((fieldName) => {
				if (!formValues[fieldName]) {
					setValue(fieldName, defaultValues[fieldName]);
				}
			});
		}
	}, [defaultValues, watch, setValue, formValues]);

	return (
		<Modal
			size="xl"
			onClose={onClose}
			show={show}
			closable={false}
		>
			<Modal.Body>
				<div className={styles.forms}>
					<div className={styles.invoice_value}>
						Invoice Value -
						{' '}
						<span className="amount">
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

					<Form
							// data={data}
						invoiceData={invoice}
						prevData={defaultValues}
						controls={controls}
						defaultValues={defaultValues}
						errors={errors}
						control={control}
						setValue={setValue}
						disabledProps={disabledProps}
					/>
				</div>

			</Modal.Body>

			<Modal.Footer>
				<Button
					className="secondary md"
					onClick={onClose}
				>
					Cancel
				</Button>

				<Button
					className="primary md"
					onClick={handleSubmit(onCreate)}
					style={{ marginLeft: '16px' }}
				>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditInvoice;
