import { Button } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMRefresh } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import useGetPrePostShipmentQuotation from '../../../../../hook/useGetPrePostShipmentQuotation';

import PrePostCheckoutCards from './PrePostCheckoutCards';
import styles from './styles.module.css';

const geo = getGeoConstants();

function PrePostCheckoutCardsSet({
	jobId = '',
	setQuotationsData = () => {},
	shipment_id = '',
}, ref) {
	const { role_ids = [], user_id = '' } = useSelector(({ profile }) => (
		{
			role_ids : profile?.partner?.user_role_ids,
			user_id  : profile?.user?.id,
		}));

	const [accordionState, setAccordionState] = useState({});
	const {
		data: quoteData = {},
		loading: quoteLoading = false,
		syncLoading = false,
		getPrePostShipmentQuotes = () => {},
		getRealtimeShipmentQuotes = () => {},
	} = useGetPrePostShipmentQuotation({ jobId, shipment_id });

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

	const isSyncAllowed = role_ids?.some((ele) => [
		geo.uuid.cogo_auditor_id,
		geo.uuid.corporate_owner_finance_id,
	].includes(ele)) || user_id === GLOBAL_CONSTANTS.uuid.vinod_talapa_user_id;

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

			{isSyncAllowed ? (
				<div className={styles.sync_container}>
					<Button
						themeType="accent"
						type="button"
						loading={syncLoading}
						onClick={getRealtimeShipmentQuotes}
					>
						Sync
						<div>
							<IcMRefresh height="10px" width="10px" style={{ marginLeft: 4 }} />
						</div>
					</Button>
				</div>
			) : null}

		</div>
	);
}

export default forwardRef(PrePostCheckoutCardsSet);
