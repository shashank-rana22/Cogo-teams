import { Button, Modal } from '@cogoport/components';
// import { useForm } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import Layout from '../../../../../../Tasks/TaskExecution/helpers/Layout';

import Info from './Info';
// import getDefaultValues from '../../../../../../Tasks/TaskExecution/utils/get-default-values';

// import controls from './controls';
// import useEditLineItems from '../../../../../../../hooks/useEditLineItems';
// import Info from './Info';
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
		fields,
		onError,
		errors,
	} = useEditLineItems({
		invoice,
		onClose,
		refetch,
		isFclFreight : true,
		shipment_data,
		info         : <Info />,
	});
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

					<div className={styles.layout}>
						<Layout
							control={controls}
							fields={fields}
							errors={errors}
						/>
						<Button
							className="primary md"
							style={{ marginLeft: '16px' }}
						>
							Add Line Item
						</Button>

					</div>
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
