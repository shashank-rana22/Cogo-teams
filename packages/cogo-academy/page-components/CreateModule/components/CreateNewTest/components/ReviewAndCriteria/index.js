/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Pill, Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import useUpdateTest from '../../../../hooks/useUpdateTest';

import DurationAndValidity from './components/DurationAndValidity';
import QuestionsAndDistribution from './components/QuestionsAndDistribution';
import styles from './styles.module.css';

function ReviewAndCriteria({
	setActiveStepper,
	loading,
	data,
	test_id,
}) {
	const { control, formState:{ errors }, handleSubmit, setValue } = useForm();

	const { updateTest } = useUpdateTest();
	const router = useRouter();

	const navigate = () => {
		const href = '/learning/test-module/create-test';
		router.push(href, href);
		setActiveStepper('details_and_questions');
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack width={20} height={20} onClick={navigate} />
				<div className={styles.title} onClick={navigate}>New Test</div>
			</div>

			<div className={styles.subcontainer}>
				<div className={styles.label}>{data?.name || '-'}</div>
				<div className={styles.topic}>
					<div className={styles.subtopic}>Topics </div>
					<div className={styles.topic_pill_container}>
						{data?.set_data?.map((question_set) => (
							<Pill size="md" color="blue" className={styles.names}>
								<span className={styles.names}>{question_set?.topic}</span>
							</Pill>
						))}
					</div>
				</div>

				<div className={styles.entity}>
					<div className={styles.label_entity}>Cogo Entity </div>
					<div className={styles.entity_name}>{data?.cogo_entity_object?.business_name}</div>
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

			{/* <Button
				className={styles.btn}
				size="md"
				themeType="accent"
				onClick={() => setShow(true)}
			>
				Add Instructions
			</Button> */}
			{/* <Modal size="md" show={show} onClose={() => setShow(false)} placement="center">
				<Modal.Header title="Add instructions" />
				<Modal.Body>
					{fields.map((field, index) => (
						<div className={styles.instruction}>
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
				</Modal.Body>
				<Modal.Footer align="right">
					<Button onClick={() => {
						append({ instruction: '' });
					}}
					>
						Add New Instruction
					</Button>
				</Modal.Footer>
			</Modal> */}

			<div className={`${styles.btn_container} ${styles.btn_cont_float}`}>
				<Button
					loading={loading}
					size="md"
					themeType="tertiary"
					style={{ marginRight: '10px' }}
					onClick={
						handleSubmit((values) => {
							if (!isEmpty(errors)) Toast.error('Fill all required fields');
							updateTest({ test_id, values, status: 'draft' });
						})
					}
				>
					Save As Draft
				</Button>
				<Button
					size="md"
					themeType="primary"
					onClick={
						handleSubmit((values) => {
							if (!isEmpty(errors)) Toast.error('Fill all required fields');
							updateTest({ test_id, values, status: 'active' });
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
