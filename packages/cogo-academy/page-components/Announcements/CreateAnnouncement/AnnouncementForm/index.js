import { Modal, Button } from '@cogoport/components';
import React, { useState } from 'react';

import Spinner from '../../../../commons/Spinner';
import useCreateAnnouncements from '../useCreateAnnouncement';

import CreateAudienceForm from './CreateAudienceForm';
import FieldArray from './FieldArray';
import FormElement from './FormElement';
import Preview from './Preview';
import styles from './styles.module.css';
import useListAudiences from './useListAudiences';

function AnnouncementForm({
	defaultValues = {},
	disabled = false,
	announcement_id = '',
	actionType,
	loadingForm = false,
}) {
	const [showCreateAudience, setShowCreateAudience] = useState(false);

	const { audienceOptions = [], fetchAudiences = () => {}, listAudienceLoading = false } = useListAudiences();

	const {
		controls,
		control,
		formValues,
		handleSubmit,
		onSubmit,
		showPreview,
		setShowPreview,
		editAnnouncementDetails = () => {},
		loading,
		errors,
	} = useCreateAnnouncements({ defaultValues, announcement_id, actionType, listAudienceLoading });

	const renderAddButton = () => (
		<div>
			<Button
				type="add"
				themeType="secondary"
				size="sm"
				className={styles.add_audience_button}
				onClick={() => setShowCreateAudience(true)}
			>
				+ADD
			</Button>
		</div>
	);

	if (listAudienceLoading || loadingForm) {
		return (
			<div className={styles.spinner}>
				<Spinner width="100px" height="100px" />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				{controls.map((controlItem) => {
					const type = controlItem?.type;
					const { name } = controlItem || {};

					if (['files', 'images', 'videos'].includes(controlItem.name) && disabled) return null;

					if (type === 'field-array') {
						return (
							<div className={styles.form_element} key={controlItem.name}>
								<FieldArray
									formValues={formValues}
									control={control}
									showLabelOnce
									{...controlItem}
								/>
							</div>
						);
					}

					return (
						<div className={styles.form_element} key={controlItem.name} style={{ position: 'relative' }}>
							{controlItem.optionsListKey === 'audiences' && (
								renderAddButton()
							)}

							<FormElement
								name={controlItem.name}
								control={control}
								field={controlItem}
								errors={errors}
								value={name === 'is_important' && formValues.is_important}
								options={controlItem.options || audienceOptions}
							/>
						</div>
					);
				})}
			</div>

			<div className={styles.button_container}>
				{!announcement_id && (
					<div>
						<Button
							type="preview"
							themeType="tertiary"
							size="md"
							onClick={() => setShowPreview(true)}
							className={styles.preview_button}
						>
							Preview
						</Button>
					</div>
				)}

				<div>
					<Button
						type="submit"
						loading={loading}
						themeType="primary"
						size="md"
						onClick={announcement_id ? handleSubmit(editAnnouncementDetails) : handleSubmit(onSubmit)}
					>
						Submit
					</Button>
				</div>
			</div>

			{showPreview && (
				<Modal
					show={showPreview}
					size="lg"
					placement="center"
					onClose={() => setShowPreview(false)}
				>
					<Modal.Header title={formValues.title} />

					<Modal.Body className={styles.preview_modal_body}>
						<Preview formValues={formValues} />
					</Modal.Body>
				</Modal>
			)}

			{showCreateAudience && (
				<Modal
					show={showCreateAudience}
					size="lg"
					placement="fullscreen"
					onClose={() => setShowCreateAudience(false)}
				>
					<Modal.Header title="Add Audience" />

					<Modal.Body className={styles.audience_modal}>
						<CreateAudienceForm
							setShowCreateAudience={setShowCreateAudience}
							fetchAudiences={fetchAudiences}
						/>
					</Modal.Body>
				</Modal>
			)}
		</div>
	);
}

export default AnnouncementForm;
