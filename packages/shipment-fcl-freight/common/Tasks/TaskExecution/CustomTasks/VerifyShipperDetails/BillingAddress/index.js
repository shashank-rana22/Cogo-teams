import { Button } from '@cogoport/components';
import {
	AsyncSelectController,
	ChipsController,
	CreatableSelectController,
	InputController,
	MobileNumberController,
	TextAreaController,
	UploadController,
	useForm,
} from '@cogoport/forms';
import { getCountryConstants } from '@cogoport/globalization/constants/geo';

import useCreateAutoUpsellService from '../../../../../../hooks/useCreateAutoUpsellService';
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
	const { control, reset = () => {}, formState:{ errors = {} }, handleSubmit = () => {} } = useForm();

	const { loading = false } = useListOrganizationUsers({ shipment_data, reset, consigneeId });

	const {
		onSubmit = () => {},
		loading: upsellLoading = false,
		countryId = '',
		setCountryId = () => {},
	} = useCreateAutoUpsellService({ task, refetch, onCancel, refetchServices, shipment_data, consigneeId });

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
