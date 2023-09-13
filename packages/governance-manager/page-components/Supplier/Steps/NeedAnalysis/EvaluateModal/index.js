import { Button, Modal, Table, Radio, Textarea } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import useGetOrganizationServiceExpertises from '../hooks/useGetOrganizationServiceExpertises';
import useUpdateOrganizationServiceExpertiseFeedback from '../hooks/useUpdateOrganizationServiceExpertiseFeedback';

import styles from './styles.module.css';

function EvaluateModal({ t, show, setShow, getOrganizationExpertiseSuppliers }) {
	const FIFTY = GLOBAL_CONSTANTS.fifty;
	const [feedback, setFeedback] = useState('');
	const [checkbox, setCheckbox] = useState('');
	const { updateOrganizationServiceExpertiseFeedback } = useUpdateOrganizationServiceExpertiseFeedback({
		feedback,
		service_requirement: checkbox,
		show,
		setShow,
		getOrganizationExpertiseSuppliers,
	});

	const { data, loading } = useGetOrganizationServiceExpertises({ show });
	const columns = [
		{
			Header   : t('supplier_page_need_analysis_table__evaluate_modal'),
			accessor : (row) => row?.organization?.business_name,
		},
		{ Header: t('supplier_page_need_analysis_table_volume_served'), accessor: 'total_teus' },
	];

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
				<Modal.Header title="Evaluating Modal" />
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
									label={t('supplier_page_need_analysis_table_needed')}
									value="yes"
									style={{ marginRight: '30px' }}
									onChange={(e) => setCheckbox(e.target.value)}
								/>
								<Radio
									name="a1"
									value="no"
									label={t('supplier_page_need_analysis_table_not_needed')}
									onChange={(e) => setCheckbox(e.target.value)}
								/>
							</div>
							<h4>{t('supplier_page_need_analysis_table_feedback')}</h4>
							<Textarea
								className={styles.feedback_box}
								size="md"
								defaultValue=""
								placeholder={t('supplier_page_need_analysis_table_character_count')}
								value={feedback}
								onChange={(val) => setFeedback(val)}
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() => updateOrganizationServiceExpertiseFeedback()}
						disabled={
						feedback?.length < FIFTY
						|| checkbox === ''
					}
					>
						{t('supplier_page_need_analysis_table_submit')}

					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default EvaluateModal;
