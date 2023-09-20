import { Tabs, TabPanel } from '@cogoport/components';
import { useGetPermission } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useCallback } from 'react';

import EmptyState from '../../common/EmptyStateMargins';
import conditions from '../../utils/condition-constants';

import CardComponent from './CardComponent';
import Details from './Details';

function TabComponent({
	filterParams = {},
	setFilterParams = () => { }, data = {}, setMarginBreakupData = () => { }, activeTab = '',
	setActivetab = () => { },
	activeService = '', setActiveService = () => { },
}) {
	const { isConditionMatches } = useGetPermission();
	const checkConditions = useCallback(() => ({
		demand: isConditionMatches(
			[
				...conditions.SEE_ALL_MARGINS,
				...conditions.SEE_SALES_MARGIN,
				...conditions.ADD_CHANNEL_PARTNER_MARGIN,
			],
			'or',
		),
		supply: isConditionMatches(
			[...conditions.SEE_ALL_MARGINS, ...conditions.SEE_SUPPLY_MARGIN],
			'or',
		),
		cogoport         : isConditionMatches(conditions.SEE_ALL_MARGINS, 'or'),
		approval_pending : isConditionMatches(conditions.SEE_PENDING_APPROVAL, 'or'),

	}), [isConditionMatches]);
	const condition = useMemo(() => checkConditions(), [checkConditions]);
	const setActive = (val) => {
		setActivetab(val);
		setMarginBreakupData({});
		if (val === 'approval_pending') {
			setFilterParams({ ...filterParams, status: val, margin_type: 'demand' });
		} else setFilterParams({ ...filterParams, margin_type: val, status: 'active' });
	};
	return (
		<div>
			<Tabs activeTab={activeTab} onChange={setActive} themeType="primary">
				{condition.demand ? (
					<TabPanel name="demand" title="SALES">
						{isEmpty(data?.margin_stats) ? <EmptyState /> : (
							<div>
								{(data?.margin_stats || []).map((service) => (
									<CardComponent
										activeService={activeService}
										setActiveService={setActiveService}
										setMarginBreakupData={setMarginBreakupData}
										key={service?.id}
										service={service}
										filterparams={filterParams}
										setFilterParams={setFilterParams}
										margin_type={activeTab}
									/>
								))}
							</div>
						)}

					</TabPanel>
				) : null}

				{condition.supply ? (
					<TabPanel name="supply" title="SUPPLY">
						{(data?.margin_stats || []).map((service) => (
							<CardComponent
								activeService={activeService}
								setActiveService={setActiveService}
								setMarginBreakupData={setMarginBreakupData}
								key={service?.id}
								service={service}
								filterparams={filterParams}
								setFilterParams={setFilterParams}
								margin_type={activeTab}
								showContainerDetails={false}
							/>
						))}
					</TabPanel>
				) : null}

				{condition.cogoport ? (
					<TabPanel name="cogoport" title="COGOPORT">
						{(data?.margin_stats || []).map((service) => (
							<CardComponent
								activeService={activeService}
								setActiveService={setActiveService}
								setMarginBreakupData={setMarginBreakupData}
								key={service?.id}
								service={service}
								filterparams={filterParams}
								setFilterParams={setFilterParams}
								margin_type={activeTab}
							/>
						))}
					</TabPanel>
				) : null}

				{condition.approval_pending ? (
					<TabPanel name="approval_pending" title="Approval Pending">
						{(data?.list || []).map((service) => (
							<Details
								setMarginBreakupData={setMarginBreakupData}
								key={service?.id}
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
