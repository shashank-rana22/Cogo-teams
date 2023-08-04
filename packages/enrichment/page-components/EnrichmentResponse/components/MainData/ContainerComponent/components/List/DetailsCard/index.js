import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import { getResponseKeysMapping } from '../../../../../../configurations/response-keys-mapping';

import styles from './styles.module.css';
import Value from './Value';

function DetailsCard(props) {
	const {
		activeTab = '',
		response = {},
		actionType = '',
	} = props;

	const LABEL_KEYS = getResponseKeysMapping({ activeTab });

	return (
		<div key={response} className={styles.content}>

			<div className={styles.box_info}>

				{LABEL_KEYS.map((labelKey) => (

					<div key={labelKey} className={styles.label_value_container}>
						<div className={styles.top}>
							{startCase(labelKey)}
						</div>

						<Value response={response} labelKey={labelKey} />

					</div>

				))}

				<div className={styles.edit_action}>
					<div className={styles.top}>{actionType === 'view' && 'Status'}</div>
					<div className={styles.edit_button}>
						{actionType === 'view' && (
							<Pill
								size="md"
								color="green"
							>
								Submitted
							</Pill>
						)}

					</div>

				</div>

			</div>

		</div>
	);
}

export default DetailsCard;
