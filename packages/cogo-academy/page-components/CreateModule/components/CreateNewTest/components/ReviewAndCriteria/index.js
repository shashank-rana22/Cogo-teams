import { Pill, Button, Placeholder, Toast } from '@cogoport/components';
import { useForm, InputController, useFieldArray } from '@cogoport/forms';
import { IcMArrowBack, IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useUpdateTest from '../../../../hooks/useUpdateTest';

import DurationAndValidity from './components/DurationAndValidity';
import QuestionsAndDistribution from './components/QuestionsAndDistribution';
import TestDetailsModal from './components/TestDetailsModal';
import styles from './styles.module.css';

function ReviewAndCriteria(props) {
	const { loading, data, test_id } = props;

	const { control, formState: { errors }, handleSubmit, setValue, getValues, watch } = useForm();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'guidelines',
	});

	const { name = '', set_data = [], cogo_entity_object = {} } = data || {};

	const { updateTest } = useUpdateTest();

	const router = useRouter();

	const [error, setError] = useState(false);

	useEffect(() => {
		setValue('guidelines', data?.guidelines?.map((guideline) => ({ instruction: guideline })));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const [showModal, setShowModal] = useState(false);

	const onNavigate = () => {
		const href = '/learning?activeTab=test_module';
		router.push(href, href);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack className={styles.back_icon} width={20} height={20} onClick={onNavigate} />
				<div className={styles.title}>New Test</div>
			</div>

			{(isEmpty(data) || loading) ? (
				<Placeholder
					height="100px"
					width="100%"
					margin="0px 0px 20px 0px"
				/>
			) : (
				<div className={styles.subcontainer}>
					<div className={styles.label}>{name || '-'}</div>

					<div className={styles.topic}>
						<div className={styles.subtopic}>Topics </div>
						<div className={styles.topic_pill_container}>
							{set_data.map((question_set) => (
								<Pill size="md" color="blue" className={styles.names}>
									<span className={styles.names}>{question_set?.topic}</span>
								</Pill>
							))}
						</div>
					</div>

					<div className={styles.entity}>
						<div className={styles.label_entity}>Cogo Entity </div>
						<div className={styles.entity_name}>{cogo_entity_object?.business_name}</div>
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
			)}

			<QuestionsAndDistribution
				data={data}
				control={control}
				errors={errors}
				loading={loading}
				setValue={setValue}
				watch={watch}
				setError={setError}
			/>

			<DurationAndValidity
				setValue={setValue}
				data={data}
				control={control}
				errors={errors}
				loading={loading}
			/>

			<TestDetailsModal
				getValues={getValues}
				handleSubmit={handleSubmit}
				{...props}
				showModal={showModal}
				setShowModal={setShowModal}
			/>

			<div className={styles.instructions}>
				<h3>Add Instructions</h3>
				{ fields.map((field, index) => (
					<div key={field.id}>
						<div className={styles.instruction}>
							<InputController
								className={styles.instruction_input}
								control={control}
								size="sm"
								name={`guidelines.${index}.instruction`}
								rules={{ required: 'This is required' }}
							/>
							<div role="presentation" className={styles.add_icon} onClick={() => remove(index)}>
								<IcMDelete height={20} width={20} />
							</div>
						</div>
						{errors?.guidelines?.[index]?.instruction?.message
						&& <p className={styles.err_msg}>{errors?.guidelines?.[index]?.instruction?.message}</p>}
					</div>
				))}
				<div
					role="presentation"
					className={styles.add_icon}
					onClick={() => append({ instruction: '' })}
				>
					<IcMPlusInCircle height={30} width={30} />
				</div>
			</div>

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
					loading={loading}
					size="md"
					themeType="primary"
					type="button"
					onClick={
						handleSubmit(() => {
							if (error) {
								Toast.error('Total questions and cases cannot be 0');
							} else {
								setShowModal(true);
							}
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
