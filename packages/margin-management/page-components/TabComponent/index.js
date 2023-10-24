import { Tabs, TabPanel } from '@cogoport/components';
import { useGetPermission } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useCallback } from 'react';

import EmptyState from '../../common/EmptyStateMargins';
import conditions from '../../utils/condition-constants';
import Search from '../Search';

// import CardComponent from './CardComponent';
import Details from './Details';
import ListPagination from './ListPagination';
import COMPONENT_MAPPING from './marginTypeComponentMapping';
import SERVICE_TYPE_MAPPING from './service-name-mapping';

function TabComponent({
	marginBreakupData = {},
	filterParams = {},
	setFilterParams = () => { }, data = {}, setMarginBreakupData = () => { }, activeTab = '',
	setActivetab = () => { }, refetch = () => { },
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
		} else {
			setFilterParams({ ...filterParams, margin_type: val, status: 'active' });
		}
	};

	return (
		<div>
			<Tabs
				themeType="tertiary"
				activeTab={activeTab}
				onChange={setActive}
			>
				{Object.values(COMPONENT_MAPPING).map((item) => {
					const { title = '', name = '' } = item;
					return condition[activeTab]
						? <TabPanel themeType="primary" key={name} name={name} title={title} /> : null;
				})}
			</Tabs>

			{activeTab !== 'approval_pending' ? (
				<Tabs
					themeType="tertiary"
					activeTab={activeService}
					onChange={setActiveService}
				>
					{Object.keys(SERVICE_TYPE_MAPPING).map(
						(key) => (
							<TabPanel
								themeType="primary"
								key={key}
								name={key}
								title={SERVICE_TYPE_MAPPING[key]}
							/>
						),
					)}
				</Tabs>
			) : null}

			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Search
					activeTab={activeTab}
					activeService={activeService}
					setFilterParams={setFilterParams}
					filterParams={filterParams}
				/>
				<ListPagination
					paginationProps={{
						data,
						filterParams,
						setFilterParams,
					}}
				/>
			</div>

			{activeTab !== 'approval_pending' ? (
				<div>
					{isEmpty(data?.list) ? <EmptyState /> : (
						<div>
							{(data?.list || []).map((item) => (
								<Details
									showContainerDetails
									marginBreakupData={marginBreakupData}
									setMarginBreakupData={setMarginBreakupData}
									key={item?.id}
									data={item}
									activeTab={activeTab}
									refetch={refetch}
								/>
							))}
						</div>
					)}
				</div>
			) : (
				<div>
					{isEmpty(data?.list) ? <EmptyState /> : (
						<div>
							{(data?.list || []).map((service) => (
								<Details
									marginBreakupData={marginBreakupData}
									setMarginBreakupData={setMarginBreakupData}
									key={service?.id}
									data={service}
									activeTab={activeTab}
									refetch={refetch}
								/>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
export default TabComponent;
