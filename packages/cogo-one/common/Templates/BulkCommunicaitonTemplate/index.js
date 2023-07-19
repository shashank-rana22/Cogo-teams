import { Tooltip } from '@cogoport/components';
import { IcCSendWhatsapp } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import BulkSendTooltipContent from './BulkSendTooltipContent';
import styles from './styles.module.css';

const ZERO_COUNT = 0;
const MAX_SHOW_LENGTH = 1;

function BulkCommunicationTemplate({ selectedAutoAssign = {} }) {
	const allUserNames = Object.keys(selectedAutoAssign || {}).map((key) => selectedAutoAssign[key].user_name);

	const firstUserNames = allUserNames.slice(ZERO_COUNT, MAX_SHOW_LENGTH);
	const othersUserName = allUserNames.slice(MAX_SHOW_LENGTH);

	return (
		<div className={styles.template_heading}>
			To:
			<IcCSendWhatsapp className={styles.icon_whatsapp} />

			{((firstUserNames || []).map((name) => (
				<div className={styles.user_names} key={name}>
					{`${startCase(name.toLowerCase())}`}
				</div>

			)))}

			{!isEmpty(othersUserName) && (
				<Tooltip
					content={(
						<BulkSendTooltipContent
							othersUserName={othersUserName}
						/>
					)}
					theme="light"
					placement="right"
					interactive
				>
					<div className={styles.more_names}>
						+
						{othersUserName?.length}
					</div>
				</Tooltip>
			)}
		</div>
	);
}
export default BulkCommunicationTemplate;
