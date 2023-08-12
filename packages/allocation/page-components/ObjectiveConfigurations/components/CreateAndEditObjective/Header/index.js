import { Button } from '@cogoport/components';

import ACTIVE_MODE_KEYS_MAPPING from '../../../constants/active-mode-keys-mapping';

import styles from './styles.module.css';

const { LIST, CREATE, EDIT } = ACTIVE_MODE_KEYS_MAPPING;

const HEADING_MAPPING = {
	[CREATE]: {
		heading    : 'New Objective Configuration',
		// eslint-disable-next-line max-len
		subheading : 'Here, you can create Company and Team Objectives for Lead Scoring. Leads that meet the criteria of a specific objective can be assigned separate Lead Scoring.After creating an Objective, it will be sent for verification and can be activated once verified.',
	},
	[EDIT]: {
		heading    : 'Edit Objective Configuration',
		// eslint-disable-next-line max-len
		subheading : 'You can edit the previously set Objective from here. You can edit and replace the same objective or choose to edit and create a duplicate of the previous objective.',
	},
};

function Header(props) {
	const { activeMode, setActiveMode, flushRefCallback } = props;

	const { heading, subheading } = HEADING_MAPPING[activeMode];

	return (
		<section className={styles.container}>
			<div className={styles.heading_container}>
				<h3>{heading}</h3>
				<p>{subheading}</p>
			</div>

			<Button
				type="button"
				themeType="primary"
				onClick={() => {
					setActiveMode(LIST);
					flushRefCallback();
				}}
			>
				Existing Objectives
			</Button>
		</section>
	);
}

export default Header;
