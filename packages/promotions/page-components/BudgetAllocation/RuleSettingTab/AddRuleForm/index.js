import { Button, ButtonIcon } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import Layout from '../../../../common/Layout';

import getControls from './controls';
import discountConfigControls from './discountConfigControls';
import shipmentConfigControls from './shipmentConfigControls';
import styles from './styles.module.css';

const INCREMENT = 0.01;
const ZERO = 0;
const ONE = 1;

function AddRuleForm({
	setShowAddRuleForm = '',
}) {
	const DEFAULT_VALUES = {};
	const controls = getControls();
	const discountControls = discountConfigControls();
	const shipmentControls = shipmentConfigControls();

	controls.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl.name] = ctrl.value;
		}
	});
	discountControls.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl.name] = ctrl.value;
		}
	});
	shipmentControls.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl.name] = ctrl.value;
		}
	});

	const {
		control, formState: { errors = {} } = {}, handleSubmit, watch, setValue,
	} = useForm({ defaultValues: DEFAULT_VALUES });

	const formValues = watch();
	const scope = formValues?.scope;
	const for_organisation = formValues?.for_organisation;

	const SHOW_ELEMENTS = {
		organisation_type     : for_organisation === '',
		organisation_sub_type : for_organisation === '',
	};

	const { shipment_price_slab_config = [] } = formValues;
	const customFieldArrayControls = { shipment_price_slab_config: {} };

	useEffect(() => {
		shipment_price_slab_config?.forEach((_o, index) => {
			if (index === ZERO) {
				setValue(`shipment_price_slab_config.${index}.slab_lower_limit`, ZERO);
			} else {
				setValue(
					`shipment_price_slab_config.${index}.slab_lower_limit`,
					Number(shipment_price_slab_config[index - ONE].slab_upper_limit) + INCREMENT,
				);
			}
		});
	}, [shipment_price_slab_config, setValue]);

	const SHOW_ELEM = {};

	shipment_price_slab_config?.forEach((slab, index) => {
		SHOW_ELEM[`shipment_price_slab_config.${index}.max_allowed_discount_value`] = slab?.discount_limit_unit
		=== 'percentage';
	});

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
				formValues={formValues}
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
					customFieldArrayControls={customFieldArrayControls}
					formValues={formValues}
					// showElements={SHIPMENT_SHOW_ELEMENTS}
					showElements={SHOW_ELEM}
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
