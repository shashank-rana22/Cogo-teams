import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { useState, useEffect } from 'react';

import useGetPrePostShipmentQuotation from '../../../../hook/useGetPrePostShipmentQuotation';
import PrePostCheckoutCards from '../QuotationCards/PrePostCheckoutCards';

import styles from './styles.module.css';

function Header({ jobId = '' }) {
	const { query: { active_tab = '' }, push = () => {} } = useRouter();
	const {
		data: quoteData = {},
		loading: quoteLoading = true,
	} = useGetPrePostShipmentQuotation({ jobId });

	console.log({ quoteData });

	const [accordionState, setAccordionState] = useState({});
	// console.log({ initialState, accordionState });
	useEffect(() => {
		const INITIAL_STATE = {};
		// let check = 0;
		Object.keys(quoteData).forEach((category) => {
			Object.keys(quoteData[category]).forEach((subCategory, index) => {
			// console.log(`${category}_${subCategory}`, 'hipp', index);
			// check = -1;
				INITIAL_STATE[`${category}_${subCategory}`] = (index === GLOBAL_CONSTANTS.zeroth_index);
			});
		});
		setAccordionState(INITIAL_STATE);
	}, [quoteData]);

	console.log({ accordionState });

	const toggleAccordion = (key) => {
		setAccordionState((prev) => ({ ...prev, [key]: !prev[key] }));
	};
	const handleClick = () => {
		if (active_tab === 'financial_close') {
			push(
				'/business-finance/coe-finance/financial_close',
			);
		} else {
			push(
				'/business-finance/coe-finance/operational_close',
			);
		}
	};
	return (
		<div className={styles.main_container}>
			<div className={styles.container}>
				<Button themeType="secondary" size="md" onClick={handleClick}>Go Back</Button>

				<div className={styles.actions}>
					<div>
						<Button size="md" themeType="secondary">Hold</Button>
					</div>
					<div className={styles.header_button}>
						<Button size="md" themeType="primary">Approve</Button>
					</div>
				</div>
			</div>
			<div className={styles.pre_post_container}>
				<PrePostCheckoutCards
					data={quoteData?.SELL}
					loading={quoteLoading}
					type="SELL Quotation"
					accordionState={accordionState}
					toggleAccordion={toggleAccordion}
					setAccordionState={setAccordionState}
					category="SELL"
				/>
				<PrePostCheckoutCards
					data={quoteData?.BUY}
					loading={quoteLoading}
					type="BUY Quotation"
					accordionState={accordionState}
					toggleAccordion={toggleAccordion}
					setAccordionState={setAccordionState}
					category="BUY"
				/>
			</div>
		</div>
	);
}

export default Header;
