/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Pill, Button, Modal, ButtonIcon } from '@cogoport/components';
import { useForm, InputController, useFieldArray } from '@cogoport/forms';
import { IcMArrowBack, IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateTest from '../../../../hooks/useUpdateTest';

import DurationAndValidity from './components/DurationAndValidity';
import QuestionsAndDistribution from './components/QuestionsAndDistribution';
import styles from './styles.module.css';

function ReviewAndCriteria({
	loading,
	data,
	test_id,
}) {
	const { control, formState: { errors }, handleSubmit, setValue } = useForm();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'guidelines',
	});

	const { name = '', set_data = [], cogo_entity_object = {} } = data || {};

	const { updateTest } = useUpdateTest();

	const router = useRouter();

	const [showModal, setShowModal] = useState(false);

	const navigate = () => {
		const href = '/learning?activeTab=test_module';
		router.push(href, href);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack width={20} height={20} onClick={navigate} />
				<div className={styles.title} onClick={navigate}>New Test</div>
			</div>

			<div className={styles.subcontainer}>
				<div className={styles.label}>{name || '-'}</div>

				<div className={styles.topic}>
					<div className={styles.subtopic}>Topics </div>
					<div className={styles.topic_pill_container}>
						{set_data.map((question_set) => (
							<Pill size="md" color="blue" className={styles.names}>
								<span className={styles.names}>{question_set.topic}</span>
							</Pill>
						))}
					</div>
				</div>

				<div className={styles.entity}>
					<div className={styles.label_entity}>Cogo Entity </div>
					<div className={styles.entity_name}>{cogo_entity_object.business_name}</div>
				</div>

				<div className={styles.topic}>
					<div className={styles.subtopic}> Users </div>
					<div>
						<Pill size="md" color="#FEF3E9" className={styles.names}>
							<span className={styles.names}>KAM 1</span>
						</Pill>
						<Pill size="md" color="#FEF3E9">
							<span className={styles.names}>KAM 2</span>
						</Pill>
					</div>
				</div>
			</div>

			<QuestionsAndDistribution
				data={data}
				control={control}
				errors={errors}
				loading={loading}
				setValue={setValue}
			/>

			<DurationAndValidity setValue={setValue} data={data} control={control} errors={errors} loading={loading} />

			<Modal size="md" show={showModal} onClose={() => setShowModal(false)} placement="center">
				<Modal.Header className={styles.modal_title} title="Publish Test" />
				<Modal.Body className={styles.modal_body}>
					<h4 className={styles.test_name}>{name}</h4>

					{set_data?.map((question_set) => (
						<Pill
							key={question_set.id}
							size="sm"
							color="blue"
						>
							{startCase(question_set.topic)}
						</Pill>
					))}

					<h5>Add Instructions</h5>

					{fields.map((field, index) => (
						<div className={styles.instruction} key={field.id}>
							<InputController
								control={control}
								key={field.id}
								name={`guidelines.${index}.instruction`}
							/>
							<ButtonIcon
								size="xl"
								icon={<IcMDelete />}
								themeType="primary"
								onClick={() => remove(index)}
							/>
						</div>
					))}

					<ButtonIcon
						size="xl"
						icon={<IcMPlusInCircle />}
						themeType="primary"
						onClick={() => append({ instruction: '' })}
					/>
				</Modal.Body>
				<Modal.Footer align="right">
					<Button
						size="md"
						themeType="primary"
						onClick={
						handleSubmit((values) => {
							updateTest({ test_id, values, status: 'active' });
						})
					}
					>
						Publish Test
					</Button>
				</Modal.Footer>
			</Modal>

			<div className={`${styles.btn_container} ${styles.btn_cont_float}`}>
				<Button
					loading={loading}
					size="md"
					themeType="tertiary"
					style={{ marginRight: '10px' }}
					onClick={
						handleSubmit((values) => {
							updateTest({ test_id, values, status: 'draft' });
						})
					}
				>
					Save As Draft
				</Button>
				<Button
					size="md"
					themeType="primary"
					type="button"
					onClick={
						handleSubmit(() => {
							setShowModal(true);
						})
					}
				>
					Publish Test
				</Button>
			</div>
		</div>
	);
}

export default ReviewAndCriteria;
