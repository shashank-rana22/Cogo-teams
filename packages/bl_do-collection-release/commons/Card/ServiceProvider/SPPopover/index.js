import { cl, TabPanel, Tabs } from '@cogoport/components';
import { IcMCall, IcMEmail } from '@cogoport/icons-react';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={cl`${styles.container} ${styles.empty}`}>Looks like no records are here</div>
	);
}

export default function ServcieProvider({ spDetails = [] }) {
	const detailsArr = {
		names  : [],
		phones : [],
		emails : [],
	};

	(spDetails || []).forEach((item) => {
		if (item.name) {
			detailsArr.names.push(item.name);
		}
		if (item.mobile_number) {
			detailsArr.phones.push({
				mobile_country_code : item?.mobile_country_code,
				mobile_number       : item.mobile_number,
			});
		}
		if (item.email) {
			detailsArr.emails.push(item.email);
		}
	});

	const isNamesEmpty = detailsArr.names.length === 0;
	const isPhonesEmpty = detailsArr.phones.length === 0;
	const isEmailsEmpty = detailsArr.emails.length === 0;

	const names = isNamesEmpty ? (
		<EmptyState />
	) : (
		(spDetails || []).map((item) => (
			<div className={cl`${styles.container} ${styles.popover}`}>
				<div className={cl`${styles.text} ${styles.bold}`}>{item?.name}</div>
			</div>
		))
	);

	const phones = isPhonesEmpty ? (
		<EmptyState />
	) : (
		(spDetails || []).map((item) => (
			<div className={cl`${styles.container} ${styles.popover}`}>
				<div className={cl`${styles.text} ${styles.bold}`}>
					{`${item?.mobile_country_code} - ${item?.mobile_number}`}
				</div>
				<div className={styles.link} href={`tel:${item?.mobile_country_code} ${item?.mobile_number}`}>
					<IcMCall className="styleIcon" />
				</div>
			</div>
		))
	);

	const emails = isEmailsEmpty ? (
		<EmptyState />
	) : (
		(spDetails || []).map((item) => (
			<div className={cl`${styles.container} ${styles.popover}`}>
				<div className={cl`${styles.text} ${styles.bold}`}>{item?.email}</div>
				<div className={styles.link} href={`mailto:${item?.email}`}>
					<IcMEmail className="styleIcon" />
				</div>
			</div>
		))
	);

	return (
		<div className={cl`${styles.container} ${styles.tab_container}`}>
			<Tabs defaultActiveTab="name" className="horizontal three">
				<TabPanel name="name" title="Name" className="horizontal three">
					<div className={styles.container}>{names}</div>
				</TabPanel>
				<TabPanel name="phone" title="Phone" className="horizontal three">
					{phones}
				</TabPanel>
				<TabPanel name="email" title="Email ID" className="horizontal three">
					{emails}
				</TabPanel>
			</Tabs>
		</div>
	);
}
