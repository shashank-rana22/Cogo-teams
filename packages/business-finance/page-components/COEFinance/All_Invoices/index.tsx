import { useRouter } from '@cogoport/next';
import React, { useEffect, useState } from 'react';

import PurchaseInvoice from './PurchaseInvoiceView/index';
import ShipmentIdView from './ShipmentIdView/index';
import styles from './styles.module.css';

const tabs = [
	{
		key   : 'purchase-view',
		label : 'PURCHASE INVOICE VIEW',
	},
	{
		key   : 'shipment-view',
		label : 'SHIPMENT ID VIEW',
	},
];

const tabsKeyComponentMapping = {
	'purchase-view' : PurchaseInvoice,
	'shipment-view' : ShipmentIdView,
};

function AllInvoices({ statsData }) {
	const { push, query } = useRouter();
	const [filters, setFilters] = useState({});
	const getQueryView = () => {
		if (query.view === 'finance_rejected' || query.view === 'coe_rejected') {
			return null;
		}
		return query.view;
	};
	const [subActiveTab, setSubActiveTab] = useState<string>(getQueryView() || 'purchase-view');
	const tabComponentProps = {
		'purchase-view': {
			filters,
			setFilters,
			statsData,
			subActiveTab,
		},
		'shipment-view': { },
	};
	const ActiveTabComponent = tabsKeyComponentMapping[subActiveTab] || null;
	const handleTabChange = (tab) => {
		setSubActiveTab(tab.key);
	};

	useEffect(() => {
		push(
			'/business-finance/coe-finance/[active_tab]/[view]',
			`/business-finance/coe-finance/all_invoices/${subActiveTab || query.view}  `,
		);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subActiveTab]);

	return (
		<div>

			<div className={styles.container}>

				<div className={styles.flex}>

					{tabs.map((tab) => (
						<div
							key={tab.key}
							onClick={() => {
								handleTabChange(tab);
							}}
							role="presentation"
						>
							{' '}
							<div className={tab.key === subActiveTab
								? styles.sub_container_click : styles.sub_container}
							>
								{tab.label}

							</div>

						</div>
					))}
				</div>

			</div>
			{ActiveTabComponent && <ActiveTabComponent key={subActiveTab} {...tabComponentProps[subActiveTab]} />}
		</div>
	);
}
export default AllInvoices;
