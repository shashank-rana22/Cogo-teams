import { Button, Modal, Table, Radio, Textarea } from '@cogoport/components';
import { useState } from 'react';

import useUpdateOrganizationServiceExpertiseFeedback from
	'../../../../hooks/useUpdateOrganizationServiceExpertiseFeedback';

import styles from './styles.module.css';

function EvaluateModal({ show, setShow }) {
	const [feedback, setFeedback] = useState('');
	const [checkbox, setCheckbox] = useState('');
	const { UpdateOrganizationServiceExpertiseFeedback } = useUpdateOrganizationServiceExpertiseFeedback({
		feedback,
		service_requirement : checkbox,
		id                  : show,
		setShow,
	});
	const columns = [
		{ Header: 'Name of Current Supplier', accessor: 'current_supplier' },
		{ Header: 'Volume Served', accessor: 'volume_served' },
	];
	const data = [
		{
			firstName : 'tanner',
			lastName  : 'linsley',

		},
		{
			firstName : 'tandy',
			lastName  : 'miller',
		},
		{
			firstName : 'joe',
			lastName  : 'dirte',

		},
	];
	const handleSubmit = () => {
		UpdateOrganizationServiceExpertiseFeedback();
	};

	return (
		<div>
			<Modal
				size="xl"
				show={show?.length > 0}
				placement="centre"
				onClose={() => setShow('')}
				maxHeight={100}
				scroll={false}
			>
				<Modal.Header title="Evaluating India to West Coast" />
				<Modal.Body>
					<div className={styles.parent}>
						<div className={styles.left}>
							<Table columns={columns} data={data} />
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
								defaultValue="Rishi"
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
						feedback?.length < 50
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
