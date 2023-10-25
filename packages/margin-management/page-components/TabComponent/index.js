import { Tabs, TabPanel, Button, Modal } from '@cogoport/components';
import { useGetPermission } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useCallback, useState } from 'react';

import EmptyState from '../../common/EmptyStateMargins';
import conditions from '../../utils/condition-constants';
import Search from '../Search';

// import CardComponent from './CardComponent';
import Details from './Details';
import ListPagination from './ListPagination';
import COMPONENT_MAPPING from './marginTypeComponentMapping';
import SERVICE_TYPE_MAPPING from './service-name-mapping';
import TransactionFunnelData from './TransactionFunnelData';

function TabComponent({
	marginBreakupData = {},
	filterParams = {},
	setFilterParams = () => { }, data = {}, setMarginBreakupData = () => { }, activeTab = '',
	setActivetab = () => { }, refetch = () => { },
	activeService = '', setActiveService = () => { },
}) {
	const { isConditionMatches } = useGetPermission();

	const [showFunnelModal, setShowFunnelModal] = useState(false);

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
			<div style={{ display: 'flex', justifyContent: 'space-between', margin: '12px 0', cursor: 'pointer' }}>
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
				<Search
					activeTab={activeTab}
					activeService={activeService}
					setFilterParams={setFilterParams}
					filterParams={filterParams}
				/>
			</div>

			{activeTab !== 'approval_pending' ? (
				<div style={{ display: 'flex', gap: '4px', margin: '12px 0' }}>
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
					<Button onClick={() => setShowFunnelModal(!showFunnelModal)}>
						Show Transaction funnel
					</Button>
				</div>
			) : null}

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

			<ListPagination
				paginationProps={{
					data,
					filterParams,
					setFilterParams,
				}}
			/>

			{showFunnelModal ? (
				<Modal
					className="primary xl"
					show={showFunnelModal}
					onClose={() => setShowFunnelModal(false)}
					size="lg"
				>
					<Modal.Header title="Transaction data" />
					<Modal.Body>
						<TransactionFunnelData activeService={activeService} />
					</Modal.Body>
					<Modal.Footer>
						Close
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}
export default TabComponent;
