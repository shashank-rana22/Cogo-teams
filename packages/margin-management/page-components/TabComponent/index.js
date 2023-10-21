import { Tabs, TabPanel } from '@cogoport/components';
import { useGetPermission } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useCallback } from 'react';

import EmptyState from '../../common/EmptyStateMargins';
// import SERVICE_NAME_MAPPING from '../../helpers/service-name-mapping';
import conditions from '../../utils/condition-constants';

import CardComponent from './CardComponent';
import Details from './Details';
import MultiEntityMargin from './MultiEntityMargin';
// import SegmentedControlHeader from './SegmentedControlHeader';

function TabComponent({
	filterParams = {},
	setFilterParams = () => { },
	data = {},
	setMarginBreakupData = () => { },
	activeTab = '',
	setActivetab = () => { },
	activeService = '',
	setActiveService = () => { },
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
		cogoport            : isConditionMatches(conditions.SEE_ALL_MARGINS, 'or'),
		approval_pending    : isConditionMatches(conditions.SEE_PENDING_APPROVAL, 'or'),
		multi_entity_margin : true,
	}), [isConditionMatches]);

	const condition = useMemo(() => checkConditions(), [checkConditions]);

	const setActive = (val) => {
		setActivetab(val);
		setMarginBreakupData({});
		if (val === 'approval_pending') {
			setFilterParams({ ...filterParams, status: val, margin_type: 'demand' });
		} else setFilterParams({ ...filterParams, margin_type: val, status: 'active' });
	};

	// const segmentedControlOptions = (
	// 	activeTab === 'approval_pending' ? data?.list || [] : data?.margin_stats || []
	// ).map((service) => ({
	// 	label : SERVICE_NAME_MAPPING[service?.service],
	// 	value : service?.service,
	// }));

	// const modifiedTabOptions = Object.keys(SERVICE_NAME_MAPPING).map((key) => {
	// 	const i = (segmentedControlOptions || []).find((obj) => obj?.value === key);
	// 	if (!i) {
	// 		return null;
	// 	}
	// 	return { label: SERVICE_NAME_MAPPING[key], value: i.value };
	// });

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
										showContainerDetails={false}
									/>
								))}
							</div>
						)}
					</TabPanel>
				) : null}

				{condition.cogoport ? (
					<TabPanel name="cogoport" title="COGOPORT">
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

				{condition.approval_pending ? (
					<TabPanel name="approval_pending" title="Approval Pending">
						{isEmpty(data?.margin_stats) ? <EmptyState /> : (
							<div>
								{(data?.list || []).map((service) => (
									<Details
										setMarginBreakupData={setMarginBreakupData}
										key={service?.id}
										data={service}
									/>
								))}
							</div>
						)}
					</TabPanel>
				) : null}

				{condition.multi_entity_margin ? (
					<TabPanel name="multi_entity_margin" title="MultiEntity Margin">
						<MultiEntityMargin />
					</TabPanel>
				) : null}
			</Tabs>
			<CardComponent />
		</div>
	);
}
export default TabComponent;
