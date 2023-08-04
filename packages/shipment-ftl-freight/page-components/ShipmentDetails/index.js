import { Tabs, TabPanel, Loader, Button, Toggle } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMRefresh } from '@cogoport/icons-react';
import { dynamic } from '@cogoport/next';
import { ShipmentChat } from '@cogoport/shipment-chat';
import { useSelector } from '@cogoport/store';
import { useRouter } from 'next/router';
import React, { useMemo, useState, useEffect, useCallback } from 'react';

import AddService from '../../common/AdditionalServices/components/List/AddService';
import CancelDetails from '../../common/CancelDetails';
import PocSop from '../../common/PocSop';
import ShipmentHeader from '../../common/ShipmentHeader';
import ShipmentInfo from '../../common/ShipmentInfo';
import Timeline from '../../common/TimeLine';
import useGetActiveStakeholder from '../../hooks/useGetActiveStakeholder';
import useGetShipment from '../../hooks/useGetShipment';
import useGetTimeLine from '../../hooks/useGetTimeline';
import useServiceList from '../../hooks/useServiceList';
import getStakeholderConfig from '../../stakeholderConfig';

import styles from './styles.module.css';

const TAB_MAPPING = {
	overview        : dynamic(() => import('../../common/Overview'), { ssr: false }),
	tasks           : dynamic(() => import('../../common/Tasks'), { ssr: false }),
	field_executive : dynamic(() => import('../../common/FieldExecutive'), { ssr: false }),
	sales           : dynamic(() => import('../../common/SalesInvoice'), { ssr: false }),
	purchase        : dynamic(() => import('@cogoport/purchase-invoicing/page-components'), { ssr: false }),
	documents       : dynamic(() => import('../../common/Documents'), { ssr: false }),
	emails          : dynamic(() => import('@cogoport/shipment-mails/page-components'), { ssr: false }),
	tracking        : dynamic(() => import('@cogoport/surface-modules/components/Tracking'), { ssr: false }),
};
const FORBIDDEN_STATUS_CODE = 403;

function ShipmentDetails() {
	const router = useRouter();
	const prof = useSelector(
		({ profile }) => profile,
	);
	const { authParams } = prof || {};

	const activeStakeholder = useGetActiveStakeholder();
	const stakeholderConfig = getStakeholderConfig({ stakeholder: activeStakeholder, authParams });
	const { get } = useGetShipment();
	const { features = [], default_tab = 'tasks', visible_tabs = [] } = stakeholderConfig || {};

	const [activeTab, setActiveTab] = useState(default_tab);

	const { shipment_data, isGettingShipment, getShipmentStatusCode } = get || {};
	const { getTimeline = {} } = useGetTimeLine({ shipment_data });
	const { servicesGet = {} } = useServiceList();

	const handleVersionChange = useCallback(() => {
		const newHref = `${window.location.origin}/${router?.query?.partner_id}/shipments/${shipment_data?.id}`;
		window.location.replace(newHref);
		window.sessionStorage.setItem('prev_nav', newHref);
	}, [router?.query?.partner_id, shipment_data?.id]);

	const contextValues = useMemo(() => ({
		...get,
		...getTimeline,
		...servicesGet,
		activeStakeholder,
		stakeholderConfig,
	}), [get, servicesGet, getTimeline, stakeholderConfig, activeStakeholder]);

	useEffect(() => {
		router.prefetch(router.asPath);
	}, [router]);

	const tabs = Object.keys(TAB_MAPPING).filter((t) => visible_tabs.includes(t));

	const conditionMapping = {
		shipment_info       : features.includes('shipment_info'),
		shipment_header     : features.includes('shipment_header'),
		poc_sop             : (features.includes('poc') || features.includes('sop')),
		chat                : features.includes('chat'),
		cancelDetails       : (features.includes('cancel_details') && shipment_data?.state === 'cancelled'),
		documentHoldDetails : features.includes('document_hold_details'),
		timeline            : features.includes('timeline'),
	};

	const tabProps = {
		overview        : { shipmentData: shipment_data },
		field_executive : {
			shipment_data,
			servicesList: servicesGet?.servicesList,
		},
		emails: {
			source           : 'cogo_rpa',
			filters          : { q: shipment_data?.serial_id },
			pre_subject_text : `${shipment_data?.serial_id}`,
			shipment_type  	 : shipment_data?.shipment_type,
		},
		purchase: {
			shipmentData : shipment_data,
			servicesData : servicesGet?.servicesList,
			AddService,
		},
		tracking: {
			shipmentData: shipment_data,
		},
	};

	if (isGettingShipment || getShipmentStatusCode === undefined) {
		return (
			<div className={styles.loader}>
				Loading Shipment Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	if (!shipment_data && ![FORBIDDEN_STATUS_CODE, undefined].includes(getShipmentStatusCode)) {
		return (
			<div className={styles.shipment_not_found}>
				<div className={styles.section}>
					<h2 className={styles.error}>Something Went Wrong!</h2>

					<div className={styles.page}>We are looking into it.</div>

					<Button
						onClick={() => router.reload()}
						className={styles.refresh}
					>
						<IcMRefresh />
						{' '}
						Refresh
					</Button>
				</div>
			</div>
		);
	}

	if (getShipmentStatusCode === FORBIDDEN_STATUS_CODE && getShipmentStatusCode !== undefined) {
		return (
			<div className={styles.shipment_not_found}>
				<div className={styles.page}>
					You don&apos;t have permission to visit this page.
					Please contact at +91 7208083747
				</div>
			</div>
		);
	}

	return (
		<ShipmentDetailContext.Provider value={contextValues}>
			<div>
				<div className={styles.top_header}>
					<ShipmentInfo />

					<div className={styles.toggle_chat}>
						<Toggle
							size="md"
							onLabel="Old"
							offLabel="New"
							onChange={handleVersionChange}
						/>
						{conditionMapping.chat ? <ShipmentChat /> : null}
					</div>
				</div>

				{shipment_data?.state === 'cancelled' ? <CancelDetails /> : null}

				<div className={styles.header}>
					{conditionMapping.shipment_header ? <ShipmentHeader /> : null}

					{conditionMapping.poc_sop ? <PocSop /> : null}
				</div>

				{conditionMapping.timeline ? <Timeline /> : null}

				<div className={styles.container}>
					<Tabs
						activeTab={activeTab}
						fullWidth
						themeType="secondary"
						onChange={setActiveTab}
					>
						{tabs.map((singleTab) => (
							<TabPanel name={singleTab} key={singleTab} title={stakeholderConfig[singleTab]?.tab_title}>
								{TAB_MAPPING[singleTab]({
									...(tabProps?.[singleTab] || {}),
									...(stakeholderConfig[singleTab] || {}),
								})}
							</TabPanel>
						))}
					</Tabs>
				</div>
			</div>
		</ShipmentDetailContext.Provider>
	);
}

export default ShipmentDetails;
