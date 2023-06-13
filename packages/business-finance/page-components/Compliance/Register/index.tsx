import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Inward from './Inward';
import Outward from './Outward';
import styles from './styles.module.css';

const tabs = [
	{
		key   : 'outward',
		label : 'Outward',
	},
	{
		key   : 'inward',
		label : 'Inward',
	},
];

const tabsKeyComponentMapping = {
	outward : Outward,
	inward  : Inward,
};

function Register() {
	const { query, push } = useRouter();
	const { sub_active_tab:queryValue } = query || {};
	const [filters, setFilters] = useState({});
	const [subActiveTab, setSubActiveTab] = useState<string>(queryValue?.toString() || 'outward');
	const tabComponentProps = {
		outward: {
			filters,
			setFilters,
		},
		inward: { },
	};
	const ActiveTabComponent = tabsKeyComponentMapping[subActiveTab] || null;

	const handleTabChange = (tab) => {
		setSubActiveTab(tab.key);
		push(
			'/business-finance/compliance/[active_tab]/[sub_active_tab]',
			`/business-finance/compliance/register/${tab.key}`,
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
export default Register;
