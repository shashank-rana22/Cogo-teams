/* eslint-disable max-len */
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

const THINGS_TO_DO = [
	{
		src  : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/b4501a1989c19715142a2095d65b777e/Calendar-2.svg',
		type : 'Offboarding Requests',
		link : '/attendance-leave-management?showInbox=true ',
		key  : 'offboarding_requests',
	},
	{
		src  : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/1a9f21c2f03f299fdc0161416530ed14/Calendar-3.svg',
		type : 'Expenses',
		key  : 'expenses',
		link : '/payment',
	},
	{
		src  : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/ce7894a168aed5c5b6b42e5ba1ab4b60/Calendar.svg',
		type : 'Leave Requests',
		link : '/attendance-leave-management?showInbox=true ',
		key  : 'leave_requests',
	},
];
function ThingsToDo({ data = {} }) {
	const { push } = useRouter();
	const { task_list } = data || {};
	return (
		<div className={styles.employee_to_do}>

			<div className={styles.employee_things_to_do}>

				<span>Things to do</span>

			</div>

			<div className={styles.listed_things}>

				{(THINGS_TO_DO || []).map((item) => (

					<div
						className={styles.listed_item}
						key={item.type}
						aria-hidden
						onClick={() => push(item.link)}
					>

						<div className={styles.listed_item_left}>

							<img
								src={item?.src}
								alt=""
								style={{ width: 50, height: 50, marginRight: 14 }}
							/>

							<div>

								<div className={styles.listed_item_left_heading}>{item?.type}</div>

								<div className={styles.listed_item_left_subheading}>
									{task_list?.[item.key] || 0}
									{' '}
									pending
								</div>

							</div>

						</div>

						<div className={styles.listed_item_right}>

							{' '}

							<IcMArrowRight style={{ width: 20, height: 20 }} />

						</div>

					</div>

				))}

			</div>
		</div>
	);
}

export default ThingsToDo;
