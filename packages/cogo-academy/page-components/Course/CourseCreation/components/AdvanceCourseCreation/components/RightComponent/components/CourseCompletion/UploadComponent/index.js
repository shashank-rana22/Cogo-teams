import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../../../../../../commons/getFieldController';
import { certificateControls } from '../controls';

import styles from './styles.module.css';

function UploadComponent() {
	const {
		control,
		formState: { errors = {} },
	} = useForm();
	return (
		<div className={styles.container}>
			{(certificateControls || []).map((controlItem) => {
				const { name, label, type, subControls = [], subLabel = '' } = controlItem || {};
				const Element = getFieldController(type);
				if (type === 'groupSelect') {
					return (
						<div className={`${styles.group_container} ${styles[name]}`}>
							{subControls.map((subControlItem) => {
								const {
									name:subControlName,
									label:subControlLabel,
									type:subControlType,
								} = subControlItem || {};

								const SubControlElement = getFieldController(subControlType);

								return (
									<div
										key={subControlName}
										className={`${styles.form_group} ${styles[subControlName]}`}
									>
										<div className={styles.label}>
											{subControlLabel}
											<sup className={styles.superscipt}>*</sup>
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
				return (
					<div key={name} className={`${styles.form_group} ${styles[name]}`}>
						<div className={styles.label}>
							{label}
							<sup className={styles.superscipt}>*</sup>
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
export default UploadComponent;
