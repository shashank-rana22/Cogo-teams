import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { useState } from 'react';

import { getFieldController } from '../../../commons/getFieldController';

import controls from './controls';
import styles from './styles.module.css';
import useCreateTopic from './useCreateTopic';

const options = [
	{ label: 'Harper Lee', value: 'To Kill a Mockingbird' },
	{ label: 'Lev Tolstoy', value: 'War and Peace' },
];

function CourseTopics({
	setActiveStepper,
	courseData,
	setCourseData,
}) {
	const [show, setShow] = useState(false);

	const { control, formState:{ errors = {} }, handleSubmit } = useForm();

	const {
		createCategory,
		loading,
	} = useCreateTopic({ setShow });

	const handlePreviousState = () => {
		setActiveStepper('course_name');
	};

	const onSubmit = (values) => {
		createCategory({ values });
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>Which Category does your Course belong to?</div>

			<div className={styles.tag_line}>
				This will help users find your course during Consumption
			</div>

			<div className={styles.input_container}>
				<div className={styles.label_container}>
					<div
						role="presentation"
						className={styles.create_tag_label}
						onClick={() => setShow(true)}
					>
						Create New Topic
					</div>
				</div>

				<AsyncSelect
					value={courseData.course_topics}
					placeholder="Select topics"
					options={options}
					isClearable
					onChange={(value) => setCourseData((prev) => ({ ...prev, course_topics: value }))}
					multiple
					asyncKey="list_course_category"
				/>
			</div>

			<div className={styles.footer}>
				<div className={styles.prev_button}>
					<Button
						type="button"
						onClick={handlePreviousState}
						size="md"
						themeType="secondary"
					>
						Previous
					</Button>
				</div>

				<div className={styles.create_button}>
					<Button type="button" size="md" themeType="primary">Create Course</Button>
				</div>
			</div>

			<Modal
				size="sm"
				show={show}
				onClose={() => setShow(false)}
				closeOnOuterClick={false}
				showCloseIcon={false}
			>
				<Modal.Header title="Add new category here" />

				<Modal.Body>
					<div className={styles.modal_container}>
						{controls.map((controlItem) => {
							const { type, label, name } = controlItem || {};

							const Element = getFieldController(type);

							if (!Element) return null;

							return (
								<div key={name} className={`${styles.form_group} ${styles[name]}`}>
									<div className={styles.label}>{label}</div>

									<div className={`${styles.input_group} ${styles[name]}`}>
										<Element
											{...controlItem}
											key={name}
											control={control}
											id={`${name}_input`}
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
				</Modal.Body>

				<Modal.Footer>
					<Button
						type="button"
						themeType="secondary"
						style={{ marginRight: 8 }}
						disabled={loading}
						onClick={() => setShow(false)}
					>
						Cancel
					</Button>

					<Button
						type="button"
						loading={loading}
						onClick={handleSubmit(onSubmit)}
					>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default CourseTopics;
