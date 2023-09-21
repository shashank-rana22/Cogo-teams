import { Button, ButtonIcon } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';

import Layout from '../../../../common/Layout';

import getControls from './controls';
import discountConfigControls from './discountConfigControls';
import shipmentConfigControls from './shipmentConfigControls';
import styles from './styles.module.css';

function AddRuleForm({
	setShowAddRuleForm = '',
}) {
	const DEFAULT_VALUES = {};
	const controls = getControls();
	const discountControls = discountConfigControls();
	const shipmentControls = shipmentConfigControls();

	controls.forEach((ctrl) => { DEFAULT_VALUES[ctrl?.name] = ctrl?.value; });
	discountControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl?.name] = ctrl?.value; });
	shipmentControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl?.name] = ctrl?.value; });

	const {
		control, formState: { errors = {} } = {},
		handleSubmit, watch,
	} = useForm({ defaultValues: DEFAULT_VALUES });

	const formValues = watch();
	const scope = formValues?.scope;
	const for_organisation = formValues?.for_organisation;
	const discount_limit_unit = formValues?.discount_limit_unit;

	const SHOW_ELEMENTS = {
		organisation_type     : for_organisation === '',
		organisation_sub_type : for_organisation === '',
	};

	const SHIPMENT_SHOW_ELEMENTS = {
		max_allowed_discount_value: discount_limit_unit !== 'flat',
	};

	return (
		<div className={styles.container}>
			<div className={styles.close_btn}>
				<ButtonIcon
					size="lg"
					icon={<IcMCross />}
					disabled={false}
					themeType="primary"
					onClick={() => {
						setShowAddRuleForm(false);
					}}
				/>
			</div>
			<Layout
				controls={controls}
				control={control}
				errors={errors}
				showElements={SHOW_ELEMENTS}
			/>

			<div className={styles.head}>
				<div className={styles.heading}>Global Configuration</div>
			</div>

			{scope === 'organization' ? (
				<Layout
					controls={discountControls}
					control={control}
					errors={errors}
				/>
			) : (
				<Layout
					controls={shipmentControls}
					control={control}
					errors={errors}
					showElements={SHIPMENT_SHOW_ELEMENTS}
				/>
			)}

			<div className={styles.btn_container}>
				<Button
					className={styles.btn}
					themeType="primary"
					size="md"
					onClick={handleSubmit}
				>
					SAVE
				</Button>
			</div>
		</div>
	);
}

export default AddRuleForm;
