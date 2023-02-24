import { Modal, Button } from '@cogoport/components';
import { asyncFieldsAudiences } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { useRouter } from '@cogoport/next';
import React from 'react';

// import getFormControls from '../controls/get-form-controls';
import useCreateAnnouncements from '../useCreateAnnouncement';

import FieldArray from './FieldArray';
import FormElement from './FormElement';
import Preview from './Preview';
import styles from './styles.module.css';

function AnnouncementForm({ defaultValues = {} }) {
	const {
		controls,
		control,
		watch,
		handleSubmit,
		onSubmit,
		showPreview,
		setShowPreview,
		loading,
		// setValue,
	} = useCreateAnnouncements({ defaultValues });
	// const { control, watch, handleSubmit } = useForm();
	const formValues = watch();
	// const allControls = getFormControls(formValues);
	// const [showPreview, setShowPreview] = useState(false);
	console.log('values', formValues);

	const { options } = useGetAsyncOptions({
		...asyncFieldsAudiences(),
	});
	// console.log('options', options);
	const finalOptions = options?.map((o) => ({
		label : `${o.name}`,
		value : `${o.id}`,
	}));
	const router = useRouter();
	const onClickAddAudience = () => {
		router.push(
			'/learning/faq/create/configuration?create=audience',
			'/learning/faq/create/configuration?create=audience',
		);
		// setConfigurationPage('audience');
		// reset();
	};

	const renderAddButton = () => (
		<div>
			<Button
				loading={loading}
				themeType="primary"
				size="sm"
				className={styles.add_audience_button}
				onClick={onClickAddAudience}
			>
				Add Audience
			</Button>
		</div>
	);

	// const onSubmit = async (values) => {
	// 	console.log('values', values);
	// };
	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.form}>
					{controls.map((controlItem) => {
						const controlStyle = controlItem?.style;
						const type = controlItem?.type;
						if (type === 'field-array') {
							return (
								<div style={{ ...controlStyle }}>

									<FieldArray
										control={control}
									// controls={controlItem.controls}
										{...controlItem}
										// controlStyle={controlStyle}
									/>
								</div>

							);
						}
						return (
							<div style={{ ...controlStyle, position: 'relative' }}>
								{controlItem.optionsListKey === 'audiences' && (
									renderAddButton()
								)}
								<FormElement
									name={controlItem.name}
									control={control}
									field={controlItem}
									options={controlItem.options || finalOptions}
								/>
							</div>
						);
					})}
				</div>
				<div className={styles.button_container}>
					<div>
						<Button
							loading={loading}
							themeType="tertiary"
							size="md"
							onClick={() => setShowPreview(true)}
						>
							Preview
						</Button>
					</div>

					<div>
						<Button
							type="submit"
							loading={loading}
							themeType="primary"
							size="md"
						>
							Submit
						</Button>
					</div>
				</div>

				<Modal
					show={showPreview}
					scroll={false}
					size="xl"
					placement="top"
					onClose={() => setShowPreview(false)}
				>
					<Modal.Header title="Preview" />
					<Modal.Body className={styles.modal}>
						<Preview formValues={formValues} />
					</Modal.Body>
				</Modal>

			</form>
		</div>
	);
}

export default AnnouncementForm;
