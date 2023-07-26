import { Button } from '@cogoport/components';

import CREATE_FORM_STEPPER_KEYS_MAPPING from '../../../../../constants/create-form-stepper-keys-mapping';

import ListObjectiveUserMappings from './ListObjectiveUserMappings';
import ModeWiseButtons from './ModeWiseButton';
import styles from './styles.module.css';
import useCreateObjective from './useCreateObjective';
import useGetObjectiveUserMappings from './useGetObjectiveUserMappings';

const { REVIEW_OBJECTIVE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

function SetObjectiveWeightage(props) {
	const { activeTabDetails, setActiveTabDetails, setActiveStep, formValues } = props;

	const { list, listLoading, getNextPage, paginationData } = useGetObjectiveUserMappings({ formValues });

	const { control, createLoading, onCreate } = useCreateObjective({ formValues, setActiveTabDetails });

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

				{/* <Button
					type="button"
					themeType="secondary"
				>
					Group Users by Objective
				</Button> */}
			</div>

			<ListObjectiveUserMappings
				list={list}
				listLoading={listLoading}
				control={control}
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
					<ModeWiseButtons
						mode={activeTabDetails.mode}
						onCreate={onCreate}
						createLoading={createLoading}
					/>
				</div>
			</div>
		</div>
	);
}

export default SetObjectiveWeightage;
