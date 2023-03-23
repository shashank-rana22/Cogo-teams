import { Modal, Button } from '@cogoport/components';
import { isEmpty, format } from '@cogoport/utils';
import React, { useState } from 'react';

import Spinner from '../../../../commons/Spinner';
import BodyTextEditor from '../../../CreateFAQ/Question/BodyTextEditor';
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
	const [showSubmitModal, setShowSubmitModal] = useState(false);

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
		editorValue,
		setEditorValue,
	} = useCreateAnnouncements({ defaultValues, announcement_id, actionType, listAudienceLoading, setShowSubmitModal });

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

	const submitFunction = () => {
		if (isEmpty(errors)) {
			setShowSubmitModal(true);
		}
	};

	const { validity = {} } = formValues;

	const { startDate = '' } = validity;

	const getSubmitModalHeader = () => {
		const start_date = format(startDate, 'dd MMM yyyy hh:mm a');
		return (
			<div className={styles.submit_modal_header}>
				This Announcement will go live on
				{' '}
				<span className={styles.live_date}>{start_date}</span>
				.
				Once it goes live it cannot be edited. Are you sure you want to Submit ?
			</div>
		);
	};

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
					const { name, label } = controlItem || {};

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

					if (type === 'textarea') {
						return (
							<div className={styles.text_editor_container}>
								<div className={styles.label}>{label}</div>
								<div className={styles.text_editor}>
									<BodyTextEditor
										editorValue={editorValue}
										setEditorValue={setEditorValue}
									/>
								</div>
							</div>
						);
					}

					return (
						<div className={styles.form_element} key={controlItem.name} style={{ position: 'relative' }}>
							{controlItem.optionsListKey === 'audiences' && (
								renderAddButton()
							)}

							{name === 'hot_duration' && !formValues.is_important ? null : (
								<FormElement
									name={controlItem.name}
									control={control}
									field={controlItem}
									errors={errors}
									value={name === 'is_important' && formValues.is_important}
									options={controlItem.options || audienceOptions}
								/>
							)}
						</div>
					);
				})}
			</div>

			<div className={styles.button_container}>
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

				<div>
					<Button
						type="submit"
						loading={loading}
						themeType="primary"
						size="md"
						onClick={handleSubmit(submitFunction)}
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
						<Preview
							formValues={formValues}
							editorValue={editorValue.toString('html')}
						/>
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
			{showSubmitModal && (
				<Modal
					show={showSubmitModal}
					size="lg"
					placement="center"
					onClose={() => setShowSubmitModal(false)}
				>
					<Modal.Header title={getSubmitModalHeader()} />

					<Modal.Body className={styles.preview_modal_body}>
						<Preview
							formValues={formValues}
							editorValue={editorValue.toString('html')}
						/>
					</Modal.Body>
					<Modal.Footer>
						<div className={styles.submit_buttons}>
							<Button
								type="button"
								themeType="secondary"
								size="md"
								onClick={() => setShowSubmitModal(false)}
								style={{ marginRight: '20px' }}
							>
								Cancel
							</Button>
							<Button
								button="type"
								themeType="primary"
								size="md"
								onClick={announcement_id ? handleSubmit(editAnnouncementDetails)
									: handleSubmit(onSubmit)}
							>
								Submit
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			)}
		</div>
	);
}

export default AnnouncementForm;
