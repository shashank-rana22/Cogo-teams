import { Button } from '@cogoport/components';

import CREATE_FORM_STEPPER_KEYS_MAPPING from '../../../../constants/create-form-stepper-keys-mapping';

import getModeWiseButtons from './get-mode-wise-buttons';
import ListObjectiveUserMappings from './ListObjectiveUserMappings';
import styles from './styles.module.css';
import useCreateObjective from './useCreateObjective';
import useGetObjectiveUserMappings from './useGetObjectiveUserMappings';

const { REVIEW_OBJECTIVE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

function SetObjectiveWeightage(props) {
	const { activeMode, setActiveMode, setActiveStep, formValues, flushRefCallback } = props;

	const { list, listLoading, getNextPage, paginationData } = useGetObjectiveUserMappings({ formValues });

	const {
		control,
		setValue,
		createLoading,
		onCreate,
	} = useCreateObjective({ formValues, setActiveMode, flushRefCallback });

	const { page, total } = paginationData || {};

	const createDisabled = page !== total;

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<div className={styles.heading_container}>
					<h3>Set Objective Weightage</h3>

					<p className={styles.subheading}>
						You may Custom Set Weightage of Each Objective per User here. If nothing is set,
						system will auto assign equal weightage for all Objectives.
						The sum of weightage per User must total to 100.
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
					Back
				</Button>

				<div className={styles.button_container}>
					{getModeWiseButtons({ activeMode, onCreate, createLoading, createDisabled })}
				</div>
			</div>
		</div>
	);
}

export default SetObjectiveWeightage;