import { isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../../../../../commons/getFieldController';

import controls from './controls';
import styles from './styles.module.css';

function PublishCourse({
	control,
	watch,
	handleSubmit,
	errors,
}) {
	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { name, label, type, subControls = [], subLabel = '', rules } = controlItem || {};

				if (type === 'groupSelect') {
					return (
						<div className={styles.group_container}>
							{subControls.map((subControlItem) => {
								const {
									name:subControlName,
									label:subControlLabel,
									type:subControlType,
									rules:subControlRules,
								} = subControlItem || {};

								const SubControlElement = getFieldController(subControlType);

								return (
									<div
										key={subControlName}
										className={`${styles.form_group} ${styles[subControlName]}`}
									>
										<div className={styles.label}>
											{subControlLabel}
											{subControlRules ? <sup className={styles.superscipt}>*</sup> : null}
										</div>

										<div className={`${styles.input_group} ${styles[subControlName]}`}>
											<SubControlElement
												{...subControlItem}
												key={subControlName}
												control={control}
												id={`${subControlName}_input`}
											/>
										</div>

										{errors?.[subControlName]?.message ? (
											<div className={styles.error_message}>
												{errors?.[subControlName]?.message}
											</div>
										) : null}
									</div>
								);
							})}
						</div>
					);
				}

				const Element = getFieldController(type);

				if (!Element) return null;

				return (
					<div key={name} className={`${styles.form_group} ${styles[name]}`}>
						<div className={styles.label}>
							{label}
							{rules ? <sup className={styles.superscipt}>*</sup> : null}
						</div>

						<div className={`${styles.input_group} ${styles[name]}`}>
							<Element
								{...controlItem}
								key={name}
								control={control}
								id={`${name}_input`}
							/>
						</div>

						{!isEmpty(subLabel) ? <div className={styles.sub_label}>{subLabel}</div> : null}

						{errors?.[name]?.message ? (
							<div className={styles.error_message}>
								{errors?.[name]?.message}
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

export default PublishCourse;
