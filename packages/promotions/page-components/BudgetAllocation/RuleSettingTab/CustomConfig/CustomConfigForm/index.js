import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useEffect } from 'react';

import Layout from '../../../../../common/Layout';
import discountConfigControls from '../../AddRuleForm/controls/discountConfigControls';
import shipmentConfigControls from '../../AddRuleForm/controls/shipmentConfigControls';

import getControls from './controls';
import styles from './styles.module.css';

const INCREMENT = 0.01;
const ZERO = 0;
const ONE = 1;

function CustomConfigForm({
	data = {},
	setShowCustomConfigForm = () => {},
	viewAndEditConfigData = {},
	setViewAndEditConfigData = () => {},
}) {
	const DEFAULT_VALUES = viewAndEditConfigData === null ? {} : viewAndEditConfigData;
	const controls = getControls();
	const discountControls = discountConfigControls({ disabledFrequency: true });
	const shipmentControls = shipmentConfigControls();

	if (viewAndEditConfigData === null) {
		DEFAULT_VALUES.frequency = `${data?.discount_config[GLOBAL_CONSTANTS.zeroth_index]?.frequency}ly`;
	} else {
		const { slab_configs = {}, discount_config = {} } = viewAndEditConfigData === null ? {} : viewAndEditConfigData;
		DEFAULT_VALUES.shipment_price_slab_config = slab_configs;
		DEFAULT_VALUES.discount_limit_currency = discount_config[GLOBAL_CONSTANTS.zeroth_index]
			?.discount_limit_currency;
		DEFAULT_VALUES.discount_limit_value = discount_config[GLOBAL_CONSTANTS.zeroth_index]?.discount_limit_value;
		DEFAULT_VALUES.frequency = `${discount_config[GLOBAL_CONSTANTS.zeroth_index]?.frequency}ly`;
	}

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
		<div>
			<div className={styles.container}>
				{viewAndEditConfigData !== null && (
					<div className={styles.close_btn}>
						<Button
							className={styles.btn}
							size="md"
							themeType="secondary"
							onClick={() => {
								setViewAndEditConfigData(null);
								setShowCustomConfigForm(false);
							}}
						>
							DEACTIVATE
						</Button>
					</div>
				)}
				<Layout
					controls={controls}
					control={control}
					errors={errors}
					formValues={formValues}
					showElements={SHOW_ELEMENTS}
				/>

				<div className={styles.head} />

				{data?.scope === 'organization' ? (
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
						themeType="secondary"
						onClick={() => {
							setViewAndEditConfigData(null);
							setShowCustomConfigForm(false);
						}}
					>
						CANCEL
					</Button>
					<Button
						className={styles.btn}
						size="md"
						onClick={handleSubmit}
					>
						SAVE
					</Button>
				</div>
			</div>
		</div>
	);
}

export default CustomConfigForm;
