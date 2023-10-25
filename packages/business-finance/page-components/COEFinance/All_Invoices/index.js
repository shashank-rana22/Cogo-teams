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

const COST_ADVOCATE_VIEWS = ['finance_rejected', 'coe_rejected', 'coe_on_hold'];

const tabsKeyComponentMapping = {
	'purchase-view' : PurchaseInvoice,
	'shipment-view' : ShipmentIdView,
};

function AllInvoices({ statsData = {} }) {
	const { push, query } = useRouter();
	const [filters, setFilters] = useState({});
	const getQueryView = () => {
		if (COST_ADVOCATE_VIEWS.includes(query.view)) {
			return null;
		}
		return query.view;
	};
	const [subActiveTab, setSubActiveTab] = useState(getQueryView() || 'purchase-view');
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
			'/business-finance/audit-function/[active_tab]/[view]',
			`/business-finance/audit-function/all_invoices/${subActiveTab || query.view}  `,
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
