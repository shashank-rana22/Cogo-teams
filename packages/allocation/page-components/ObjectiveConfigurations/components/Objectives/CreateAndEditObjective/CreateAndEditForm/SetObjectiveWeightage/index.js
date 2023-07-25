import { Button } from '@cogoport/components';

import CREATE_FORM_STEPPER_KEYS_MAPPING from '../../../../../constants/create-form-stepper-keys-mapping';

import ListObjectiveUserMappings from './ListObjectiveUserMappings';
import styles from './styles.module.css';
import useCreateObjective from './useCreateObjective';
import useGetObjectiveUserMappings from './useGetObjectiveUserMappings';

const { REVIEW_OBJECTIVE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

function SetObjectiveWeightage(props) {
	const { activeTabDetails, setActiveStep, formValues } = props;

	const { list, getNextPage, paginationData } = useGetObjectiveUserMappings({ formValues });

	const { control, createLoading, onCreate } = useCreateObjective({ formValues });

	const MODE_BASIS_BUTTON_MAPPING = {
		create: (
			<>
				<Button
					size="lg"
					type="button"
					themeType="secondary"
					style={{ marginRight: '12px' }}
					onClick={() => onCreate({ distribute_equally: true })}
					loading={createLoading}
				>
					Equally Distribute & Send For Verification
				</Button>

				<Button
					size="lg"
					type="button"
					themeType="primary"
					onClick={() => onCreate({ distribute_equally: false })}
					loading={createLoading}
				>
					Create Objective & Send For Verification
				</Button>
			</>
		),
		edit: (
			<>
				<Button
					size="lg"
					type="button"
					themeType="tertiary"
					style={{ marginRight: '12px' }}
				>
					Equally Distribute
				</Button>

				<Button
					size="lg"
					type="button"
					themeType="secondary"
					style={{ marginRight: '12px' }}
				>
					Replace & Send For Verification
				</Button>

				<Button
					size="lg"
					type="button"
					themeType="primary"
				>
					Duplicate & Send For Verification
				</Button>
			</>
		),
	};

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
					{MODE_BASIS_BUTTON_MAPPING[activeTabDetails.mode]}
				</div>
			</div>
		</div>
	);
}

export default SetObjectiveWeightage;
