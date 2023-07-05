import { Table, Toggle, Textarea, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import ScoreModal from './ScoreModal/index.js';
import styles from './styles.module.css';

function SupplierEvaluation() {
	const [show, setShow] = useState(false);
	const columns = [
		{
			id       : 'parameters',
			Header   : () => (<div className={styles.th}>Parameters</div>),
			accessor : (row) => (<div className={styles.td}>{row.parameters}</div>),
		},
		{
			id       : 'total_score',
			Header   : () => (<div className={styles.th}>Total Score</div>),
			accessor : (row) => (<div className={styles.td}>{row.total_score}</div>),
		},
		{
			id       : 'score_received',
			Header   : () => (<div className={styles.th}>Score Received</div>),
			accessor : (row) => (
				<div className={styles.td}>
					{
                        row?.score_received === 0
                        	? (
	<Button themeType="accent" size="sm" onClick={() => { setShow(true); }}>
		Score
	</Button>

                        	)
                        	: row?.score_received
                    }
				</div>
			),
		},
	];
	const data = [
		{
			parameters     : 'Payment Terms',
			total_score    : 20,
			score_received : 20,
		},
		{
			parameters     : 'Market Feedback',
			total_score    : 20,
			score_received : 0,
		},
		{
			parameters     : 'Strength with SL/Principals',
			total_score    : '20',
			score_received : 20,
		},
		{
			parameters     : 'Willingness to adopt a platform',
			total_score    : '20',
			score_received : 20,
		},
	];
	return (
		<>
			<div className={styles.parent}>
				<div className={styles.left}>

					<div className={styles.upper_left}>Supplier Evaluation</div>
					<div className={styles.middle_left}>
						<Table columns={columns} data={data} />
					</div>
					<div className={styles.lower_left}>
						<div className={styles.lower_left_data}>
							Will They provide BL delivery via Courier or Runner ?
							<Toggle name="a2" size="md" disabled={false} />
						</div>
						<div className={styles.lower_left_data}>
							Agress to Act Basic Consignee MBL with Us?
							<Toggle name="a2" size="md" disabled={false} />
						</div>

					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.upper_right}>
						Evaluation Criteria
						<IcMInfo width={18} height={18} style={{ marginLeft: '8px' }} />
					</div>
					<div>
						<Textarea
							className={styles.middle_right}
							name="a4"
							size="lg"
							defaultValue="Rishi"
							placeholder="A4"
						/>
					</div>
					<div className={styles.lower_right}>
						Feedback
						<Textarea
							className={styles.lower_right_feedback}
							name="a4"
							size="lg"
							defaultValue="Rishi"
							placeholder="A4"
						/>
					</div>
				</div>
				{show && <ScoreModal show={show} setShow={setShow} />}
			</div>
			<div className={styles.flex_right}>
				<Button themeType="secondary">Save & Do it Later</Button>
				<Button>Submit & Next</Button>
			</div>
		</>
	);
}
export default SupplierEvaluation;
