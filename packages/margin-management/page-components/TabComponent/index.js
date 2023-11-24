import { Tabs, TabPanel, Button, Modal, Select } from '@cogoport/components';
import { IcMUpwardGraph } from '@cogoport/icons-react';
import { useGetPermission } from '@cogoport/request';
import { useMemo, useCallback, useState, useEffect } from 'react';

import conditions from '../../utils/condition-constants';
import Search from '../Search';

import ApprovalPendingMargins from './ApprovalPendingMargins';
import GeneralMargins from './GeneralMargins';
import COMPONENT_MAPPING from './marginTypeComponentMapping';
import MultiEntityMargin from './MultiEntityMargin';
import SERVICE_TYPE_MAPPING from './service-name-mapping';
import styles from './styles.module.css';
import TransactionFunnelData from './TransactionFunnelData';

const MAIN_COMPONENT_MAPPING = {
	demand              : GeneralMargins,
	supply              : GeneralMargins,
	cogoport            : GeneralMargins,
	approval_pending    : ApprovalPendingMargins,
	multi_entity_margin : MultiEntityMargin,
};

const MOBILE_SCREEN_SIZE = 768;

function TabComponent({
	marginBreakupData = {},
	filterParams = {}, loading = false,
	setFilterParams = () => { }, data = {}, setMarginBreakupData = () => { }, activeTab = '',
	setActivetab = () => { }, refetch = () => { },
	activeService = '', setActiveService = () => { },
}) {
	const { isConditionMatches } = useGetPermission();

	const [showFunnelModal, setShowFunnelModal] = useState(false);

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth < MOBILE_SCREEN_SIZE);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const checkConditions = useCallback(() => ({
		demand: isConditionMatches(
			[
				...conditions.SEE_ALL_MARGINS,
				...conditions.SEE_SALES_MARGIN,
				...conditions.ADD_CHANNEL_PARTNER_MARGIN,
			],
			'or',
		),
		// supply: isConditionMatches(
		// 	[...conditions.SEE_ALL_MARGINS, ...conditions.SEE_SUPPLY_MARGIN],
		// 	'or',
		// ),
		cogoport            : isConditionMatches(conditions.SEE_ALL_MARGINS, 'or'),
		// approval_pending    : isConditionMatches(conditions.SEE_PENDING_APPROVAL, 'or'),
		multi_entity_margin : true,
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

	const MainComponent = MAIN_COMPONENT_MAPPING[activeTab] || GeneralMargins;

	return (
		<>
			{isMobile ? (
				<>
					<h5>Select Margin Type</h5>
					<Select
						value={activeTab}
						onChange={setActive}
						options={Object.values(COMPONENT_MAPPING).map((i) => condition[activeTab] && {
							label : i?.title,
							value : i?.name,
						})}
					/>
				</>
			) : (
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
			)}

			{!['approval_pending', 'multi_entity_margin'].includes(activeTab) ? (
				<div>
					{isMobile ? (
						<div className={styles.mobile_service_container}>
							<div style={{ width: '100%' }}>
								<h5>Select Service</h5>
								<Select
									value={activeService}
									onChange={setActiveService}
									options={Object.keys(SERVICE_TYPE_MAPPING).map((i) => ({
										label : SERVICE_TYPE_MAPPING[i],
										value : i,
									}))}
								/>
							</div>
							<Button onClick={() => setShowFunnelModal(!showFunnelModal)}>
								<IcMUpwardGraph />
							</Button>
						</div>
					) : (
						<div style={{ display: 'flex', gap: '4px', margin: '12px 0', justifyContent: 'space-between' }}>
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
					)}
				</div>
			) : null}

			<MainComponent
				loading={loading}
				data={data}
				marginBreakupData={marginBreakupData}
				setMarginBreakupData={setMarginBreakupData}
				activeTab={activeTab}
				refetch={refetch}
				filterParams={filterParams}
				setFilterParams={setFilterParams}
				activeService={activeService}
			/>

			{showFunnelModal ? (
				<Modal
					className="primary lg"
					show={showFunnelModal}
					onClose={() => setShowFunnelModal(false)}
					size="xl"
					scroll={false}
				>
					<Modal.Header title="Transaction Details" />
					<Modal.Body>
						<TransactionFunnelData activeService={activeService} />
					</Modal.Body>
					<Modal.Footer>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => {
								setShowFunnelModal(false);
							}}
						>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</>
	);
}
export default TabComponent;
