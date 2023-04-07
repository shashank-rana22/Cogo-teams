import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Header({ auditData, loading }) {
	const { name, updated_at } = auditData;

	return (
		<div className={styles.main_container}>
			<div className={styles.config_basic_detail}>
				<div className={styles.draft_name}>
					<div style={{ marginRight: '8px' }}>
						Currently Editing :
						{' '}
					</div>

					<b>Saved Draft</b>
				</div>

				<div className={styles.lower_details}>
					<div className={styles.lower_info}>
						<div>
							Last Modified
							{' '}
							:&nbsp;
						</div>

						<span>
							{loading ? <Placeholder height="20px" width="120px" />
								: ((updated_at && (formatDate({
									date       : updated_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MM-yyyy'],
									formatType : 'date',
								}))) || '')}
						</span>
					</div>

					<div className={styles.lower_info} style={{ marginLeft: '36px' }}>
						<div>
							Last Edit By
							{' '}
							:&nbsp;
						</div>

						{loading ? <Placeholder height="20px" width="120px" /> : <b>{startCase(name || '')}</b>}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
