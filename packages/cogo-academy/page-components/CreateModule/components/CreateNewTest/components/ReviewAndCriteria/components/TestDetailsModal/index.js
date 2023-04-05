import { Modal, Pill, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { startCase, format } from '@cogoport/utils';

import useUpdateTest from '../../../../../../hooks/useUpdateTest';

import styles from './styles.module.css';

function TestDetailsModal(props) {
	const { getValues, handleSubmit, data, test_id, loading, showModal, setShowModal } = props;

	const { name = '', set_data = [] } = data;

	const [test_duration = '', maximum_attempts = '',
		test_validity = {}, cut_off_percentage = '']	= getValues(['test_duration',
		'maximum_attempts', 'test_validity', 'cut_off_percentage']);

	const { updateTest } = useUpdateTest();

	return (
		<Modal size="sm" show={showModal} onClose={() => setShowModal(false)} placement="center">

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

				<div className={styles.test_details}>
					<div>
						<div>
							<h5>Duration</h5>
							<p>
								{test_duration}
								{' '}
								mins
							</p>
						</div>

						<div>
							<h5>Attempts</h5>
							<p>{maximum_attempts}</p>
						</div>
					</div>

					<div>
						<div>
							<h5>Validity</h5>
							<p>
								{format(test_validity?.startDate, GLOBAL_CONSTANTS.formats.date['dd/MMM/yyyy'])}
								{' '}
								-
								{' '}
								{format(test_validity?.endDate, GLOBAL_CONSTANTS.formats.date['dd/MMM/yyyy'])}

							</p>
						</div>

						<div>
							<h5>Cutoff Pass %</h5>
							<p>
								{cut_off_percentage}
							</p>
						</div>
					</div>
				</div>
			</Modal.Body>

			<Modal.Footer align="right">
				<Button
					loading={loading}
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
