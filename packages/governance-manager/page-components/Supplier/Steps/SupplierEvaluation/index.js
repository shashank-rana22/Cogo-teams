/* eslint-disable no-magic-numbers */
import { Table, Toggle, Textarea, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import useCreateOrganizationEvaluation from '../../../hooks/useCreateOrganizationEvaluation';
import useGetOrganizationEvaluationDetails from '../../../hooks/useGetOrganizationEvaluationDetails';
import useUpdateOrganizationService from '../../../hooks/useUpdateOrganizationService';

import ScoreModal from './ScoreModal';
import styles from './styles.module.css';

function SupplierEvaluation({ organization_id, id, setStatus, getOrganizationService, service }) {
	const [show, setShow] = useState('');
	const [feedback, setFeedback] = useState('');
	const [provideBl, setProvideBl] = useState(false);
	const [basisConsignee, setBasisConsignee] = useState(false);

	const {
		data: organizationEvaluationDetails,
	} = useGetOrganizationEvaluationDetails({ organization_id, id, setStatus, getOrganizationService });

	const { UpdateOrganizationService } = useUpdateOrganizationService({
		organization_id, stage_of_approval: 'due_dilligance', service, getOrganizationService,
	});

	const {
		createOrganizationEvaluation,
	} = useCreateOrganizationEvaluation({
		organization_id,
		id,
		feedback,
		provideBl,
		basisConsignee,
		UpdateOrganizationService,
	});

	const handleSubmit = () => {
		createOrganizationEvaluation();
	};

	const columns = [
		{
			id       : 'parameters',
			Header   : () => (<div className={styles.th}>Parameters</div>),
			accessor : (row) => (<div className={styles.td}>{row.label}</div>),
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
                        row?.score_received && row?.task !== 'total_score' ? (
	<Button themeType="accent" size="sm" onClick={() => setShow(row)}>
		Score
	</Button>
                        ) : row?.score_received
                    }
				</div>
			),
		},
	];
	return (
		<>
			<div className={styles.parent}>
				<div className={styles.left}>

					<div className={styles.upper_left}>Supplier Evaluation</div>
					<div className={styles.middle_left}>
						{organizationEvaluationDetails
						&& <Table columns={columns} data={organizationEvaluationDetails} />}
					</div>
					<div className={styles.lower_left}>
						<div className={styles.lower_left_data}>
							Will They provide BL delivery via Courier or Runner ?
							<Toggle
								onChange={() => { setProvideBl(!provideBl); }}
								name="a2"
								size="md"
								disabled={false}
							/>
						</div>
						<div className={styles.lower_left_data}>
							Agress to Act Basic Consignee MBL with Us?
							<Toggle
								onChange={() => { setBasisConsignee(!basisConsignee); }}
								name="a2"
								size="md"
								disabled={false}
							/>
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
							onChange={setFeedback}
						/>
					</div>
				</div>
				<ScoreModal show={show} setShow={setShow} />
			</div>
			<div className={styles.flex_right}>
				<Button
					themeType="secondary"
					onClick={handleSubmit}
				>
					Save & Do it Later

				</Button>
				<Button onClick={handleSubmit}>Submit & Next</Button>
			</div>
		</>
	);
}
export default SupplierEvaluation;
