import { Modal, Button } from '@cogoport/components';
import { useForm, useFieldArray } from '@cogoport/forms';
import { IcMPlusInCircle, IcMDelete } from '@cogoport/icons-react';
import { useEffect, useMemo } from 'react';

import { getFieldController } from '../../../../../../../../common/Form/getFieldController';
import getAdditionalControls from '../../../../../../configurations/get-additional-controls';

import styles from './styles.module.css';
import useGetAgentScoringParameters from './useGetAgentScoringParameters';

function AdditionalControlsModal({
	param = '',
	watchSubBlock = '',
	setParam = () => {},
	paramScoringType = '',
	additionalControls = {},
	setParamScoringType = () => {},
	setAdditionalControls = () => {},
}) {
	const { data : { list = [] }, loading } = useGetAgentScoringParameters({ subBlockId: watchSubBlock });

	const afterParameterOptions = useMemo(() => list.map((item) => ({
		label : item.display_name,
		value : item.id,
	})), [list]);

	const controls = getAdditionalControls({ afterParameterOptions });

	const { control, getValues, formState: { errors }, handleSubmit, setValue } = useForm();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'additional_controls',
	});

	const CHILD_EMPTY_VALUES = {};
	controls.forEach((controlItem) => {
		CHILD_EMPTY_VALUES[controlItem.name] = '';
	});

	const handleClose = () => {
		setParamScoringType('');
		setParam(null);
	};

	const handleSave = () => {
		setAdditionalControls((prev) => {
			const currValues = { ...prev };
			currValues[param] = getValues().additional_controls;

			return currValues;
		});

		setParam(null);
	};

	useEffect(() => {
		setValue('additional_controls', additionalControls[param]);
	}, [additionalControls, param, setValue]);

	return (
		<Modal size="xl" show onClose={handleClose} placement="center">
			<Modal.Header title="Additional Controls" />

			<form onSubmit={handleSubmit(handleSave)}>
				<Modal.Body key={loading}>
					{fields.map((field, index) => (
						<div key={field.id} className={styles.container}>
							<div className={styles.controls_container}>
								{controls.map((controlItem) => {
									const { type, label, name, style, ...rest } = controlItem || {};
									const Element = getFieldController(type);

									if (!Element || (paramScoringType === 'absolute'
                                    && ['fixed_percentage_value', 'variable_percentage_value'].includes(name))
                                    || (paramScoringType === 'percentage' && name === 'base_score')) return null;

									return (
										<div
											className={styles.control_item}
											key={name}
											style={style?.parent_style}
										>
											<p className={styles.label}>{label}</p>

											<Element
												control={control}
												{...rest}
												style={style?.child_style}
												name={`additional_controls.${index}.${name}`}
											/>

											{errors?.additional_controls?.[index]?.[name]
												? (
													<p className={styles.err_msg}>
														Required
													</p>
												) : null}
										</div>
									);
								})}
							</div>

							<div
								role="presentation"
								className={styles.add_icon}
								onClick={() => remove(index)}
							>
								<IcMDelete height={16} width={16} />
							</div>
						</div>
					))}

					<div
						role="presentation"
						className={styles.add_icon}
						onClick={() => append(CHILD_EMPTY_VALUES)}
					>
						<IcMPlusInCircle height={24} width={24} />
					</div>

				</Modal.Body>

				<Modal.Footer>
					<Button
						type="button"
						themeType="secondary"
						onClick={handleClose}
						style={{ marginRight: '6px' }}
					>
						Cancel

					</Button>
					<Button type="submit">Save</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
}

export default AdditionalControlsModal;
