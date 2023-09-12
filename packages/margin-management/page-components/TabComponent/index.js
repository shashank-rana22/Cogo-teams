import { Tabs, TabPanel } from '@cogoport/components';
import { useGetPermission } from '@cogoport/request';
import { v1 as uuid } from 'uuid';

import conditions from '../../utils/condition-constants';

import CardComponent from './CardComponent';

function TabComponent({ data = {}, filterParams = {}, setFilterParams = () => { } }) {
	const { isConditionMatches } = useGetPermission();

	const setActive = (val) => {
		setFilterParams({ ...filterParams, margin_type: val });
	};
	return (
		<div>
			<Tabs activeTab={filterParams?.margin_type} onChange={setActive} themeType="primary">
				{isConditionMatches(
					[
						...conditions.SEE_ALL_MARGINS,
						...conditions.SEE_SALES_MARGIN,
						...conditions.ADD_CHANNEL_PARTNER_MARGIN,
					],
					'or',
				) ? (
					<TabPanel name="demand" title="SALES">
						{(data?.margin_stats || []).map((service, index) => (
							<CardComponent
								key={`${`${index}${uuid()}`}`}
								service={service}
								filterparams={filterParams}
								setFilterParams={setFilterParams}
							/>
						))}
					</TabPanel>
					) : null}

				{isConditionMatches(
					[...conditions.SEE_ALL_MARGINS, ...conditions.SEE_SUPPLY_MARGIN],
					'or',
				) ? (
					<TabPanel name="supply" title="SUPPLY">
						{(data?.margin_stats || []).map((service, index) => (
							<CardComponent
								key={`${`${index}${uuid()}`}`}
								service={service}
								filterparams={filterParams}
								setFilterParams={setFilterParams}
							/>
						))}
					</TabPanel>
					) : null}

				{isConditionMatches(conditions.SEE_ALL_MARGINS, 'or') ? (
					<TabPanel name="cogoport" title="COGOPORT">
						{(data?.margin_stats || []).map((service, index) => (
							<CardComponent
								key={`${`${index}${uuid()}`}`}
								service={service}
								filterparams={filterParams}
								setFilterParams={setFilterParams}
							/>
						))}
					</TabPanel>
				) : null}

				{isConditionMatches(conditions.SEE_PENDING_APPROVAL, 'or') ? (
					<TabPanel name="approval_pending" title="Approval Pending">
						approval pending
					</TabPanel>
				) : null}
			</Tabs>
			<CardComponent />
		</div>
	);
}
export default TabComponent;
