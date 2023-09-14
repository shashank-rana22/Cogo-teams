import { Tabs, TabPanel } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import Configurations from './components/AllocationConfigurations';
import Quotas from './components/AllocationQuotas';
import Relations from './components/AllocationRelations';
import Requests from './components/AllocationRequests';
import styles from './styles.module.css';

const getTabPanelMappings = ({ t = () => {} }) => ({
	configurations: {
		name      : 'configurations',
		title     : t('allocation:tab_configurations_label'),
		Component : Configurations,
	},
	relations: {
		name      : 'relations',
		title     : t('allocation:tab_relations_label'),
		Component : Relations,
	},
	requests: {
		name      : 'requests',
		title     : t('allocation:tab_request_label'),
		Component : Requests,
	},
	quotas: {
		name      : 'quotas',
		title     : t('allocation:tab_quotas_label'),
		Component : Quotas,
	},
});

function CoreAllocationEngine() {
	const { t } = useTranslation(['allocation']);

	const { profile } = useSelector((state) => state);

	const dispatch = useDispatch();

	const [activeAllocation, setActiveAllocation] = useState('configurations');

	const tabPanelMappings = getTabPanelMappings({ t });

	useEffect(() => {
		if (activeAllocation !== 'requests') {
			dispatch(
				setProfileState({
					...profile,
					authParams: undefined,
				}),
			);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeAllocation, dispatch]);

	return (
		<section className={styles.container} id="core_engine_container">
			<section className={styles.header_container}>
				<section className={styles.heading_container}>
					{t('allocation:core_engine_heading')}
				</section>

				{activeAllocation === 'requests' ? (
					<ScopeSelect size="md" showChooseAgent={false} />
				) : null}
			</section>

			<div className={styles.tab_list}>
				<Tabs
					activeTab={activeAllocation}
					fullWidth
					themeType="primary"
					onChange={setActiveAllocation}
				>
					{Object.values(tabPanelMappings).map((item) => {
						const { name = '', title = '', Component } = item;

						if (!Component) return null;

						return (
							<TabPanel key={name} name={name} title={title}>
								<Component />
							</TabPanel>
						);
					})}
				</Tabs>
			</div>
		</section>
	);
}

export default CoreAllocationEngine;
