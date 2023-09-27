import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useEffect } from 'react';

import Layout from '../../../../../common/Layout';
import useCreatePromotionAgentRule from '../../../../../hooks/useCreatePromotionAgentRule';
import useUpdatePromotionAgentRule from '../../../../../hooks/useUpdatePromotionAgentRule';
import discountConfigControls from '../../GlobalConfig/controls/discountConfigControls';
import shipmentConfigControls from '../../GlobalConfig/controls/shipmentConfigControls';

import getControls from './controls';
import styles from './styles.module.css';

const INCREMENT = 0.01;
const ZERO = 0;
const ONE = 1;

function CustomConfigForm({
	data = {},
	refetchList = () => {},
	setShowCustomConfigForm = () => {},
	viewAndEditConfigData = {},
	setViewAndEditConfigData = () => {},
}) {
	const DEFAULT_VALUES = viewAndEditConfigData === null ? {} : viewAndEditConfigData;
	const controls = getControls({ cogo_entity_id: data?.cogo_entity_id });
	const discountControls = discountConfigControls({ disabledFrequency: true });
	const shipmentControls = shipmentConfigControls();
	const { onSubmit = () => {} } = useCreatePromotionAgentRule();
	const { onUpdateAgentRule = () => {} } = useUpdatePromotionAgentRule();

	const submitForm = async (values) => {
		if (viewAndEditConfigData === null && data?.scope === 'organization') {
			const { agent_id = '', ...restValues } = values;
			await onSubmit({
				data: {
					agent_id,
					discount_config: {
						...restValues,
					},
					promotion_rule_id : data?.id,
					scope             : data?.scope,
				},
			});
		} else if (viewAndEditConfigData === null && data?.scope !== 'organization') {
			const { agent_id = '', shipment_price_slab_config = [] } = values;
			const NEW_ARRAY = [];
			shipment_price_slab_config?.forEach((slab) => {
				NEW_ARRAY.push({
					...slab,
					max_allowed_discount_currency : slab.slab_unit_currency,
					discount_limit_currency       : slab.slab_unit_currency,
				});
			});
			await onSubmit({
				data: {
					agent_id,
					slab_details      : NEW_ARRAY,
					promotion_rule_id : data?.id,
					scope             : data?.scope,
				},
			});
		} else if (data?.scope === 'organization') {
			const {
				id = '',
				frequency = '',
				discount_limit_currency = '',
				discount_limit_unit = '',
				discount_limit_value = '',
			} = values;
			await onUpdateAgentRule({
				data: {
					discount_config: {
						frequency,
						discount_limit_currency,
						discount_limit_unit,
						discount_limit_value,
					},
					id,
				},
			});
		} else {
			const { id = '', shipment_price_slab_config = [] } = values;
			await onUpdateAgentRule({
				data: {
					slab_details: shipment_price_slab_config,
					id,
				},
			});
		}
		refetchList();
		setShowCustomConfigForm(false);
		setViewAndEditConfigData(null);
	};

	const deactiveRule = async (values) => {
		const { id = '' } = values;
		await onUpdateAgentRule({
			data: {
				id,
				status: 'inactive',
			},
		});
		refetchList();
		setShowCustomConfigForm(false);
		setViewAndEditConfigData(null);
	};

	DEFAULT_VALUES.discount_limit_unit = 'flat';
	if (viewAndEditConfigData === null) {
		DEFAULT_VALUES.frequency = data?.discount_config[GLOBAL_CONSTANTS.zeroth_index]?.frequency;
	} else {
		const { slab_configs = {}, discount_config = {} } = viewAndEditConfigData === null ? {} : viewAndEditConfigData;
		DEFAULT_VALUES.shipment_price_slab_config = slab_configs;
		DEFAULT_VALUES.discount_limit_currency = discount_config[GLOBAL_CONSTANTS.zeroth_index]
			?.discount_limit_currency;
		DEFAULT_VALUES.discount_limit_value = discount_config[GLOBAL_CONSTANTS.zeroth_index]?.discount_limit_value;
		DEFAULT_VALUES.frequency = discount_config[GLOBAL_CONSTANTS.zeroth_index]?.frequency;
	}

	const {
		control, formState: { errors = {} } = {}, handleSubmit, watch, setValue,
	} = useForm({ defaultValues: DEFAULT_VALUES });
	const formValues = watch();

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
							onClick={handleSubmit(deactiveRule)}
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
						onClick={handleSubmit(submitForm)}
					>
						SAVE
					</Button>
				</div>
			</div>
		</div>
	);
}

export default CustomConfigForm;
