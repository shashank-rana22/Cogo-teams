import { Modal, Button } from '@cogoport/components';
import { asyncFieldsAudiences } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
// import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import useCreateAnnouncements from '../useCreateAnnouncement';

// import useCreateAnnouncements from '../useCreateAnnouncement';

import CreateAudienceForm from './CreateAudienceForm';
import FieldArray from './FieldArray';
import FormElement from './FormElement';
import Preview from './Preview';
import styles from './styles.module.css';

function AnnouncementForm() {
	const {
		controls,
		control,
		watch,
		handleSubmit,
		onSubmit,
		showPreview,
		setShowPreview,
		loading,
		errors,
		// setValue,
	} = useCreateAnnouncements();

	const [showCreateAudience, setShowCreateAudience] = useState(false);
	const formValues = watch();

	const { options } = useGetAsyncOptions({
		...asyncFieldsAudiences(),
	});
	const finalOptions = options?.map((o) => ({
		label : `${o.name}`,
		value : `${o.id}`,
	}));

	const renderAddButton = () => (
		<div>
			<Button
				themeType="secondary"
				size="sm"
				className={styles.add_audience_button}
				// onClick={onClickAddAudience}
				onClick={() => setShowCreateAudience(true)}
			>
				+ADD
			</Button>
		</div>
	);
	return (
		<div className={styles.container}>
			{/* <form onSubmit={}> */}
			<div className={styles.form}>
				{controls.map((controlItem) => {
					const controlStyle = controlItem?.style;
					const type = controlItem?.type;
					if (type === 'field-array') {
						return (
							<div style={{ ...controlStyle }}>
								<FieldArray
									formValues={formValues}
									control={control}
									{...controlItem}
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
								errors={errors}
								options={controlItem.options || finalOptions}
							/>
						</div>
					);
				})}
			</div>
			<div className={styles.button_container}>
				<div>
					<Button
						themeType="tertiary"
						size="md"
						onClick={() => setShowPreview(true)}
					>
						Preview
					</Button>
				</div>

				<div>
					{/* {console.log('hello', handleSubmit)} */}
					<Button
						// type="submit"
						loading={loading}
						themeType="primary"
						size="md"
						onClick={handleSubmit(onSubmit)}
					>
						Submit
					</Button>
				</div>
			</div>

			{/* </form> */}
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

			<Modal
				show={showCreateAudience}
				size="lg"
				onClose={() => setShowCreateAudience(false)}
			>
				<Modal.Header title="Add Audience" />
				<Modal.Body className={styles.audience_modal}>
					<CreateAudienceForm setShowCreateAudience={setShowCreateAudience} />
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default AnnouncementForm;
