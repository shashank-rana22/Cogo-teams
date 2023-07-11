import { IcMCross, IcMEdit, IcMTick } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ActionContent({
	onClickCta = () => {},
}) {
	return (
		<div className={styles.action_container}>

			<div
				className={styles.workflow_cta}
				role="presentation"
				onClick={() => onClickCta('view')}
			>
				<div className={styles.cta_text}>
					<IcMEdit width={16} height={16} style={{ marginRight: '10px' }} />
					Edit
				</div>
			</div>

			<div
				className={styles.workflow_cta}
				role="presentation"
				onClick={() => onClickCta('success')}
			>
				<div className={styles.cta_text}>
					<IcMTick width={16} height={16} style={{ marginRight: '10px' }} />
					Mark as Completed
				</div>
			</div>

			<div
				className={styles.workflow_cta_last}
				role="presentation"
				onClick={() => onClickCta('failed')}
			>
				<div className={styles.cta_text}>
					<IcMCross width={16} height={16} style={{ marginRight: '10px' }} />
					Mark as Failed
				</div>
			</div>

		</div>
	);
}

export default ActionContent;
