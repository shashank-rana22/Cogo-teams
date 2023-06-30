import { Tabs, TabPanel, Button } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateRatesPreferences from '../../../hooks/useUpdateRatesPreferences';

import CancellationModal from './CancellationModal';
import PreviewModal from './PreviewModal';
import ReasonModal from './ReasonModal';
import SingleService from './SingleService';
import styles from './styles.module.css';

function ServiceWiseDetails({ groupedShowServicesData, serviceData, shipmentData, priceData, setShowDetailPage, revenueDeskDecisionsData = [] }) {
	const { services_with_preferences_set: servicesWithPreferenceSet = [] } = revenueDeskDecisionsData;
	const tabKeys = Object?.keys(groupedShowServicesData || {});
	const [supplierPayload, setSupplierPayload] = useState({});
	const [rateOptions, setRateOptions] = useState({});
	const [showCancelModal, setshowCancelModal] = useState(false);
	const [inventory, setInventory] = useState([]);
	const [activeTab, setActiveTab] = useState(tabKeys[0]);
	const [modalStep, setModalStep] = useState(0);
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
	const isSupplierPayloadEmpty = Object.keys(supplierPayload).length === 0;
	const isAllServiceIdsEmpty = Object.values(supplierPayload).every((array) => array.length === 0);

	const isDisabled = isSupplierPayloadEmpty || isAllServiceIdsEmpty;

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
							onClick={() => setModalStep(1)}
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
						icon={check(groupedShowServicesData?.[singleTab]) ? <IcCFtick /> : null}
					>
						<SingleService
							groupedServicesData={groupedShowServicesData[activeTab]}
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

			{modalStep === 1
				? (
					<PreviewModal
						modalStep={modalStep}
						setModalStep={setModalStep}
						groupedShowServicesData={groupedShowServicesData}
						supplierPayload={supplierPayload}
						shipmentData={shipmentData}
						updateTrigger={updateTrigger}
						priceData={priceData}
					/>
				) : null}
			{modalStep === 2
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
