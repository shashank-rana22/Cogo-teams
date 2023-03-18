import { useRouter } from '@cogoport/next';
import React, { useEffect, useState } from 'react';

import Archive from './Archive';
import ShipmentView from './ShipmentView';
import styles from './styles.module.css';

const tabs = [
	{
		key   : 'shipment_view',
		label : 'Shipment View',
	},
	{
		key   : 'archive',
		label : 'Archive',
	},
];

const tabsKeyComponentMapping = {
	shipment_view : ShipmentView,
	archive       : Archive,
};

function Accruals() {
	const { query, push } = useRouter();

	const [subActiveTab, setSubActiveTab] = useState<string>(query.view || 'shipment_view');
	const tabComponentProps = {
		shipment_view : {},
		archive       : {},
	};

	const ActiveTabComponent = tabsKeyComponentMapping[subActiveTab] || null;
	const handleChange = (view:string) => {
		setSubActiveTab(view);

		push(
			'/business-finance/cogo-book/[active_tab]/[view]',
			`/business-finance/cogo-book/accruals/${view}`,
		);
	};
	useEffect(() => {
		push(
			'/business-finance/cogo-book/[active_tab]/[view]',
			`/business-finance/cogo-book/accruals/${subActiveTab}`,
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
								handleChange(tab.key);
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
export default Accruals;
