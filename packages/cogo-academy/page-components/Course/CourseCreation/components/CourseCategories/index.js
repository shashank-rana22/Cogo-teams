import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { useState } from 'react';

import { getFieldController } from '../../../commons/getFieldController';

import controls from './controls';
import useCreateCategory from './hooks/useCreateCategory';
import useCreateCourse from './hooks/useCreateCourse';
import styles from './styles.module.css';

function CourseCategories({
	setActiveStepper,
	courseData,
	setCourseData,
}) {
	const [show, setShow] = useState(false);

	const { control, formState:{ errors = {} }, handleSubmit } = useForm();

	const {
		createCategory,
		loading,
	} = useCreateCategory({ setShow });

	const {
		createCourse,
		loading: createCourseLoading,
	} = useCreateCourse();

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
						Create New Category
					</div>
				</div>

				<AsyncSelect
					value={courseData.course_categories}
					placeholder="Select category"
					isClearable
					onChange={(value) => setCourseData((prev) => ({ ...prev, course_categories: value }))}
					multiple
					asyncKey="list_course_categories"
					initialCall
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
					<Button
						type="button"
						size="md"
						themeType="primary"
						onClick={() => createCourse({ courseData })}
						loading={createCourseLoading}
					>
						Create Course

					</Button>
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

export default CourseCategories;
