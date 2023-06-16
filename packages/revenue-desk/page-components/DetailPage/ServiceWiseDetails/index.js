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

function Rates({ groupedShowServicesData, serviceData, shipmentData, priceData }) {
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
	const { loading, updateTrigger } = useUpdateRatesPreferences({
		supplierPayload,
		inventory,
		serviceData,
		reason,
		othertext,
		sellRateDetails,
		rateOptions,
	});
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
							disabled={loading}
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
						icon={groupedShowServicesData?.[singleTab]?.[0]?.is_preference_set ? <IcCFtick /> : null}
					>
						<SingleService
							groupedServicesData={groupedShowServicesData[activeTab]}
							supplierPayload={supplierPayload}
							setSupplierPayload={setSupplierPayload}
							inventory={inventory}
							setInventory={setInventory}
							price={priceData[startCase(singleTab)]}
							setSellRateDetails={setSellRateDetails}
							sellRateDetails={sellRateDetails}
							rateOptions={rateOptions}
							setRateOptions={setRateOptions}
							shipmentData={shipmentData}
						/>
					</TabPanel>
				))}
			</Tabs>
			{showCancelModal ? (
				<CancellationModal
					shipmentData={shipmentData}
					showCancelModal={showCancelModal}
					setshowCancelModal={setshowCancelModal}
				/>
			) : null}
			{modalStep === 1
				? (
					<PreviewModal
						modalStep={modalStep}
						setModalStep={setModalStep}
						tabKeys={tabKeys}
						groupedShowServicesData={groupedShowServicesData}
						supplierPayload={supplierPayload}
						priceData={priceData}
						shipmentData={shipmentData}
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

export default Rates;
