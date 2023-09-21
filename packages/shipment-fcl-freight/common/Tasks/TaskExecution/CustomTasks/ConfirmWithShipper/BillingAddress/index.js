import { Button } from '@cogoport/components';
import {
	AsyncSelectController,
	ChipsController,
	CreatableSelectController,
	DatepickerController,
	InputController,
	MobileNumberController,
	TextAreaController,
	UploadController,
	useForm,
} from '@cogoport/forms';
import { getCountryConstants } from '@cogoport/globalization/constants/geo';

import useCreateAutoUpsellService from '../../../../../../hooks/useCreateAutoUpsellService';
import useListOrganizationUsers from '../../../../../../hooks/useListOrganizationUsers';
import useUpdateShipmentPendingTask from '../../../../../../hooks/useUpdateShipmentPendingTask';

import getControls from './getControls';
import styles from './styles.module.css';

const INPUT_MAPPING = {
	text            : InputController,
	asyncSelect     : AsyncSelectController,
	chips           : ChipsController,
	upload          : UploadController,
	creatableSelect : CreatableSelectController,
	textarea        : TextAreaController,
	mobileNumber    : MobileNumberController,
	date            : DatepickerController,
};

function Error(key, errors) {
	return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
}

function BillingAddress({
	task = {},
	refetch = () => {},
	onCancel = () => {},
	refetchServices = () => {},
	shipment_data = {},
	consigneeId = '',
}) {
	const {
		control, reset = () => {},
		formState: { errors = {} },
		handleSubmit = () => {},
		watch = () => {},
	} = useForm();

	const taskRefetch = () => {
		onCancel();
		refetch();
		refetchServices();
	};

	const { loading = false } = useListOrganizationUsers({ shipment_data, reset, consigneeId });

	const { apiTrigger = () => {} } = useUpdateShipmentPendingTask({ refetch: taskRefetch });

	const { cargo_readiness_date = '' } = watch();

	const updatePendingTask = () => {
		const updatePendingTaskPayload = {
			id   : task?.id,
			data : {
				pending_task: {
					id              : task?.id,
					organization_id : shipment_data?.consignee_shipper_id || consigneeId,
				},
				fcl_freight_service: {
					shipment_id: shipment_data?.id,
					cargo_readiness_date,
				},
				shipment: {
					id                   : shipment_data?.id,
					consignee_shipper_id : shipment_data?.consignee_shipper_id || consigneeId,
				},
			},
		};

		apiTrigger({ ...updatePendingTaskPayload });
	};
	const {
		onSubmit = () => {},
		loading: upsellLoading = false,
		countryId = '',
		setCountryId = () => {},
	} = useCreateAutoUpsellService({ task, shipment_data, consigneeId, updatePendingTask });

	const countryValidation = getCountryConstants({
		country_id    : countryId,
		isDefaultData : false,
	});

	const { controls = [] } = getControls({ setCountryId, countryValidation });

	return (
		<div className={styles.main_container}>
			<div className={styles.flex_container}>
				{controls?.map((formControl) => {
					const { type = '', name = '', styles: style = {}, label = '' } = formControl;

					const Element = INPUT_MAPPING[type];

					if (!Element) return null;

					return (
						<div
							className={styles.form_item_container}
							key={name}
							style={style}
						>
							<label className={styles.form_label}>{label}</label>

							<Element
								control={control}
								{...formControl}
							/>
							{Error(name, errors)}
						</div>
					);
				})}
			</div>

			<div className={styles.button_container}>
				<Button
					loading={upsellLoading || loading}
					disabled={upsellLoading || loading}
					onClick={handleSubmit(onSubmit)}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

export default BillingAddress;
