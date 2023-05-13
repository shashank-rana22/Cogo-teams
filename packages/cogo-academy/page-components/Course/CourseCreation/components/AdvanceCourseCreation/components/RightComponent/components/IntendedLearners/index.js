import { useForm } from '@cogoport/forms';
import { useEffect, forwardRef, useImperativeHandle } from 'react';

import { getFieldController } from '../../../../../../../commons/getFieldController';

import controls from './controls';
import ExcelComponent from './ExcelComponent';
import styles from './styles.module.css';
import useGetAudiences from './useGetAudiences';

function IntendedLearners({ data = {} }, ref) {
	const {
		control,
		formState: { errors = {} },
		watch,
		handleSubmit,
		setValue,
	} = useForm();

	const mandatoryAudiencesUserWatch = watch('mandatory_audiences_user');

	const { audiences = [] } = useGetAudiences();

	const selectedAudiences = watch('audiences');

	const mandatoryAudiencesOptions = audiences.filter((item) => (watch('audiences').includes(item.value)));

	useEffect(() => {
		setValue('mandatory_audiences', []);
	}, [selectedAudiences, setValue]);

	useImperativeHandle(ref, () => ({ handleSubmit }));

	console.log(watch());

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const { type, label, name, rules } = controlItem || {};

				const Element = getFieldController(type);

				if (!Element) return null;

				if (name === 'upload_excel' && mandatoryAudiencesUserWatch !== 'custom') {
					return null;
				}

				if (name === 'upload_excel') {
					return (
						<ExcelComponent
							Element={Element}
							name={name}
							label={label}
							controlItem={controlItem}
							control={control}
							errors={errors}
						/>
					);
				}

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
								{...(name === 'audiences' && { options: audiences })}
								{...(name === 'mandatory_audiences' && { options: mandatoryAudiencesOptions })}
							/>
						</div>

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

export default forwardRef(IntendedLearners);
