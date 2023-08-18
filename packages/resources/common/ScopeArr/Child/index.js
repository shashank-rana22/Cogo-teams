import { Tooltip, ButtonIcon } from '@cogoport/components';
import { IcMMinusInCircle } from '@cogoport/icons-react';
import { useEffect } from 'react';

import getFieldControls from '../../../configs/field-controls';
import scopePossibleThroughCriteriaMap from '../../../constants/scope-possible-through-criteria';
import { getElementController } from '../../../utils/getElementController';

function Child({
	item, styles, remove, errors, index, control, disableRemove = false,
	setValue, clearErrors, watch, source = 'create_resource', getValues = () => {}, selectedApi = {},
}) {
	const scopeType = watch(`scopes[${index}].view_type`);

	const scopeControls = getFieldControls({ index, selectedApi, getValues, source });

	const { controls } = scopeControls;

	const newControls = controls.map((cntrl) => {
		const newCntrl = { ...cntrl };
		if (newCntrl.key === 'through_criteria') {
			if (scopePossibleThroughCriteriaMap[scopeType]) {
				newCntrl.options = scopePossibleThroughCriteriaMap[scopeType];
				newCntrl.rules = { required: 'Through Criteria is required for this scope type.' };
				newCntrl.renderLabel = true;
			} else {
				newCntrl.disabled = true;
				newCntrl.rules = { required: false };
			}
		}
		return newCntrl;
	});

	const isErrored = (field) => !!errors?.scopes?.[index]?.[field]?.message;

	const errorData = (field) => (isErrored(field) ? errors?.scopes?.[index]?.[field]?.message : '');

	useEffect(() => {
		if (scopeType !== item.view_type) {
			clearErrors(`scopes[${index}].through_criteria`);
			setValue(`scopes[${index}].through_criteria`, []);
		}
	}, [setValue, clearErrors, scopeType, item, index]);

	return (
		<div className={styles.scope_info}>
			<section className={styles.scope_content}>
				{newControls.map((controlItem) => {
					const el = { ...controlItem };
					const Element = getElementController(el.type);

					if (!Element) return null;

					return (
						<div
							style={{ flex: 1 }}
							className={styles.form_group}
							key={`${item.id}_${el.name}`}
						>
							<span>{el.label}</span>

							<div
								style={{ width: '100%' }}
								className={`${styles.input_group} 
                                            ${isErrored(el.key) ? styles.errorful : ''}`}
							>
								<Tooltip
									disabled={!errorData(el.key)}
									content={(
										<div className={styles.error_message}>
											{errorData(el.key)}
										</div>
									)}
									placement="bottom"
								>

									<Element
										{...el}
										control={control}
									/>
								</Tooltip>
							</div>
						</div>
					);
				})}
			</section>

			<ButtonIcon
				icon={<IcMMinusInCircle />}
				style={{ marginRight: '8px' }}
				themeType="primary"
				onClick={() => remove(index)}
				disabled={disableRemove}
			/>
		</div>
	);
}

export default Child;
