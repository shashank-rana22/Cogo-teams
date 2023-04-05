import { Modal, Pill, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { startCase, format } from '@cogoport/utils';

import useUpdateTest from '../../../../../../hooks/useUpdateTest';

import styles from './styles.module.css';

function TestDetailsModal(props) {
	const {
		getValues, handleSubmit, data, test_id, loading, showModal, setShowModal, watch,
	} = props;

	const { name = '', set_data = [] } = data;

	const [test_duration = '', maximum_attempts = '',
		test_validity = {}, cut_off_percentage = '']	= getValues(['test_duration',
		'maximum_attempts', 'test_validity', 'cut_off_percentage']);

	const { updateTest, loading: loading_modal_state } = useUpdateTest();

	const standAloneQuestions = watch((set_data || []).map(({ id }) => (`${id}q`)));

	const caseStudyQuestions = watch((set_data || []).map(({ id }) => (`${id}c`)));

	const questionsCount = (standAloneQuestions || []).reduce(
		(total, currValue) => total + (Number(currValue) || 0),
		0,
	);

	const casesCount = (caseStudyQuestions || []).reduce(
		(total, currValue) => total + (Number(currValue) || 0),
		0,
	);

	return (
		<Modal size="sm" show={showModal} onClose={() => setShowModal(false)} placement="center">

			<Modal.Header className={styles.modal_title} title="Publish Test" />

			<Modal.Body className={styles.modal_body}>
				<h4 className={styles.test_name}>{name}</h4>

				{set_data?.map((question_set) => (
					<Pill
						key={question_set.id}
						size="sm"
						color="#CFEAED"
					>
						<div className={styles.q_topic}>{startCase(question_set.topic)}</div>
					</Pill>
				))}
				<div className={styles.user_entity_details}>
					<span className={styles.entity}>{data?.cogo_entity_object?.business_name}</span>
					<Pill size="md" color="#FEF3E9" className={styles.names}>
						<span className={styles.users}>{data?.eligible_users}</span>
					</Pill>
				</div>
				<div className={styles.test_details}>
					<div>
						<div>
							<h5 className={styles.duration}>Duration</h5>
							<p>
								{test_duration}
								{' '}
								mins
							</p>
						</div>

						<div>
							<h5 className={styles.validity}>Validity</h5>
							<p>
								{format(test_validity?.startDate, GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'])}
								{' '}
								-
								{' '}
								{format(test_validity?.endDate, GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'])}

							</p>
						</div>
					</div>

					<div>

						<div>
							<h5 className={styles.questions_cases}>
								Ques/Case
							</h5>
							<p>
								{questionsCount}
								Q
								{' '}
								+
								{' '}
								{casesCount}
								{' '}
								Case
							</p>
						</div>
						<div className={styles.attempts_pass}>
							<div className={styles.attempt_details}>
								<h5 className={styles.attempts}>Attempts</h5>
								<p>{maximum_attempts}</p>
							</div>

							<div>
								<h5 className={styles.cutoff}>Cutoff Pass %</h5>
								<p>
									{cut_off_percentage}
									%
								</p>
							</div>
						</div>

					</div>
				</div>

			</Modal.Body>

			<Modal.Footer align="right">
				<Button
					loading={loading_modal_state || loading}
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
	);
}

export default TestDetailsModal;
