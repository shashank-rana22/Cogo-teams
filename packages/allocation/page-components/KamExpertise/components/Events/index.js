import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import CreateNewEvent from './CreateNewEvent';
import EventListItem from './EventList';
import Header from './Header';
import styles from './styles.module.css';

const DummyList = [
	{
		id             : 'hgf',
		status         : 'jhgf',
		expertise_type : 'Customer_Expertise',
		condition_name : 'Re-Activation',
		description    : 'dfghjk',
		trigger        : 'Shipment Creation',
		params         : 'Greater than 120 days',
		rules          : [{ id: 'ertyui', name: 'Reactivation', rule_type: 'Account' }],
	},
	{
		id             : 'hgf',
		status         : 'jhgf',
		expertise_type : 'cus',
		condition_name : 'sdfghj',
		description    : 'dfghjk',
		trigger        : 'cfvghjk',
		params         : 'dfghjk',
		rules          : [{ id: 'ertyui', name: 'dfghj', rule_type: 'account' },
			{ id: 'ertyui', name: 'dfghj', rule_type: 'account' },
			{ id: 'ertyui', name: 'dfghj', rule_type: 'account' }],
	},
	{
		id             : 'hgf',
		status         : 'jhgf',
		expertise_type : 'cus',
		condition_name : 'sdfghj',
		description    : 'dfghjk',
		trigger        : 'cfvghjk',
		params         : 'dfghjk',
		rules          : [{ id: 'ertyui', name: 'dfghj', rule_type: 'account' }],
	},
];
function Events() {
	const router = useRouter();

	const onClickBack = () => {
		router.push('/allocation/kam-expertise');
	};
	return (
		<>
			{/* <CreateNewEvent /> */}
			<div className={styles.back_container} role="presentation" onClick={onClickBack}>
				<div className={styles.icon_container}>
					<IcMArrowBack width={16} height={16} />
				</div>
				<div className={styles.back_text}>
					Back to Dashboard
				</div>
			</div>
			<Header />

			{
				DummyList.map((data, index) => (
					<EventListItem data={data} index={index} />
				))
			}
			{/* <EventListItem /> */}
		</>
	);
}

export default Events;
