import { Tabs, TabPanel } from '@cogoport/components';
import ScopeSelect from '@cogoport/scope-select';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useState, useEffect } from 'react';

import Configurations from './components/AllocationConfigurations';
import Quotas from './components/AllocationQuotas';
import Relations from './components/AllocationRelations';
import Requests from './components/AllocationRequests';
import styles from './styles.module.css';

const TAB_PANEL_MAPPING = {
	configurations: {
		name      : 'configurations',
		title     : 'Configurations',
		Component : Configurations,
	},
	relations: {
		name      : 'relations',
		title     : 'Relations',
		Component : Relations,
	},
	requests: {
		name      : 'requests',
		title     : 'Requests',
		Component : Requests,
	},
	quotas: {
		name      : 'quotas',
		title     : 'Quotas',
		Component : Quotas,
	},
};

function CoreAllocationEngine() {
	const { profile } = useSelector((state) => state);

	const dispatch = useDispatch();

	const [activeAllocation, setActiveAllocation] = useState('configurations');

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
					Core Engine
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
					{Object.values(TAB_PANEL_MAPPING).map((item) => {
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
