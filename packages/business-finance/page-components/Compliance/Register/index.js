import { useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import Inward from './Inward';
import Outward from './Outward';
import styles from './styles.module.css';

const tabs = (t) => [
	{
		key   : 'outward',
		label : t('compliance:outward_label'),
	},
	{
		key   : 'inward',
		label : t('compliance:inward_label'),
	},
];

const TABS_KEY_COMPONENT_MAPPING = {
	outward : Outward,
	inward  : Inward,
};

function Register() {
	const { t } = useTranslation(['compliance']);
	const { query, push } = useRouter();
	const { sub_active_tab:queryValue } = query || {};
	const [filters, setFilters] = useState({});
	const [subActiveTab, setSubActiveTab] = useState(queryValue || 'outward');
	const tabComponentProps = {
		outward: {
			filters,
			setFilters,
		},
		inward: { },
	};
	const ActiveTabComponent = TABS_KEY_COMPONENT_MAPPING[subActiveTab] || null;

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

					{tabs(t).map((tab) => (
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
