import { Button, ButtonIcon } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import Layout from '../../../../common/Layout';

import getControls from './controls/controls';
import discountConfigControls from './controls/discountConfigControls';
import shipmentConfigControls from './controls/shipmentConfigControls';
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

	DEFAULT_VALUES.scope = 'shipment';
	DEFAULT_VALUES.category = 'business';
	DEFAULT_VALUES.for_service = 'fcl_customs';

	const {
		control, formState: { errors = {} } = {}, handleSubmit, watch, setValue,
	} = useForm({ defaultValues: DEFAULT_VALUES });
	const formValues = watch();

	const SHOW_ELEMENTS = {
		organisation_type     : formValues?.for_organisation === '' || formValues?.for_organisation === undefined,
		organisation_sub_type : formValues?.for_organisation === '' || formValues?.for_organisation === undefined,
	};

	const { shipment_price_slab_config = [] } = formValues;
	useEffect(() => {
		shipment_price_slab_config?.forEach((_o, index) => {
			if (index === ZERO) {
				setValue(`shipment_price_slab_config.${index}.slab_lower_limit`, ONE);
			} else {
				setValue(
					`shipment_price_slab_config.${index}.slab_lower_limit`,
					Number(shipment_price_slab_config[index - ONE].slab_upper_limit) + INCREMENT,
				);
			}
			setValue(`shipment_price_slab_config.${index}.slab_unit`, 'shipment_value');
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

			{formValues?.scope === 'organization' ? (
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
					formValues={formValues}
					showElements={SHOW_ELEM}
				/>
			)}

			<div className={styles.btn_container}>
				<Button
					className={styles.btn}
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
