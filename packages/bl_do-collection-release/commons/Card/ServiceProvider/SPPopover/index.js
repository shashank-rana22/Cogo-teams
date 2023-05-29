import { cl, TabPanel, Tabs } from '@cogoport/components';
import { IcMCall, IcMEmail } from '@cogoport/icons-react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import styles from './styles.module.css';

function EmptyState() {
	return (
		<div className={cl`${styles.container} ${styles.empty}`}>Looks like no records are here</div>
	);
}

export default function ServcieProvider({ spDetails = [] }) {
	const [tab, setTab] = useState('name');
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
			<div className={cl`${styles.container} ${styles.popover}`} key={uuid()}>
				<div className={cl`${styles.text} ${styles.bold}`}>{item?.name}</div>
			</div>
		))
	);

	const phones = isPhonesEmpty ? (
		<EmptyState />
	) : (
		(spDetails || []).map((item) => (
			<div className={cl`${styles.container} ${styles.popover}`} key={uuid()}>
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
			<div className={cl`${styles.container} ${styles.popover}`} key={uuid()}>
				<div className={cl`${styles.text} ${styles.bold}`}>{item?.email}</div>
				<div className={styles.link} href={`mailto:${item?.email}`}>
					<IcMEmail className="styleIcon" />
				</div>
			</div>
		))
	);

	const renderData = () => {
		if (tab === 'name') {
			return <div>{names}</div>;
		}
		if (tab === 'email') {
			return <div>{emails}</div>;
		}

		return <div>{phones}</div>;
	};

	return (
		<div className={cl`${styles.container} ${styles.tab_container}`}>
			<Tabs onChange={(val) => setTab(val)}>
				<TabPanel name="name" title="Name" />
				<TabPanel name="phone" title="Phone" />
				<TabPanel name="email" title="Email ID" />
			</Tabs>
			<div>
				{renderData()}
			</div>
		</div>
	);
}
