/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import { Button } from '@cogoport/components';
import { useForm, InputController, MultiselectController } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import BodyTextEditor from './components/MyStatefulEditor';
import styles from './styles.module.css';

const TAG_OPTIONS = [
	{ label: 'tag1', value: 'tag1' },
	{ label: 'tag2', value: 'tag2' },
	{ label: 'tag3', value: 'tag3' },
	{ label: 'tag4', value: 'tag4' },
];

function CreateFAQ() {
	const router = useRouter();

	const onClickBackIcon = () => {
		router.back();
	};

	const { handleSubmit, formState: { errors }, control } = useForm();
	const [editorValue, setEditorValue] = useState('');

	const onSubmit = () => {
	};

	return (
		<div>
			<div className={styles.back_div} onClick={onClickBackIcon}>
				<IcMArrowBack width={20} height={20} />
				<div className={styles.back}>Back to Dashboard</div>
			</div>
			<div className={styles.heading_text}>
				Create A Question
			</div>

			<form className={styles.form_container} onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
				<div className={styles.input_container}>
					<div className={styles.input_label}>
						Name of the Question
					</div>
					<InputController
						control={control}
						name="create_faq"
						type="input"
						placeholder="Create a question."
						rules={{ required: 'Question is required.' }}
					/>
					{errors.create_faq && (
						<span className={styles.errors}>
							{errors.create_faq.message}
						</span>
					)}

				</div>

				<div className={styles.faq_answer_container}>
					<div className={styles.input_label}>
						Answer
					</div>
					<BodyTextEditor editorValue={editorValue} setEditorValue={setEditorValue} />

				</div>

				<div className={styles.select_container}>
					<div className={styles.input_label}>
						Select Tags
					</div>
					<MultiselectController
						name="tags"
						control={control}
						options={TAG_OPTIONS}
					/>

				</div>

				<div className={styles.button_container}>

					<Button themeType="tertiary" style={{ marginRight: '12px' }}>
						Cancel
					</Button>
					<Button type="submit">
						Preview & Publish
					</Button>
				</div>

			</form>

		</div>
	);
}

export default CreateFAQ;
