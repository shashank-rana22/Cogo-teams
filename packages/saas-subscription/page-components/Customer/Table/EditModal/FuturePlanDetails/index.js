import { Tags } from '@cogoport/components';
import { format, isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function FuturePlanDetails({ future = {} }) {
	const { id = '', start_date = '', pricing = {} } = future || {};
	const { name = '' } = pricing || {};

	const option = [
		{
			key      : id,
			children : name,
			color    : 'orange',
		},
	];

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Future Plans</h3>
			{!isEmpty(future)
				? (
					<div className={styles.detail_container}>
						<Tags items={option} />
						<div className={styles.date_container}>
							<div className={styles.date_title}>Start Date:</div>
							<div className={styles.date_title}>{format(start_date, 'dd-MM-yyyy')}</div>
						</div>
					</div>
				)
				: (
					<div>
						No Future Plans Found
					</div>
				)}
		</div>

	);
}

export default FuturePlanDetails;
