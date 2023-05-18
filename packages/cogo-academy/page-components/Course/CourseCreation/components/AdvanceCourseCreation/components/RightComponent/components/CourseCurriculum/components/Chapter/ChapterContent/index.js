import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { getFieldController } from '../../../../../../../../../../commons/getFieldController';

import controls from './controls';
import styles from './styles.module.css';
import useHandleChapterContent from './useHandleChapterContent';

function ChapterContent({
	chapterContent,
	onSaveChapter,
	subModuleId,
	index,
	chapterLoading,
}) {
	const {
		RichTextEditor,
		onSubmit,
		control,
		errors,
		handleSubmit,
		contentTypeWatch,
		additionalResourcesWatch,
		editorValue,
		setEditorValue,
		uploadVideoWatch,
		uploadDocumentWatch,
	} = useHandleChapterContent({
		chapterContent,
		onSaveChapter,
		subModuleId,
		index,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
			{controls.map((controlItem) => {
				const {
					elementType,
					label,
					name,
					subControls = [],
				} = controlItem || {};

				if (elementType === 'groupSelect') {
					return (
						<div className={styles.group_select}>
							<div className={styles.label}>
								{label}
								<sup className={styles.superscipt}>*</sup>
							</div>

							<div className={styles.select_group}>
								{subControls.map((subControlItem) => {
									const { name: subControlName, elementType: subControlType } = subControlItem || {};

									const SubControlElement = getFieldController(subControlType);

									return (
										<div
											key={name}
											className={`${styles.form_group} ${styles[subControlName]}`}
										>
											<div
												className={`${styles.input_group} ${styles[subControlName]}`}
											>
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
						</div>
					);
				}

				if (
					['additional_resources_title', 'additional_resources_link'].includes(
						name,
					)
					&& !additionalResourcesWatch
				) {
					return null;
				}

				if (name === 'upload_file' && additionalResourcesWatch) {
					return null;
				}

				if (
					!['presentation', 'text'].includes(contentTypeWatch)
					&& name === 'upload_presentation'
				) {
					return null;
				}

				if (contentTypeWatch !== 'document' && name === 'upload_document') {
					return null;
				}

				if (contentTypeWatch !== 'video' && name === 'upload_video') {
					return null;
				}

				if (
					!['presentation', 'text'].includes(contentTypeWatch)
					&& name === 'upload_presentation'
				) {
					return null;
				}

				const docToUse = name === 'upload_video' ? uploadVideoWatch : uploadDocumentWatch;

				const Element = getFieldController(elementType);

				if (!Element) return null;

				if (contentTypeWatch === 'text' && name === 'upload_presentation') {
					return (
						<div style={{ marginTop: '24px' }}>
							<RichTextEditor
								value={editorValue}
								onChange={setEditorValue}
								required
								id="body-text"
								name="bodyText"
								type="string"
								multiline
								variant="filled"
								placeholder="Start Typing Here..."
								rootStyle={{
									zIndex    : 0,
									position  : 'relative',
									minHeight : '200px',
								}}
							/>
						</div>
					);
				}

				return (
					<div key={name} className={`${styles.form_group} ${styles[name]}`}>
						<div className={styles.label}>{label}</div>

						<div className={`${styles.input_group} ${styles[name]}`}>
							<Element
								control={control}
								checked={additionalResourcesWatch}
								{...controlItem}
							/>
						</div>

						{errors?.[name]?.message ? (
							<div className={styles.error_message}>
								{errors?.[name]?.message}
							</div>
						) : null}

						{['upload_video', 'upload_document'].includes(name)
						&& !isEmpty(docToUse) ? (
							<iframe
								style={{ width: '100%', marginTop: '20px' }}
								height="400"
								src={
									name === 'upload_video'
										? uploadVideoWatch.replace('/watch?v=', '/embed/')
										: uploadDocumentWatch?.finalUrl
								}
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; clipboard-write;
										encrypted-media; gyroscope; picture-in-picture; web-share"
								allowfullscreen="true"
							/>
							) : null}
					</div>
				);
			})}

			<div className={styles.button_container}>
				<Button loading={chapterLoading} type="submit">
					Save
				</Button>
			</div>
		</form>
	);
}

export default ChapterContent;
