import { Checkbox, Chips } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function AllLogs() {
	const currentDate = new Date();

	const object = {
		manager_name : 'Neelam P',
		status       : {
			name       : 'PIP Extended',
			start_date : format(currentDate, 'dd-MMM-yyyy'),
			end_date   : '22-Apr-2023',
		},
		options: [{
			key      : 'Email',
			children : 'Email',
			prefix   : <IcMTick />,
			disabled : true,
		},
		{
			key      : 'Performance',
			children : 'Performance',
			prefix   : <IcMTick />,
			disabled : true,
		}],
		comments: 'This is a example of a commentIn publishing and graphic design,',
	};

	const selectedItems = ['Email', 'Performance'];

	return (
		<div className={styles.main_container}>
			<div className={styles.sub_container}>
				<div className={styles.flex_container}>
					<div className={styles.circle} />
					<div className={styles.date}>{format(currentDate, 'dd-MMM-yyyy')}</div>
				</div>

				<div className={styles.content}>
					<div>
						{' '}
						By
						{' '}
						<b>{object.manager_name}</b>
					</div>

					<div>{object.status?.name}</div>

					{object.status ? (
						<div className={styles.dates_container}>
							<div>
								<div>Start Date</div>
								<div>{object.status?.start_date}</div>
							</div>
							<div>
								<div>End Date</div>
								<div>{object.status?.end_date}</div>
							</div>
						</div>
					) : null}

					<Chips
						items={object.options}
						selectedItems={selectedItems}
					/>
					<div>{object.comments}</div>

					<Checkbox className={styles.checkbox} label="Email sent to Manager" disabled checked />
				</div>
			</div>
		</div>
	);
}

export default AllLogs;
