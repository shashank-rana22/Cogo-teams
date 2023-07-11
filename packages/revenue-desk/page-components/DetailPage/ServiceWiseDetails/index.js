import { Tabs, TabPanel, Button } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateRatesPreferences from '../../../hooks/useCreateRatesPreferences';
import { DEFAULT_INDEX, VALUE_ONE, VALUE_TWO, VALUE_ZERO } from '../../constants';

import CancellationModal from './CancellationModal';
import PreviewModal from './PreviewModal';
import ReasonModal from './ReasonModal';
import SingleService from './SingleService';
import styles from './styles.module.css';

const excludedServices = [
	'fcl_freight_local_service',
	'lcl_freight_local_service',
	'air_freight_local_service',
	'subsidiary_service',
];

function ServiceWiseDetails({
	serviceData,
	shipmentData,
	priceData,
	setShowDetailPage,
	revenueDeskDecisionsData = [],
}) {
	const { services_with_preferences_set: servicesWithPreferenceSet = [] } = revenueDeskDecisionsData;
	const GROUPED_SERVICES = {};
	serviceData.forEach((service) => {
		if (!excludedServices.includes(service.service_type)) {
			GROUPED_SERVICES[service.service_type] = [
				...(GROUPED_SERVICES[service.service_type] || []),
				service,
			];
		}
	});
	const tabKeys = Object?.keys(GROUPED_SERVICES || {});
	const [supplierPayload, setSupplierPayload] = useState({});
	const [rateOptions, setRateOptions] = useState({});
	const [showCancelModal, setshowCancelModal] = useState(false);
	const [inventory, setInventory] = useState([]);
	const [activeTab, setActiveTab] = useState(tabKeys[DEFAULT_INDEX]);
	const [modalStep, setModalStep] = useState(VALUE_ZERO);
	const [reason, setReason] = useState(null);
	const [othertext, setOthertext] = useState(null);
	const [sellRateDetails, setSellRateDetails] = useState({});
	const [emailModal, setEmailModal] = useState(false);
	const { updateTrigger } = useUpdateRatesPreferences({
		supplierPayload,
		inventory,
		serviceData,
		reason,
		othertext,
		sellRateDetails,
		rateOptions,
		setShowDetailPage,
		shipmentData,
	});
	const check = (items) => {
		const ZERO = 0;
		let pref = items.length > ZERO;
		items?.forEach((item) => {
			if (!servicesWithPreferenceSet.includes(item?.id)) pref = false;
		});
		return pref;
	};
	const isSupplierPayloadEmpty = Object.keys(supplierPayload).length === VALUE_ZERO;
	const isAllServiceIdsEmpty = Object.values(supplierPayload).every((array) => array.length === VALUE_ZERO);
	const isInventoryPayloadEmpty = Object.keys(inventory).length === VALUE_ZERO;
	const isAllInventoryIdsEmpty = Object.values(inventory).every((array) => array.length === VALUE_ZERO);

	const isDisabled = (isSupplierPayloadEmpty || isAllServiceIdsEmpty)
		&& (isInventoryPayloadEmpty || isAllInventoryIdsEmpty);

	return (
		<div className={styles.container}>
			<div className={styles.button_select_container}>
				{!['completed', 'cancelled'].includes(shipmentData?.state) ? (
					<div className={styles.button_container}>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => setshowCancelModal(true)}
						>
							Cancel Booking
						</Button>
						<Button
							size="md"
							themeType="primary"
							onClick={() => setModalStep(VALUE_ONE)}
							disabled={isDisabled}
						>
							Save preference
						</Button>
					</div>
				) : null}
			</div>
			<Tabs
				activeTab={activeTab}
				themeType="primary"
				onChange={setActiveTab}
			>
				{tabKeys.map((singleTab) => (
					<TabPanel
						name={singleTab}
						title={startCase(singleTab.replace('_service', ''))}
						key={singleTab}
						icon={check(GROUPED_SERVICES?.[singleTab]) ? <IcCFtick /> : null}
					>
						<SingleService
							groupedServicesData={GROUPED_SERVICES[activeTab]}
							supplierPayload={supplierPayload}
							setSupplierPayload={setSupplierPayload}
							inventory={inventory}
							setInventory={setInventory}
							priceData={priceData}
							setSellRateDetails={setSellRateDetails}
							sellRateDetails={sellRateDetails}
							rateOptions={rateOptions}
							setRateOptions={setRateOptions}
							shipmentData={shipmentData}
							emailModal={emailModal}
							setEmailModal={setEmailModal}
							revenueDeskDecisionsData={revenueDeskDecisionsData}
						/>
					</TabPanel>
				))}
			</Tabs>
			{showCancelModal ? (
				<CancellationModal
					shipmentData={shipmentData}
					showCancelModal={showCancelModal}
					setshowCancelModal={setshowCancelModal}
					setShowDetailPage={setShowDetailPage}
				/>
			) : null}

			{modalStep === VALUE_ONE
				? (
					<PreviewModal
						modalStep={modalStep}
						setModalStep={setModalStep}
						groupedShowServicesData={GROUPED_SERVICES}
						supplierPayload={supplierPayload}
						shipmentData={shipmentData}
						updateTrigger={updateTrigger}
						priceData={priceData}
					/>
				) : null}
			{modalStep === VALUE_TWO
				? (
					<ReasonModal
						modalStep={modalStep}
						setModalStep={setModalStep}
						updateTrigger={updateTrigger}
						reason={reason}
						setReason={setReason}
						othertext={othertext}
						setOthertext={setOthertext}
					/>
				) : null}
		</div>
	);
}

export default ServiceWiseDetails;
