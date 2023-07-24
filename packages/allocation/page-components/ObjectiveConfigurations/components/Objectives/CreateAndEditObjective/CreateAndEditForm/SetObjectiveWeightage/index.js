import { Button } from '@cogoport/components';

import styles from './styles.module.css';

const MODE_BASIS_BUTTON_MAPPING = {
	create: (
		<>
			<Button
				size="lg"
				type="button"
				themeType="secondary"
				style={{ marginRight: '12px' }}
			>
				Equally Distribute & Send For Verification
			</Button>

			<Button
				size="lg"
				type="button"
				themeType="primary"
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

function SetObjectiveWeightage(props) {
	const { activeTabDetails } = props;

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

				<Button
					type="button"
					themeType="secondary"
				>
					Group Users by Objective
				</Button>
			</div>

			<div className={styles.footer}>
				<Button
					size="lg"
					type="button"
					themeType="link"
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
