import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { useEffect, useRef, useState } from 'react';

import LoadingPage from '../../common/LoadingPage';
import useIsInViewport from '../../hooks/useIntersection';
import useListSalesOverallData from '../../hooks/useLIstSalesOverall';

import BookingConfirmed from './Card/BookingConfirmed';
import BookingsDone from './Card/BookingsDone';
import InvoiceCard from './Card/InvoiceCard';
import QuotationCard from './Card/QuotationCard';
import SalesOverallDetails from './SalesOverallDetails';
import MobileSalesOverallDetails from './SalesOverallDetails/MobileSalesOverallDetails';
import SalesOverallHeading from './SalesOverallHeading';
import styles from './styles.module.css';

function SalesOverall({ headerFilters }) {
	const { currency: selectedCurrency, entity_code } = headerFilters;

	const currency = selectedCurrency
		? GLOBAL_CONSTANTS.currency_code.INR
		: GLOBAL_CONSTANTS.currency_code.USD;

	const [salesCompInViewport, setsalesCompInViewport] = useState(false);
	const ref = useRef(null);
	const inViewport = useIsInViewport(ref, '-200px');

	const {
		salesOverall, setFilters, filters,
		loading, range, setRange,
	} = useListSalesOverallData(salesCompInViewport);

	useEffect(() => {
		if (!salesCompInViewport) {
			setsalesCompInViewport(inViewport);
		}
	}, [inViewport, salesCompInViewport]);

	useEffect(() => {
		setFilters((prevFilters) => ({
			...prevFilters,
			to_currency : currency,
			entity_code : entity_code?.length > 0 ? entity_code : undefined,
		}));
	}, [headerFilters, currency, entity_code, setFilters]);

	const { revenue_per_month } = salesOverall?.summary || {};

	const revenueMonth = (revenue_per_month || [])?.map((item) => ({
		id    : (item.invoice_month || '').trim(),
		value : item?.revenue_amount,
	}));

	return (
		<div className={styles.card_wrapper} ref={ref}>
			<SalesOverallHeading
				enableFilter={false}
				dateFilter
				filters={filters}
				setFilters={setFilters}
				salesFunnel={salesOverall}
				range={range}
				setRange={setRange}
			/>
			<div className={styles.card_wrapper}>
				<div className={styles.row}>
					<div className={styles.col}>
						<div className={styles.card}>
							<QuotationCard
								salesFunnel={salesOverall}
								currency={currency}
								loading={loading}
							/>

						</div>

						<div className={styles.card}>
							<BookingsDone
								salesFunnel={salesOverall}
								currency={currency}
								loading={loading}
							/>
						</div>

					</div>

					<div className={styles.col}>
						<div className={styles.card}>
							<BookingConfirmed
								salesFunnel={salesOverall}
								currency={currency}
								loading={loading}
							/>

						</div>

						<div className={styles.card}>
							<InvoiceCard
								salesFunnel={salesOverall}
								currency={currency}
								revenueMonth={revenueMonth}
								loading={loading}
							/>
						</div>

					</div>
				</div>
				<div className={styles.desktop}>
					{loading ? (
						<LoadingPage />
					) : (
						<SalesOverallDetails
							currency={currency}
							salesFunnel={salesOverall}
							filters={filters}
							setFilters={setFilters}
						/>
					)}
				</div>
				<div className={styles.mobile}>
					{loading ? (
						<LoadingPage />
					) : (
						<MobileSalesOverallDetails
							currency={currency}
							salesFunnel={salesOverall}
							filters={filters}
							setFilters={setFilters}
						/>
					)}
				</div>

			</div>
		</div>
	);
}

export default SalesOverall;
