import { Button, Modal, Table, Radio, Textarea } from '@cogoport/components';
import { useState } from 'react';

import useGetOrganizationServiceExpertises from '../hooks/useGetOrganizationServiceExpertises';
import useUpdateOrganizationServiceExpertiseFeedback from '../hooks/useUpdateOrganizationServiceExpertiseFeedback';

import styles from './styles.module.css';

function EvaluateModal({ show, setShow }) {
	const FIFTY = 50;
	const [feedback, setFeedback] = useState('');
	const [checkbox, setCheckbox] = useState('');
	const { UpdateOrganizationServiceExpertiseFeedback } = useUpdateOrganizationServiceExpertiseFeedback({
		feedback,
		service_requirement: checkbox,
		show,
		setShow,
	});

	const { data, loading } = useGetOrganizationServiceExpertises({ show });
	const columns = [
		{
			Header   : 'Name of Current Supplier',
			accessor : (row) => row?.organization?.business_name,
		},
		{ Header: 'Volume Served', accessor: 'total_teus' },
	];

	const handleSubmit = () => {
		UpdateOrganizationServiceExpertiseFeedback();
	};

	return (
		<div>
			<Modal
				size="xl"
				show={show}
				placement="centre"
				onClose={() => setShow(null)}
				maxHeight={100}
				scroll={false}
			>
				<Modal.Header title="Evaluating India to West Coast" />
				<Modal.Body>
					<div className={styles.parent}>
						<div className={styles.left}>
							{
								data && <Table columns={columns} data={data} loading={loading} />
							}
						</div>
						<div className={styles.right}>
							<div className={styles.right_upper}>
								<Radio
									name="a1"
									label="Needed"
									value="yes"
									style={{ marginRight: '30px' }}
									onChange={(e) => setCheckbox(e.target.value)}
								/>
								<Radio
									name="a1"
									value="no"
									label="Not Needed"
									onChange={(e) => setCheckbox(e.target.value)}
								/>
							</div>
							<h4>Feedback</h4>
							<Textarea
								className={styles.feedback_box}
								size="md"
								defaultValue=""
								placeholder="Minimum 50 characters"
								value={feedback}
								onChange={(val) => setFeedback(val)}
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={handleSubmit}
						disabled={
						feedback?.length < FIFTY
						|| checkbox === ''
					}
					>
						Submit

					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default EvaluateModal;
