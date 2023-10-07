import { Modal, Button, ButtonIcon } from '@cogoport/components';
import { IcMPlusInCircle, IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';
import useGetAdditionalControls from './useGetAdditionalControls';
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

	const {
		fields,
		append,
		remove,
		errors,
		control,
		controls,
		handleSave,
		handleClose,
		handleSubmit,
		CHILD_EMPTY_VALUES,
	} = useGetAdditionalControls({
		list,
		param,
		setParam,
		additionalControls,
		setParamScoringType,
		setAdditionalControls,
	});

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

							<ButtonIcon
								size="lg"
								icon={<IcMDelete />}
								onClick={() => remove(index)}
								themeType="primary"
							/>
						</div>
					))}

					<ButtonIcon
						size="xl"
						icon={<IcMPlusInCircle />}
						onClick={() => append(CHILD_EMPTY_VALUES)}
						themeType="primary"
					/>

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
