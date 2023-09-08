import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCrossInCircle } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import Layout from '../Layout';

import getMandatoryControls from './controls/getMandatoryControls';
import getOptionalControls from './controls/getOptionalControls';
import handleFieldArrayAddCheck from './helpers/checkFeeConfiguration';
import styles from './styles.module.css';

const ZERO = 0;
const ONE = 1;
const services_add_alt_configs = ['fcl_freight', 'fcl_freight_local', 'fcl_customs'];

function GlobalConfigForm({ activeService = '', data = {}, service = '' }) {
	const isDefaultShowAlternateCFConfig = !!(data?.slab_details?.length > ONE);
	const [showAlternateCFConfig, setShowAlternateCFConfig] = useState(isDefaultShowAlternateCFConfig);
	const [addAltConfig, setAddAltConfig] = useState(false);

	const DEFAULT_VALUES = {};
	const mandatoryControls = getMandatoryControls(
		{ activeService, service, data, control_name: 'slab_details', isAddFieldArrayCheck: true },
	);
	const alternateMandatoryControls = getMandatoryControls(
		{ activeService, service, data, control_name: 'alternate_slab_details', isAddFieldArrayCheck: true },
	);
	const optionalControls = getOptionalControls(
		{ activeService, service, data },
	);

	mandatoryControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl.name] = ctrl?.value || ''; });
	alternateMandatoryControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl.name] = ctrl?.value || ''; });
	optionalControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl.name] = ctrl?.value || ''; });

	const { control, formState:{ errors = {} } = {}, watch, handleSubmit, reset, setValue } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	useEffect(() => {
		reset();
		if (services_add_alt_configs.includes(activeService)) {
			setAddAltConfig(true);
		} else {
			setAddAltConfig(false);
		}
	}, [activeService, reset, service]);

	const formValues = watch();

	const { slab_details = [], alternate_slab_details = [] } = formValues;

	const customFieldArrayControls = { alternate_slab_details: {}, slab_details: {} };//
	// customFieldArrayControls={
	// 	fieldArrayName:{
	// 		indexAsKey:{
	// 			ctrlName :{customFields}
	// 		}
	// 	}
	// }

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

	const onSubmit = () => {};

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.heading}>Global Configuration</div>
				{/* CODE REMAINING HERE */}
			</div>
			<div
				className={styles.fees}
				style={{ fontStyle: 'italic' }}
			>
				Fees Configuration
			</div>
			<div className={styles.layoutContainer}>
				<Layout
					control={control}
					controls={mandatoryControls}
					errors={errors}
					handleFieldArrayAddCheck={handleFieldArrayAddCheck}
					customFieldArrayControls={customFieldArrayControls}
					formValues={watch()}
				/>
			</div>
			{addAltConfig && (
				<div>
					{
				showAlternateCFConfig ? (
					<>
						<div className={styles.altConfig}>
							<span className={styles.altConfigText}>
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
						<div className={styles.layoutContainer}>
							<Layout
								control={control}
								controls={alternateMandatoryControls}
								errors={errors}
								handleFieldArrayAddCheck={handleFieldArrayAddCheck}
								formValues={watch()}
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
				)
			}
				</div>
			)}
			<div
				className={styles.fees}
				style={{ fontStyle: 'italic' }}
			>
				Fees Applicability (Input Fields in Priority!)
			</div>

			<div
				className={styles.layoutContainer2}
			>
				<Layout
					control={control}
					controls={optionalControls}
					errors={errors}
				/>
			</div>

			<div className={styles.btnContainer}>
				<Button
					className={styles.btn}
					themeType="primary"
					size="md"
					onClick={handleSubmit(onSubmit)}
				>
					SAVE
				</Button>
			</div>
		</div>
	);
}

export default GlobalConfigForm;
