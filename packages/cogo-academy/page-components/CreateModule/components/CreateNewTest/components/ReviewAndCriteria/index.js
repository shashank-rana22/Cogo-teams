import { Pill, Button, Placeholder, Tooltip } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMArrowBack, IcMDelete, IcMPlusInCircle, IcMDocument } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import DurationAndValidity from './components/DurationAndValidity';
import QuestionsAndDistribution from './components/QuestionsAndDistribution';
import TestDetailsModal from './components/TestDetailsModal';
import styles from './styles.module.css';
import useHandleReviewAndCriteria from './useHandleReviewAndCriteria';

function ReviewAndCriteria(props) {
	const { loading, data, test_id } = props;

	const {
		name = '',
		set_data = [],
		cogo_entity_object = {},
		eligible_users = '',
		guidelines = [],
		test_sheet = {},
	} = data || {};

	const {
		checkError,
		onNavigate,
		updateTest,
		errors,
		handleSubmit,
		getValues,
		watch,
		fields,
		append,
		remove,
		setError,
		showModal,
		control,
		setShowModal,
		setValue,
	} = useHandleReviewAndCriteria({ guidelines });

	const openInNewTab = (url) => {
		window.open(url, '_blank', 'noopener,noreferrer');
	};

	const file_name = test_sheet?.file_url?.split('/').pop();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMArrowBack className={styles.back_icon} width={20} height={20} onClick={onNavigate} />
				<div className={styles.title}>Review and Set Criteria</div>
			</div>

			{(loading || isEmpty(data)) ? (
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
								<Pill size="md" color="#F3FAFA" className={styles.names}>
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
								<div className={styles.eligible}>
									{eligible_users || '-'}
								</div>
							</Pill>
						</div>
					</div>

					{test_sheet?.file_url && (
						<div className={styles.list_user_tooltip}>
							<Tooltip content={file_name} placement="top" maxWidth={300}>
								<div className={styles.list_user_container}>
									List Upload
									<div className={styles.list_div}>
										<IcMDocument />
										<div
											role="presentation"
											className={styles.list_text}
											onClick={() => openInNewTab(test_sheet?.file_url)}
										>
											{file_name}
										</div>
									</div>
								</div>
							</Tooltip>
						</div>
					)}
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
				watch={watch}
			/>

			<div className={styles.instructions}>
				<h3>Add Instructions</h3>
				{fields.map((field, index) => (
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
					type="button"
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
					onClick={handleSubmit(checkError)}
				>
					Publish Test
				</Button>
			</div>
		</div>
	);
}

export default ReviewAndCriteria;
