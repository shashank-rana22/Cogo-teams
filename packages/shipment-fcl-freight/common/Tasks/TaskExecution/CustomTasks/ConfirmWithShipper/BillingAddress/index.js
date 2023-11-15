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

import useCreateUpsellOriginLocalService from '../../../../../../hooks/useCreateUpsellOriginLocalService';
import useListOrganizationUsers from '../../../../../../hooks/useListOrganizationUsers';

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
	primary_service = {},
}) {
	const { control, reset = () => {}, formState:{ errors = {} }, handleSubmit = () => {}, watch } = useForm();
	const isSez = watch('is_sez') === 'yes';

	const { loading = false, data:userData } = useListOrganizationUsers({ shipment_data, reset, consigneeId });

	const {
		onSubmit = () => {},
		loading: upsellLoading = false,
		countryId = '',
		setCountryId = () => {},
	} = useCreateUpsellOriginLocalService({
		task,
		refetch,
		onCancel,
		refetchServices,
		shipment_data,
		consigneeId,
		userData,
		primary_service,
	});

	const countryValidation = getCountryConstants({
		country_id    : countryId,
		isDefaultData : false,
	});

	const { controls = [] } = getControls({ setCountryId, countryValidation, isSez });

	return (
		<div className={styles.main_container}>
			<div className={styles.flex_container}>
				{controls?.map((formControl) => {
					const { type = '', name = '', styles: style = {}, label = '', show = true } = formControl;
					const Element = INPUT_MAPPING[type];

					if (!Element || !show) return null;

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
