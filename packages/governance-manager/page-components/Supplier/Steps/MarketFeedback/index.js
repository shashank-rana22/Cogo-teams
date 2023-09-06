/* eslint-disable no-magic-numbers */
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useEffect } from 'react';

import useUpdateOrganizationService from '../../hooks/useUpdateOrganizationService';

import useCreateOrganizationMarketFeedback from './hooks/useCreateOrganizationMarketFeedback';
import useListOrganizationMarketFeedbacks from './hooks/useListOrganizationMarketFeedbacks';
import Layout from './Layout';
import styles from './styles.module.css';
import { controls, defaultValues } from './utils/email-from-controls';

function MarketFeedback({
	t, organization_id,
	service,
	getOrganizationService,
	id:service_id,
}) {
	const { updateOrganizationService } = useUpdateOrganizationService({
		organization_id,
		approval_stage: 'organization_evaluation',
		service,
		getOrganizationService,
	});

	const { createMarketFeedbackActive, createMarketFeedbackDraft } = useCreateOrganizationMarketFeedback({
		updateOrganizationService,
		service_id,
		service_type: service,
		organization_id,
	});

	const { data } = useListOrganizationMarketFeedbacks({
		service_id,
		organization_id,
		organization_service_id: service_id,
	});

	const {
		control,
		handleSubmit,
		setValue,
		formState:{ errors = {} },
	} = useForm({
		defaultValues,
	});

	useEffect(() => {
		if (data && data.length >= GLOBAL_CONSTANTS.one) {
			setValue('emails', data?.map((item) => ({
				user_role  : item?.user_role,
				user_name  : item?.user_name,
				user_email : item?.user_email,
			})));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(data)]);

	return (
		<div className={styles.parent}>

			<Layout control={control} controls={controls({ t })} errors={errors} />

			<div className={styles.flex_right}>
				<Button
					themeType="secondary"
					onClick={handleSubmit(createMarketFeedbackDraft)}
				>
					{t('supplier_page_market_feedback_save_and_do_it_later')}
				</Button>

				<Button onClick={handleSubmit(createMarketFeedbackActive)}>
					{t('supplier_page_market_feedback_save_and_next')}
				</Button>
			</div>
		</div>
	);
}
export default MarketFeedback;
