import { Button, Modal } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';
import FormLayout from '../../../../../../../../../packages/shipment-fcl-freight/common/Tasks/TaskExecution/helpers/Layout'
// import FormLayout from '../../../../../../../../commons/Layout';
// import useEditLineItems from '../../../../../../../hooks/useEditLineItems';
import controls from './controls';
import { useForm } from '@cogoport/forms';
// import Info from './Info';
import styles from './styles.module.css';
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

	const {control} = controls({shipment_data});
	const { 
		handleSubmit,
		// control,
		register,
		setValue,
		formState: { errors }, } = useForm(control);

	return (
		<Modal
			size='lg'
			onClose={onClose}
			show={show}
			className="primary xl"
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

					<FormLayout
						controls={control}
						// fields={fields}
						errors={errors}
						// customValues={customValues}
						// disabledProps={disabledProps}
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
						// onClick={handleSubmit(onCreate, onError)}
					style={{ marginLeft: '16px' }}
				>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditInvoice;
