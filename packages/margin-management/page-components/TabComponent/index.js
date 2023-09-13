import { Tabs, TabPanel } from '@cogoport/components';
import { useGetPermission } from '@cogoport/request';
import { v1 as uuid } from 'uuid';

import conditions from '../../utils/condition-constants';

import CardComponent from './CardComponent';
import Details from './Details';

function TabComponent({
	filterParams = {},
	setFilterParams = () => { }, data = {}, setMarginBreakupData = () => {}, activeTab = '',
	setActivetab = () => {},
}) {
	const { isConditionMatches } = useGetPermission();

	const setActive = (val) => {
		setActivetab(val);
		if (val === 'approval_pending') {
			setFilterParams({ ...filterParams, status: val, margin_type: 'demand' });
		} else setFilterParams({ ...filterParams, margin_type: val, status: 'active' });
	};

	return (
		<div>
			<Tabs activeTab={activeTab} onChange={setActive} themeType="primary">
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
								setMarginBreakupData={setMarginBreakupData}
								key={`${`${index}${uuid()}`}`}
								service={service}
								filterparams={filterParams}
								setFilterParams={setFilterParams}
								margin_type={activeTab}
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
								setMarginBreakupData={setMarginBreakupData}
								key={`${`${index}${uuid()}`}`}
								service={service}
								filterparams={filterParams}
								setFilterParams={setFilterParams}
								margin_type={activeTab}
							/>
						))}
					</TabPanel>
					) : null}

				{isConditionMatches(conditions.SEE_ALL_MARGINS, 'or') ? (
					<TabPanel name="cogoport" title="COGOPORT">
						{(data?.margin_stats || []).map((service, index) => (
							<CardComponent
								setMarginBreakupData={setMarginBreakupData}
								key={`${`${index}${uuid()}`}`}
								service={service}
								filterparams={filterParams}
								setFilterParams={setFilterParams}
								margin_type={activeTab}
							/>
						))}
					</TabPanel>
				) : null}

				{isConditionMatches(conditions.SEE_PENDING_APPROVAL, 'or') ? (
					<TabPanel name="approval_pending" title="Approval Pending">
						{(data?.list || []).map((service, index) => (
							<Details
								setMarginBreakupData={setMarginBreakupData}
								key={`${`${index}${uuid()}`}`}
								data={service}
							/>
						))}
					</TabPanel>
				) : null}
			</Tabs>
			<CardComponent />
		</div>
	);
}
export default TabComponent;
