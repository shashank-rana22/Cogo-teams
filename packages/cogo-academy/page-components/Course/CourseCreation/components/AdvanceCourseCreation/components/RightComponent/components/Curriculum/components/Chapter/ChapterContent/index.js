import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import { getFieldController } from '../../../../../../../../../../commons/getFieldController';

import controls from './controls';
import styles from './styles.module.css';

function ChapterContent() {
	const { control, formState:{ errors = {} }, watch } = useForm();

	const additionalResourcesWatch = watch('additional_resources');

	return (
		<div className={styles.container}>
			{controls.map((controlItem) => {
				const {
					type,
					label,
					name,
					dropareaProps,
					options,
					offLabel,
					onLabel,
					rows,
					placeholder,
				} = controlItem || {};

				if (['additional_resources_title', 'additional_resources_link']
					.includes(name) && !additionalResourcesWatch) {
					return null;
				}

				if (name === 'upload_file' && additionalResourcesWatch) {
					return null;
				}

				const Element = getFieldController(type);

				if (!Element) return null;

				return (
					<div key={name} className={`${styles.form_group} ${styles[name]}`}>
						<div className={styles.label}>{label}</div>

						<div className={`${styles.input_group} ${styles[name]}`}>
							<Element
								name={name}
								control={control}
								options={options}
								offLabel={offLabel}
								onLabel={onLabel}
								rows={rows}
								placeholder={placeholder}
								{...(type === 'fileUpload' ? { dropareaProps, draggable: true } : null)}
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

			<div className={styles.button_container}>
				<Button>Save</Button>
			</div>
		</div>
	);
}

export default ChapterContent;
