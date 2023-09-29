import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function ServiceContent({ toggleState = false, list = [] }) {
	return (
		<div className={styles.container}>
			<div className={styles.column_name}>
				<div className={styles.service}>Service Type</div>
				{!toggleState
					? <div className={styles.reasons}>Reason</div>
					: <div className={styles.reasons}>Updated At</div> }
			</div>

			{isEmpty(list) ? <div className={styles.empty_data}>No data </div> : (
				<div className={styles.list_services}>
					{(list || []).map((item) => {
						const { status = '', key = '', rejection_reason = '', updated_at = '' } = item || {};

						return (
							<div className={styles.each_row} key={`${key}_${status}`}>
								<div className={styles.service}>{startCase(key)}</div>
								{!toggleState ? (
									<div className={styles.reasons}>
										{rejection_reason || '-'}
									</div>
								) : (
									<div className={styles.reasons}>
										{
									formatDate({
										date       : updated_at,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
										formatType : 'date',
									})
								}
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default ServiceContent;
