import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import { getFieldController } from '../../../../../../../../../../commons/getFieldController';
import getPayload from '../../../../../../../utils/getPayload';

import controls from './controls';
import styles from './styles.module.css';

let RichTextEditor;

if (typeof window !== 'undefined') {
	// eslint-disable-next-line global-require, import/no-unresolved
	RichTextEditor = require('react-rte').default;
}

function ChapterContent({ chapterContent, onSaveChapter, subModuleId, index, chapterLoading }) {
	const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());

	const { control, formState:{ errors = {} }, watch, handleSubmit, setValue } = useForm();

	const additionalResourcesWatch = watch('additional_resources');

	const onSubmit = (values) => {
		const { isNew = false } = chapterContent || {};

		const payloadValues = getPayload({
			values,
			course_sub_module_id : subModuleId,
			index,
			editorValue,
			chapterId            : chapterContent.id,
			payloadType          : 'chapter',
			isNew,
			additionalResourcesWatch,
		});

		onSaveChapter({
			values  : payloadValues,
			chapter : chapterContent,
		});
	};

	useEffect(() => {
		const { name, description, content_type, chapter_content } = chapterContent || {};

		setValue('name', name);
		setValue('description', description);
		setValue('content_type', content_type);
		setEditorValue(RichTextEditor?.createValueFromString((chapter_content || ''), 'html'));
	}, [chapterContent, setValue]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
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
					rules,
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

				if (name === 'upload_presentation') {
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
								name={name}
								control={control}
								options={options}
								offLabel={offLabel}
								onLabel={onLabel}
								rows={rows}
								placeholder={placeholder}
								rules={rules}
								{...(type === 'fileUpload' ? { dropareaProps, draggable: true } : {})}
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
				<Button loading={chapterLoading} type="submit">Save</Button>
			</div>
		</form>
	);
}

export default ChapterContent;
