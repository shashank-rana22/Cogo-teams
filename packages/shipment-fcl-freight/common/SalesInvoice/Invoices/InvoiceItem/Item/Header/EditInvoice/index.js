import { Button, Modal } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
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
	// const { role_ids, isMobile } = useSelector(({ profile, general }) => ({
	// 	role_ids : profile.partner?.user_role_ids,
	// 	isMobile : general.isMobile,
	// }));

	// const isFclFreight =		[geo.uuid.admin_id, geo.uuid.super_admin_id].some((ele) => role_ids?.includes(ele)) && shipment_data?.shipment_type === 'fcl_freight';

	// const {
	// 	controls,
	// 	loading,
	// 	onCreate,
	// 	handleSubmit,
	// 	customValues,
	// 	fields,
	// 	onError,
	// 	errors,
	// } = useEditLineItems({
	// 	invoice,
	// 	onClose,
	// 	refetch,
	// 	isFclFreight,
	// 	shipment_data,
	// 	info: <Info />,
	// });

	// const disabledProps =		controls?.[0]?.service_name === 'fcl_freight_service'
	// 	&& !isFclFreight
	// 	&& shipment_data?.serial_id > 130000;

	// const defaultVal = getDefaultValues(controls);
	// const {
	// 	control,
	// 	formState: { errors },
	// } = useForm({ defaultVal });

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
			// styles={{
			// 	dialog: { width: isMobile ? 360 : 1030 },
			// }}
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
							// prevData={prevData}
						controls={controls}
						defaultValues={defaultValues}
						errors={errors}
						control={control}
						setValue={setValue}
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
