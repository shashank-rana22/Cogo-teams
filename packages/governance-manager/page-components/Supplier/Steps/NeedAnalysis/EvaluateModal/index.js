import { Button, Modal, Table, Radio, Textarea } from '@cogoport/components';

import styles from './styles.module.css';

function EvaluateModal({ show, setShow }) {
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
	return (
		<div>
			<Modal
				size="xl"
				show={show}
				placement="centre"
				onClose={() => setShow(false)}
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
								<Radio name="a1" label="Needed" disabled={false} style={{ marginRight: '30px' }} />
								<Radio name="a1" label="Not Needed" disabled={false} />
							</div>
							<h4>Feedback</h4>
							<Textarea
								className={styles.feedback_box}
								name="a4"
								size="md"
								defaultValue="Rishi"
								placeholder="A4"
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button>Submit</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default EvaluateModal;
