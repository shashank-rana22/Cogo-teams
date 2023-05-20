import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { forwardRef, useImperativeHandle, useEffect } from 'react';

import { getFieldController } from '../../../../../../../commons/getFieldController';

import controls from './controls';
import styles from './styles.module.css';

const MAPPING = ['course_categories', 'course_title', 'thumbnail_url', 'description'];

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

function PublishCourse({ data = {}, id = '' }, ref) {
	const {
		control,
		formState: { errors = {} },
		handleSubmit,
		setValue,
	} = useForm();

	useEffect(() => {
		MAPPING.forEach((item) => {
			if (data[item] && !isEmpty(data[item])) {
				setValue(item, data[item]);
			}
		});
	}, [data, setValue]);

	useImperativeHandle(ref, () => ({
		handleSubmit: () => {
			const onSubmit = (values) => {
				const {
					thumbnail_url,
					...restValues
				} = values || {};

				const { finalUrl = '' } = thumbnail_url || {};

				return {
					hasError : false,
					values   : {
						id,
						thumbnail_url: finalUrl,
						...restValues,
					},
				};
			};

			const onError = (error) => ({ hasError: true, error });

			return new Promise((resolve) => {
				handleSubmit(
					(values) => resolve(onSubmit(values)),
					(error) => resolve(onError(error)),
				)();
			});
		},
	}));

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
								{...(type === 'fileUpload'
									? removeTypeField(controlItem) : { ...controlItem })}
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

export default forwardRef(PublishCourse);
