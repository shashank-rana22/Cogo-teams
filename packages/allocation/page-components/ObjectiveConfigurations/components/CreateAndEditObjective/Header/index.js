import { Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import ACTIVE_MODE_KEYS_MAPPING from '../../../constants/active-mode-keys-mapping';

import styles from './styles.module.css';

const { LIST, CREATE, EDIT } = ACTIVE_MODE_KEYS_MAPPING;

const getHeadingMapping = ({ t = () => {} }) => ({
	[CREATE]: {
		heading    : t('allocation:create_heading'),
		subheading : t('allocation:create_subheading_phrase'),
	},
	[EDIT]: {
		heading    : t('allocation:edit_heading'),
		subheading : t('allocation:edit_subheading_phrase'),
	},
});

function Header(props) {
	const { t } = useTranslation(['allocation']);

	const { activeMode, setActiveMode, flushRefCallback } = props;

	const headingMapping = getHeadingMapping({ t });

	const { heading, subheading } = headingMapping[activeMode];

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
				{t('allocation:existing_objectives')}
			</Button>
		</section>
	);
}

export default Header;
