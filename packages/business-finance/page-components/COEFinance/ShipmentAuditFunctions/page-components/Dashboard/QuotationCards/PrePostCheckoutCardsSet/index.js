import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import useGetPrePostShipmentQuotation from '../../../../../hook/useGetPrePostShipmentQuotation';

import PrePostCheckoutCards from './PrePostCheckoutCards';
import styles from './styles.module.css';

function PrePostCheckoutCardsSet({
	jobId = '',
	setQuotationsData = () => {},
	shipment_id = '',
}, ref) {
	const [accordionState, setAccordionState] = useState({});
	const {
		data: quoteData = {},
		loading: quoteLoading = false,
		getPrePostShipmentQuotes = () => {},
	} = useGetPrePostShipmentQuotation({ jobId });

	const toggleAccordion = (key) => {
		setAccordionState((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	useImperativeHandle(ref, () => ({
		getPrePostShipmentQuotes,
	}));

	useEffect(() => {
		const INITIAL_STATE = {};
		Object.keys(quoteData).forEach((category) => {
			Object.keys(quoteData?.[category])?.forEach((subCategory, index) => {
				INITIAL_STATE[`${category}_${subCategory}`] = (index === GLOBAL_CONSTANTS.zeroth_index);
			});
		});
		setAccordionState(INITIAL_STATE);

		setQuotationsData((prev) => ({ ...prev, prePostCheckoutData: quoteData }));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(quoteData)]);

	return (
		<div className={styles.task_specific_container}>
			<PrePostCheckoutCards
				getPrePostShipmentQuotes={getPrePostShipmentQuotes}
				data={quoteData?.SELL}
				loading={quoteLoading}
				type="Sell Quotation"
				accordionState={accordionState}
				toggleAccordion={toggleAccordion}
				setAccordionState={setAccordionState}
				shipment_id={shipment_id}
				category="SELL"
			/>
			<PrePostCheckoutCards
				data={quoteData?.BUY}
				loading={quoteLoading}
				type="Buy Quotation"
				accordionState={accordionState}
				toggleAccordion={toggleAccordion}
				setAccordionState={setAccordionState}
				shipment_id={shipment_id}
				category="BUY"
				getPrePostShipmentQuotes={getPrePostShipmentQuotes}
			/>
		</div>
	);
}

export default forwardRef(PrePostCheckoutCardsSet);
