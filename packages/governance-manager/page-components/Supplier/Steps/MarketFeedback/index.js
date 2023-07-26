/* eslint-disable no-magic-numbers */
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import useUpdateOrganizationService from '../../hooks/useUpdateOrganizationService';

import useCreateOrganizationMarketFeedback from './hooks/useCreateOrganizationMarketFeedback';
import Layout from './Layout';
import styles from './styles.module.css';
import { controls, defaultValues } from './utils/email-from-controls';

function MarketFeedback({ organization_id, service, getOrganizationService, id:service_id, setStatus }) {
	const { UpdateOrganizationService } = useUpdateOrganizationService({
		organization_id,
		stage_of_approval: 'organization_evaluation',
		service,
		getOrganizationService,
	});

	const { createMarketFeedback } = useCreateOrganizationMarketFeedback({
		UpdateOrganizationService,
		service_id,
		service_type: service,
		organization_id,
	});

	const {
		control,
		handleSubmit,
		formState:{ errors = {} },
	} = useForm({ defaultValues });

	return (
		<div className={styles.parent}>

			<Layout control={control} controls={controls} errors={errors} />

			<div className={styles.flex_right}>
				<Button
					themeType="secondary"
					onClick={() => UpdateOrganizationService()}
				>
					Save & Do it Later
				</Button>

				{
					false
				&& <Button onClick={handleSubmit(createMarketFeedback)}>Submit & Next</Button>
				}
				<Button onClick={() => setStatus('organization_evaluation')}>
					Submit & Next
				</Button>

			</div>
		</div>
	);
}
export default MarketFeedback;
