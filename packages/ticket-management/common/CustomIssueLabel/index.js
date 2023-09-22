import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CustomIssueLabel({ optionsLabel = {} }) {
	return (
		<div>
			<div>{optionsLabel?.TicketType}</div>
			<div className={styles.container}>
				<div className={styles.service}>
					{startCase(optionsLabel?.Service)}
				</div>
				<div className={styles.trade}>
					{startCase(optionsLabel?.TradeType)}
				</div>
			</div>
		</div>
	);
}

export default CustomIssueLabel;
