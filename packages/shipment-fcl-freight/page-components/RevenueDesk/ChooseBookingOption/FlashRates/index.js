import React, { useState, useEffect } from 'react';
import getFormatedRates from '../../../../utils/revenueDeskUtils/getFormatedRates';
import FlashRateCard from './Card';
import getSystemFormatedRates from '../../../../utils/revenueDeskUtils/getSystemFormatedRates';
import getSupplierPrefrencePayload from '../../../../utils/revenueDeskUtils/getSupplierPreferencePayload';
import styles from './styles.module.css';

const FlashRates = ({
	setPayload = () => {},
	flashParams,
	expanded,
	flashChosen,
	statsLoading,
	unit,
}) => {
	const [prefrences, setPrefrences] = useState([]);

	const { CurrentRates, PreviousRates, SystemRates } = flashParams;


	const currentFalshRates = CurrentRates?.flashRatesData?.list;
	const previousFalshRates = PreviousRates?.flashRatesData?.list;

	const currentFormatedrates = getFormatedRates('current', currentFalshRates);
	const previousFormatedrates = getFormatedRates('present', previousFalshRates);
	const systemFormatedRates = getSystemFormatedRates(
		SystemRates?.systemRatesData?.list,
	);

	const rateCardObj = [
		{
			prefrence_key: 'system',
			type: 'System Rates',
			data: systemFormatedRates?.rows,
			loading: SystemRates?.loading,
		},
		{
			prefrence_key: 'previous',
			type: 'Rates from Previous Flash Alert',
			data: previousFormatedrates?.rows,
			loading: PreviousRates?.loading,
		},
		{
			prefrence_key: 'current',
			type: 'Rates from Current Flash Alerts',
			data: currentFormatedrates?.rows,
			loading: CurrentRates?.loading,
		},
	];

	const { service_providers = [] } = getSupplierPrefrencePayload({
		currentRates: currentFalshRates,
		previousRates: previousFalshRates,
		systemRates: SystemRates?.systemRatesData?.list,
		prefrences,
	});

	useEffect(() => {
		setPayload({ service_providers: service_providers || [] });
	}, [JSON.stringify(prefrences)]);

	useEffect(() => {
		if (flashChosen?.length) {
			setPrefrences([...flashChosen]);
		}
	}, [statsLoading]);

	return (
		<div>
			<div className={styles.heading}>Supplier Booking Options</div>

			{rateCardObj?.map((item) => (
				<FlashRateCard
					expanded={expanded}
					prefrence_key={item?.prefrence_key}
					type={item?.type}
					data={item?.data}
					prefrences={prefrences}
					setPrefrences={setPrefrences}
					loading={item?.loading}
					unit={unit}
				/>
			))}
		</div>
	);
};
export default FlashRates;