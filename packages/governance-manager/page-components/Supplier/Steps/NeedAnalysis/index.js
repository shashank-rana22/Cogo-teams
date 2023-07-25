import { Button, Pagination, Placeholder, Table } from '@cogoport/components';
import { useState } from 'react';

import useUpdateOrganizationService from '../../hooks/useUpdateOrganizationService';

import EvaluateModal from './EvaluateModal';
import useGetOrganizationServiceSuppliers from './hooks/useListOrganizationExpertiseSuppliers';
import styles from './styles.module.css';
import { columns } from './utils/need-analysis-utils';

function NeedAnalysis({ organization_id, service, getOrganizationService, service_type }) {
	const ONE = 1;
	const [currentPage, setCurrentPage] = useState(ONE);

	const {
		data: serviceExpertiseData,
		loading:loadingSE,
		totalCount,
	} = useGetOrganizationServiceSuppliers(
		{
			organization_id,
			service_type : service,
			page         : currentPage,
		},
	);

	const { UpdateOrganizationService } = useUpdateOrganizationService({
		organization_id,
		stage_of_approval: 'market_feedback',
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
						columns={columns({ setShow, service_type })}
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
				<Button onClick={() => UpdateOrganizationService()}>
					Submit & Next
				</Button>
			</div>
			{
				show && <EvaluateModal show={show} setShow={setShow} />

			}
		</>
	);
}
export default NeedAnalysis;
