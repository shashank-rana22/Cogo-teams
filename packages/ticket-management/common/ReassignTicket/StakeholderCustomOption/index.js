import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function StakeholderCustomOption({ optionsLabel = {} }) {
	const { stakeholder_type = '', user = {} } = optionsLabel || {};
	const { name = '' } = user || {};

	return (
		<div>
			<div>{startCase(name)}</div>
			<div className={styles.container}>
				<div className={styles.service}>
					{startCase(stakeholder_type)}
				</div>
			</div>
		</div>
	);
}

export default StakeholderCustomOption;
