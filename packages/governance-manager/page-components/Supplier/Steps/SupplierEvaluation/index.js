/* eslint-disable no-magic-numbers */
import { Table, Toggle, Textarea, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState } from 'react';

import useUpdateOrganizationService from '../../hooks/useUpdateOrganizationService';

import useCreateOrganizationEvaluation from './hooks/useCreateOrganizationEvaluation';
import useGetOrganizationEvaluationDetails from './hooks/useGetOrganizationEvaluationDetails';
import ScoreModal from './ScoreModal';
import styles from './styles.module.css';
import { evaluationCriteriaDetails } from './utils/evaluation-criteria-details';
import { columns, filterData } from './utils/supplier-evaluation-utils';

function SupplierEvaluation({ organization_id, id, setStatus, getOrganizationService, service }) {
	const [show, setShow] = useState('');
	const [feedback, setFeedback] = useState('');
	const [provideBl, setProvideBl] = useState(false);
	const [basisConsignee, setBasisConsignee] = useState(false);

	const {
		data: organizationEvaluationDetails,
		getOrganizationEvaluationDetails,
	} = useGetOrganizationEvaluationDetails({ organization_id, id, setStatus, getOrganizationService });

	const { updateOrganizationService } = useUpdateOrganizationService({
		organization_id, stage_of_approval: 'organization_approval', service, getOrganizationService,
	});

	const {
		createOrganizationEvaluation,
	} = useCreateOrganizationEvaluation({
		organization_id,
		id,
		feedback,
		provideBl,
		basisConsignee,
		updateOrganizationService,
	});

	const handleSubmit = () => {
		createOrganizationEvaluation();
	};

	return (
		<>
			<div className={styles.parent}>
				<div className={styles.left}>
					<div className={styles.upper_left}>Supplier Evaluation</div>
					<div className={styles.middle_left}>
						{organizationEvaluationDetails
						&& <Table columns={columns({ setShow })} data={filterData(organizationEvaluationDetails)} />}
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
						<table className={styles.ec_table}>
							{
								evaluationCriteriaDetails[service].map((item) => (
									<tr className={styles.ec_tr} key={item}>
										<td className={styles.ec_td}>{item?.range}</td>
										<td className={styles.ec_td}>{item?.text}</td>
									</tr>
								))
							}
						</table>
					</div>
					<div className={styles.lower_right}>
						Feedback
						<Textarea
							className={styles.lower_right_feedback}
							name="a4"
							size="lg"
							defaultValue=""
							placeholder="Enter your Feedback...."
							onChange={setFeedback}
						/>
					</div>
				</div>
				<ScoreModal
					show={show}
					setShow={setShow}
					getOrganizationEvaluationDetails={getOrganizationEvaluationDetails}
				/>
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
