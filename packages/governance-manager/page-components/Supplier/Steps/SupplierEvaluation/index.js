/* eslint-disable no-magic-numbers */
import { Table, Textarea, Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useUpdateOrganizationService from '../../hooks/useUpdateOrganizationService';

import useCreateOrganizationEvaluation from './hooks/useCreateOrganizationEvaluation';
import useGetOrganizationEvaluationDetails from './hooks/useGetOrganizationEvaluationDetails';
import ScoreModal from './ScoreModal';
import styles from './styles.module.css';
import { evaluationCriteriaDetails } from './utils/evaluation-criteria-details';
import { columns, filterData } from './utils/supplier-evaluation-utils';

function SupplierEvaluation({ t, organization_id, id, setStatus, getOrganizationService, service }) {
	const [show, setShow] = useState('');
	const [feedback, setFeedback] = useState('');

	const { push } = useRouter();

	const {
		data: organizationEvaluationDetails,
		getOrganizationEvaluationDetails,
	} = useGetOrganizationEvaluationDetails({ organization_id, id, setStatus, getOrganizationService });

	const { updateOrganizationService } = useUpdateOrganizationService({
		organization_id, approval_stage: 'organization_approval', service, getOrganizationService,
	});

	const {
		createOrganizationEvaluation,
	} = useCreateOrganizationEvaluation({
		organization_id,
		id,
		feedback,
		updateOrganizationService,
	});

	return (
		<>
			<div className={styles.parent}>
				<div className={styles.left}>
					<div className={styles.upper_left}>{t('supplier_page_supplier_evaluation_table_heading')}</div>
					<div className={styles.middle_left}>
						{organizationEvaluationDetails
						&& <Table columns={columns({ t, setShow })} data={filterData(organizationEvaluationDetails)} />}
					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.upper_right}>
						{t('supplier_page_supplier_evaluation_table_basic_evaluation_criteria')}
						<IcMInfo width={18} height={18} style={{ marginLeft: '8px' }} />
					</div>
					<div>
						<table className={styles.ec_table}>
							{
								evaluationCriteriaDetails({ t, service })?.map((item) => (
									<tr className={styles.ec_tr} key={item}>
										<td className={styles.ec_td}>{item?.range}</td>
										<td className={styles.ec_td}>{item?.text}</td>
									</tr>
								))
							}
						</table>
					</div>
					<div className={styles.lower_right}>
						{t('supplier_page_supplier_evaluation_table_basic_evaluation_feedback')}
						<Textarea
							className={styles.lower_right_feedback}
							name="a4"
							size="lg"
							defaultValue=""
							placeholder={t('supplier_page_supplier_evaluation_table_basic_enter_feedback')}
							onChange={setFeedback}
						/>
					</div>
				</div>
				{
					show
					&& (
						<ScoreModal
							t={t}
							show={show}
							setShow={setShow}
							getOrganizationEvaluationDetails={getOrganizationEvaluationDetails}
						/>
					)

				}
			</div>
			<div className={styles.flex_right}>
				<Button
					themeType="secondary"
					onClick={() => {
						createOrganizationEvaluation('draft');
						push(
							'/governance-manager/',
							'/governance-manager/',
						);
					}}
				>
					{t('supplier_page_supplier_evaluation_table_basic_save_and_do_it_later')}

				</Button>

				<Button onClick={() => {
					createOrganizationEvaluation('active');
				}}
				>
					{t('supplier_page_supplier_evaluation_table_basic_submit_and_next')}
				</Button>

			</div>
		</>
	);
}
export default SupplierEvaluation;
