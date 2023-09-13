import { Button, Pagination, Placeholder, Table } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import useUpdateOrganizationService from '../../hooks/useUpdateOrganizationService';

import EvaluateModal from './EvaluateModal';
import useGetOrganizationServiceSuppliers from './hooks/useListOrganizationExpertiseSuppliers';
import styles from './styles.module.css';
import { columns } from './utils/need-analysis-utils';

function NeedAnalysis({ t, organization_id, service, getOrganizationService, service_type, id }) {
	const ONE = GLOBAL_CONSTANTS.one;
	const [currentPage, setCurrentPage] = useState(ONE);

	const {
		data: serviceExpertiseData,
		loading:loadingSE,
		totalCount,
		isProceedable,
		getOrganizationExpertiseSuppliers,
	} = useGetOrganizationServiceSuppliers(
		{
			organization_id,
			service_type : service,
			page         : currentPage,
			service_id   : id,
		},
	);

	const { updateOrganizationService } = useUpdateOrganizationService({
		organization_id,
		approval_stage: 'market_feedback',
		service,
		getOrganizationService,
	});

	const [show, setShow] = useState(null);
	return (
		<>
			{
				loadingSE && <Placeholder width="100%" height="500px" />
			}
			{
				!loadingSE && serviceExpertiseData
				&& (
					<Table
						columns={columns({ t, setShow, service_type })}
						data={serviceExpertiseData}
						className={styles.table}
					/>
				)
			}
			<div className={styles.pagination}>
				<Pagination
					className={styles.pagination}
					type="number"
					currentPage={currentPage}
					totalItems={totalCount || ONE}
					pageSize={10}
					onPageChange={setCurrentPage}
				/>
			</div>

			<div className={styles.submit_btn}>
				<Button onClick={() => updateOrganizationService()} disabled={!isProceedable}>
					{t('supplier_page_need_analysis_table_submit_and_next')}
				</Button>
			</div>
			{
				show && (
					<EvaluateModal
						t={t}
						show={show}
						setShow={setShow}
						getOrganizationExpertiseSuppliers={getOrganizationExpertiseSuppliers}
					/>
				)

			}
		</>
	);
}
export default NeedAnalysis;
