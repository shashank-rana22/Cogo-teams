import { Checkbox, Chips } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function LogModal() {
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
					<p className={styles.date}>{format(currentDate, 'dd-MMM-yyyy')}</p>
				</div>

				<div className={styles.content}>
					<p>
						{' '}
						By
						{' '}
						<b>{object.manager_name}</b>
					</p>

					<p>{object.status?.name}</p>

					{object.status ? (
						<div className={styles.dates_container}>
							<div>
								<p>Start Date</p>
								<p>{object.status?.start_date}</p>
							</div>
							<div>
								<p>End Date</p>
								<p>{object.status?.end_date}</p>
							</div>
						</div>
					) : null}

					<Chips
						items={object.options}
						selectedItems={selectedItems}
					/>
					<p>{object.comments}</p>

					<Checkbox className={styles.checkbox} label="Email sent to Manager" disabled checked />
				</div>
			</div>
		</div>
	);
}

export default LogModal;
