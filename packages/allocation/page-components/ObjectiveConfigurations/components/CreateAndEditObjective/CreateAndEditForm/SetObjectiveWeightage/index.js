import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import CREATE_FORM_STEPPER_KEYS_MAPPING from '../../../../constants/create-form-stepper-keys-mapping';

import getModeWiseButtons from './get-mode-wise-buttons';
import ListObjectiveUserMappings from './ListObjectiveUserMappings';
import styles from './styles.module.css';
import useCreateObjective from './useCreateObjective';
import useGetObjectiveUserMappings from './useGetObjectiveUserMappings';

const { REVIEW_OBJECTIVE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

function SetObjectiveWeightage(props) {
	const { t } = useTranslation(['allocation']);

	const { activeMode, setActiveMode, setActiveStep, formValues, flushRefCallback } = props;

	const { list, listLoading, getNextPage, paginationData } = useGetObjectiveUserMappings({ formValues });

	const {
		control,
		setValue,
		createLoading,
		onCreate,
	} = useCreateObjective({ formValues, setActiveMode, flushRefCallback, t });

	const { page, total } = paginationData || {};

	const createDisabled = page !== total;

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.heading_container}>
					<h3>{t('allocation:set_objective_weightage')}</h3>

					<p className={styles.subheading}>
						{t('allocation:set_objective_weightage_phrase')}
					</p>
				</div>
			</div>

			<ListObjectiveUserMappings
				list={list}
				listLoading={listLoading}
				control={control}
				setValue={setValue}
				formValues={formValues}
				getNextPage={getNextPage}
				paginationData={paginationData}
			/>

			<div className={styles.footer}>
				<Button
					size="lg"
					type="button"
					themeType="link"
					onClick={() => setActiveStep(REVIEW_OBJECTIVE)}
				>
					{t('allocation:back_button')}
				</Button>

				<div className={styles.button_container}>
					{getModeWiseButtons({ activeMode, onCreate, createLoading, createDisabled, t })}
				</div>
			</div>
		</div>
	);
}

export default SetObjectiveWeightage;
