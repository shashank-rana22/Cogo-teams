import { Button, Pagination, Placeholder, Table } from '@cogoport/components';
import { useState } from 'react';

import useUpdateOrganizationService from '../../hooks/useUpdateOrganizationService';

import EvaluateModal from './EvaluateModal';
import useGetOrganizationServiceSuppliers from './hooks/useListOrganizationExpertiseSuppliers';
import styles from './styles.module.css';
import { columns } from './utils/need-analysis-utils';

function NeedAnalysis({ organization_id, service, getOrganizationService, service_type, id, setStatus }) {
	const ONE = 1;
	const [currentPage, setCurrentPage] = useState(ONE);

	const {
		data: serviceExpertiseData,
		loading:loadingSE,
		totalCount,
		isProceedable,
	} = useGetOrganizationServiceSuppliers(
		{
			organization_id,
			service_type : service,
			page         : currentPage,
			service_id   : id,
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
				{
					false && 				(
						<Button onClick={() => UpdateOrganizationService()} disabled={!isProceedable}>
							Submit & Next
						</Button>
					)

				}
				<Button onClick={() => setStatus('market_feedback')}>
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
