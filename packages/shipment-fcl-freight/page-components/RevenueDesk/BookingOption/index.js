import React, { useState, useEffect } from 'react';
import { Button, Modal } from '@cogoport/components';
import ChooseBookingOption from '../ChooseBookingOption';
import FlashRates from '../ChooseBookingOption/FlashRates';
// import getFlashRates from '../ChooseBookingOptions/Hooks/getFlashRates';
// import getRates from '../ChooseBookingOptions/Hooks/getRates.json';
// import existingDocuments from '../ChooseBookingOptions/Hooks/getShipmentEligibleDocument.json';
// import useListBookingOptions from '../ChooseBookingOptions/Hooks/useListBookingOptions';
import CreateDataFromChoosen from '../../../utils/revenueDeskUtils/createDataFromChoosen';
import ExistingRates from './RatesPreferences';
import styles from './styles.module.css';


function BookingOption(params) {
	const [existingRatePrefrences, setExistingRatePrefrences] = useState([]);
	const [supplierPayload, setSupplierPayload] = useState({});
	const [show, setShow] = useState(false);

	const {
		setShowBookingOption,
		currentShipmentData,
		activeTab,
		refetch = () => {},
		service,
	} = params;

	// const {
	// 	bnSalvage,
	// 	statsLoading,
	// 	existingDataLoading,
	// 	existingData,
	// 	data,
	// 	flashParams,
	// 	flash,
	// 	flashDirectLoading,
	// 	loading,
	// 	handleFlashDirect = () => {},
	// 	upateTrigger = () => {},
	// } = useListBookingOptions({
	// 	currentShipmentData,
	// 	setShow,
	// 	existingRatePrefrences,
	// 	setShowBookingOption,
	// 	supplierPayload,
	// 	refetch,
	// 	service,
	// });

	const bnSalvage = [];
	const statsLoading = false;
	const existingDataLoading = false;
	const existingData = existingDocuments;
	const data = [];
	const flashParams = getRates;
	const flash = [];
	const flashDirectLoading = false;
	const loading = false;

	const { choosen_bookings_docs, choosen_flash_params } = CreateDataFromChoosen(
		{ data: data?.list, shipment_id: currentShipmentData?.id },
	);
	useEffect(() => {
		setExistingRatePrefrences([...bnSalvage]);
	}, [statsLoading]);

	const hasExistingRates = () => {
		if (!statsLoading || existingDataLoading) {
			let hasdata = false;
			const keys = Object.keys(existingData?.docs || {});
			(keys || []).forEach((key) => {
				if (Object.keys(existingData?.docs[key]).length) {
					hasdata = true;
				}
			});
			return hasdata;
		}

		return true;
	};

	const dataCount = data?.list?.length;

	const customStyle = dataCount ? { pointerEvents: 'none', opacity: 0.5 } : {};

	return (
		<ChooseBookingOption
			activeTab={activeTab}
			currentShipmentData={currentShipmentData}
			setShowBookingOption={setShowBookingOption}
			statsLoading={false}
			data={[]}
		>
			{!statsLoading ? (
				<>
					{hasExistingRates() || dataCount > 0 ? (
						<div className={styles.existingRatesContainer} style={customStyle}>
							<ExistingRates
								data={dataCount ? choosen_bookings_docs : existingData}
								type="existing_inventory"
								prefrences={existingRatePrefrences}
								setPrefrences={setExistingRatePrefrences}
								setShowBookingOption={setShowBookingOption}
								expanded={dataCount > 0}
							/>
						</div>
					) : null}

					<div className={styles.flashRatesContainer} style={customStyle}>
						<FlashRates
							expanded={dataCount > 0}
							flashParams={dataCount ? choosen_flash_params : flashParams}
							payload={supplierPayload}
							setPayload={setSupplierPayload}
							flashChosen={flash}
							statsLoading={statsLoading}
							unit="Container"
						/>

						{!dataCount && !currentShipmentData?.is_flashed ? (
							<div className={styles.flashContainer}>
								<p className={styles.flashText}>Trigger Flash to more Supplier</p>

								<Button
									className="primary sm"
									onClick={() => handleFlashDirect()}
									disabled={flashDirectLoading}
								>
									{flashDirectLoading ? 'Flashing the Rates..' : 'Flash'}
								</Button>
							</div>
						) : null}
					</div>

					{!dataCount ? (
						<div className={styles.buttonsContainer}>
							<Button
								className="secondary md"
								style={{ marginRight: '12px' }}
								onClick={() => setShowBookingOption(false)}
							>
								Back
							</Button>

							<Button onClick={() => setShow(true)} disabled={loading}>
								Save Prefrences
							</Button>
						</div>
					) : null}
				</>
			) : null}

			{show ? (
				<Modal
					show={show}
					size="lg"
					theme="supernova"
					onClose={() => setShow(false)}
					showCloseIcon
				>
					<ConfirmPrefrences
						setShow={() => setShow(false)}
					// handleSave={upateTrigger}
						loading={loading}
					/>
				</Modal>
		 ) : null}
		</ChooseBookingOption>
	);
}
export default BookingOption;