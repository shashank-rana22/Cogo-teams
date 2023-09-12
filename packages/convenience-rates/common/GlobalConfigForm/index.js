import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import FEE_UNIT_MAPPING from '../../configs/FEE_UNIT_MAPPING.json';
import Layout from '../Layout';

import getMandatoryControls from './controls/getMandatoryControls';
import getOptionalControls from './controls/getOptionalControls';
import handleFieldArrayAddCheck from './helpers/checkFeeConfiguration';
import styles from './styles.module.css';

const ZERO = 0;
const ONE = 1;

function GlobalConfigForm({
	activeService = '', onSubmit = () => {}, isEmptyAlternateSlabDetails = true,
	onClickDeactivate = () => {}, isUpdatable = false, data = {}, loading = '',
	setDefaultConfigFeeUnit = () => {},
}) {
	const [showAlternateCFConfig, setShowAlternateCFConfig] = useState(!isEmptyAlternateSlabDetails);
	const { config_type = '', status = '' } = data || {};
	const DEFAULT_VALUES = {};
	const mandatoryControls = getMandatoryControls(
		{ activeService, data, control_name: 'slab_details', isAddFieldArrayCheck: true },
	);
	const alternateMandatoryControls = getMandatoryControls(
		{ activeService, data, control_name: 'alternate_slab_details', isAddFieldArrayCheck: true },
	);
	const optionalControls = getOptionalControls(
		{ activeService, data },
	);

	mandatoryControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl.name] = ctrl?.value || ''; });
	alternateMandatoryControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl.name] = ctrl?.value || ''; });
	optionalControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl.name] = ctrl?.value || ''; });

	const { control, formState:{ errors = {} } = {}, watch, reset, setValue } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	useEffect(() => {
		reset();
	}, [activeService, reset]);

	const formValues = watch();
	const { slab_details = [], alternate_slab_details = [] } = formValues;

	const defaultFeeUnit = formValues?.slab_details[GLOBAL_CONSTANTS.zeroth_index]?.fee_unit;

	useEffect(() => {
		setDefaultConfigFeeUnit(defaultFeeUnit);
	}, [defaultFeeUnit, setDefaultConfigFeeUnit]);

	const customFieldArrayControls = { alternate_slab_details: {}, slab_details: {} };

	alternate_slab_details?.forEach((_o, index) => {
		if (index > ZERO) {
			customFieldArrayControls.alternate_slab_details[index - ONE] = {
				fee_unit: { disabled: true },
			};
			customFieldArrayControls.alternate_slab_details[index] = {
				slab_unit        : { disabled: true },
				slab_lower_limit : { disabled: true },
				fee_unit         : { disabled: true },
			};
		}
	});

	useEffect(() => {
		slab_details?.forEach((_o, index) => {
			if (index > ZERO) {
				setValue(`slab_details.${index}.slab_lower_limit`, slab_details[index - ONE].slab_upper_limit);
				setValue(`slab_details.${index}.slab_unit`, slab_details[index - ONE].slab_unit);
				setValue(`slab_details.${index}.fee_unit`, slab_details[index - ONE].fee_unit);
			}
		});
	}, [slab_details, setValue]);
	slab_details?.forEach((_o, index) => {
		if (index > ZERO) {
			customFieldArrayControls.alternate_slab_details[index - ONE] = {
				fee_unit: { disabled: true },
			};
			customFieldArrayControls.slab_details[index] = {
				slab_unit        : { disabled: true },
				slab_lower_limit : { disabled: true },
				fee_unit         : { disabled: true },
			};
		}
	});

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.heading}>Global Configuration</div>
				{isUpdatable && config_type !== 'default' ? (
					<Button
						themeType="secondary"
						onClick={onClickDeactivate}
						style={{ fontWeight: '600', marginRight: '8px' }}
						disabled={loading}
					>
						{status === 'active' ? 'Deactivate' : 'Activate'}
					</Button>
				) : null}
			</div>
			<div
				className={styles.fees}
				style={{ fontStyle: 'italic' }}
			>
				Fees Configuration
			</div>
			<div className={styles.layout_container}>
				<Layout
					control={control}
					controls={mandatoryControls}
					errors={errors}
					handleFieldArrayAddCheck={handleFieldArrayAddCheck}
					customFieldArrayControls={customFieldArrayControls}
					formValues={formValues}
				/>
			</div>
			{(FEE_UNIT_MAPPING[activeService] || []).length > ONE
				&& (showAlternateCFConfig ? (
					<>
						<div className={styles.alt_config}>
							<span className={styles.alt_config_text}>
								Alternate Configuration
							</span>
							<span style={{ cursor: 'pointer' }}>
								<IcMCrossInCircle
									width={28}
									height={28}
									onClick={() => setShowAlternateCFConfig(false)}
								/>
							</span>
						</div>
						<div className={styles.layout_container}>
							<Layout
								control={control}
								controls={alternateMandatoryControls}
								errors={errors}
								handleFieldArrayAddCheck={handleFieldArrayAddCheck}
								formValues={formValues}
							/>
						</div>
					</>
				) : (
					<Button
						themeType="primary"
						style={{ fontSize: '14px', marginBottom: '20px', fontWeight: '700' }}
						onClick={() => {
							setShowAlternateCFConfig(true);
						}}
					>
						+ Add Alternate Config
					</Button>
				))}
			<div
				className={styles.fees}
				style={{ fontStyle: 'italic' }}
			>
				Fees Applicability (Input Fields in Priority!)
			</div>
			<div>
				<Layout
					control={control}
					controls={optionalControls}
					errors={errors}
				/>
			</div>
			<div className={styles.btn_container}>
				<Button
					className={styles.btn}
					themeType="primary"
					size="md"
					onClick={() => { onSubmit(formValues); }}
				>
					SAVE
				</Button>
			</div>
		</div>
	);
}
export default GlobalConfigForm;
