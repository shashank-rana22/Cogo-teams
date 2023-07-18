import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../../common/EmptyState';
import Workscopes from '../../commons/Workscopes';
import getDetails from '../../configurations/get-details';
import getResponseKeysMapping from '../../configurations/response-keys-mapping';

import styles from './styles.module.css';

function List({ data = [], activeTab = '' }) {
	const RESPONSE_LABEL_KEYS = getResponseKeysMapping({ activeTab });
	const details = getDetails({ data, activeTab });

	if (isEmpty(details)) {
		return (
			<div className={styles.padd}>
				<div className={styles.main}>
					<EmptyState />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.main}>

			{(details || []).map((poc) => (
				<div key={poc} className={styles.content}>

					<div className={styles.box_info}>

						{Object.keys(poc).map((pocKey) => (
							<div key={pocKey} className={styles.label_value_container}>
								<div className={styles.top}>
									{RESPONSE_LABEL_KEYS[pocKey]}
								</div>

								<div className={styles.bottom}>
									{(pocKey === 'work_scopes' && poc?.[pocKey])
										? <Workscopes work_scopes={poc?.[pocKey]} />
										: poc?.[pocKey] }
								</div>
							</div>

						))}

					</div>

				</div>
			))}

		</div>
	);
}

export default List;
