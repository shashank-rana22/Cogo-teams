import { Button } from '@cogoport/components';
import { InputController, PillsController, SelectController } from '@cogoport/forms';
import UploadController from '@cogoport/forms/page-components/Controlled/UploadController';

import useCreateUpdate from '../../../hooks/useCreateUpdate';

import styles from './styles.module.css';

function CreateUpdateForm() {
	const {
		handleSubmit,
		errors,
		watch,
		control,
		loading,
		onCreate,
		fields,
	} = useCreateUpdate();

	const getElementController = (type = 'text') => {
		switch (type) {
			case 'text':
				return InputController;

			case 'select':
				return SelectController;

			case 'file':
				return UploadController;

			case 'pills':
				return PillsController;

			default:
				return null;
		}
	};

	const watchType = watch('type');

	return (
		<form onSubmit={handleSubmit(onCreate)}>
			<div className={styles.content}>
				{fields.map((field) => {
					const { condition = {}, ...rest } = field;
					const Element = getElementController(rest.type);
					if (!Element) return null;
					if (!('condition' in field) || condition?.type?.includes(watchType?.value)) {
						return (
							<div className={styles.list}>
								<h4>{field.label}</h4>
								<Element
									width="100%"
									control={control}
									id={`create_role_form_${field.name}_field`}
									{...rest}
								/>
								<div className={styles.error}>{errors[field.name]?.message}</div>
							</div>
						);
					}
					return null;
				})}
			</div>
			<Button disabled={loading} type="submit">Submit</Button>
		</form>
	);
}
export default CreateUpdateForm;
