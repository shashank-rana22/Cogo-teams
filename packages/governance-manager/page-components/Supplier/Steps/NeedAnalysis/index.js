import { Button, Placeholder, Table } from '@cogoport/components';
import { useState } from 'react';

import useGetOrganizationServiceSuppliers from '../../../hooks/useListOrganizationExpertiseSuppliers';
import useUpdateOrganizationService from '../../../hooks/useUpdateOrganizationService';

import EvaluateModal from './EvaluateModal';
import styles from './styles.module.css';
import { columns } from './utils/need-analysis-utils';

function NeedAnalysis({ organization_id, service, getOrganizationService, service_type }) {
	const {
		data: serviceExpertiseData,
		loading:loadingSE,
	} = useGetOrganizationServiceSuppliers(
		{
			organization_id,
			service_type: service,
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
