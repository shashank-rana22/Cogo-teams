import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function StakeholderCustomOption({ optionsLabel = {} }) {
	const { data = {} } = optionsLabel || {};
	const { stakeholder_type = '', user = {} } = data || {};
	const { name = '' } = user || {};

	return (
		<div>
			<div>{startCase(name)}</div>
			<div className={styles.container}>
				{startCase(stakeholder_type)}
			</div>
		</div>
	);
}

export default StakeholderCustomOption;
