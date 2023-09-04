import { Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import getUserNameFromEmail from '../../../helpers/getUserNameFromEmail';

import styles from './styles.module.css';

const ARRAY_ELEMENT_STEP = 1;

function ReceipientComp({ mailsData = [], label = '' }) {
	if (isEmpty(mailsData)) {
		return null;
	}

	return (
		<div className={styles.receipients}>
			<div className={styles.label}>
				{label}
				:
			</div>

			{(mailsData || [])?.map(
				(eachEmail, index) => {
					const { userName: senderName } = getUserNameFromEmail({ query: eachEmail });

					return (
						<Tooltip
							placement="bottom"
							key={eachEmail}
							content={eachEmail}
							interactive
						>
							<div className={styles.each_receipient}>
								{senderName}
								{index !== mailsData.length - ARRAY_ELEMENT_STEP ? ', ' : ''}
							</div>
						</Tooltip>
					);
				},
			)}
		</div>
	);
}

export default ReceipientComp;
