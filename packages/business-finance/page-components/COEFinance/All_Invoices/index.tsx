import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

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

function AllInvoices() {
	const { push, query } = useRouter();
	const [filters, setFilters] = useState({});
	const [subActiveTab, setSubActiveTab] = useState<string>(() => query.view || tabs[0].key);
	const tabComponentProps = {
		'purchase-view': {
			filters,
			setFilters,
			subActiveTab,
		},
		'shipment-view': {},
	};

	const ActiveTabComponent = tabsKeyComponentMapping[subActiveTab] || null;
	const onChange = (view) => {
		setSubActiveTab(view);
		push(
			'/business-finance/coe-finance/[active_tab]/[view]',
			`/business-finance/coe-finance/all_invoices/${view}` as never as null,
		);
	};

	return (
		<div>

			<div className={styles.container}>

				<div className={styles.flex}>

					{tabs.map((tab) => (
						<div
							key={tab.key}
							onClick={() => {
								onChange(tab.key);
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
