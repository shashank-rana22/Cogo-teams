import { Tabs, TabPanel } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { useEffect, useRef, useState } from 'react';

import LoadingPage from '../../common/LoadingPage';
import useIsInViewport from '../../hooks/useIntersection';
import useListSalesFunnelData from '../../hooks/useListSalesFunnel';

import BookingConfirmed from './Card/BookingConfirmed';
import BookingsDone from './Card/BookingsDone';
import InvoiceCard from './Card/InvoiceCard';
import QuotationCard from './Card/QuotationCard';
import FunnelHeader from './SalesFunnelDetails';
import MobileFunnelHeader from './SalesFunnelDetails/MobileSalesFunnelDetails';
import SalesFunnelHeading from './SalesFunnelHeading';
import styles from './styles.module.css';

function SalesFunnel({ headerFilters }) {
	const { currency: selectedCurrency, entity_code = [] } = headerFilters;
	const [showZone, setShowZone] = useState(false);

	const currency = selectedCurrency
		? GLOBAL_CONSTANTS.currency_code.INR
		: GLOBAL_CONSTANTS.currency_code.USD;

	const [salesFunnelInViewport, setsalesFunnelInViewport] = useState(false);
	const ref = useRef(null);
	const inViewport = useIsInViewport(ref, '-200px');

	useEffect(() => {
		if (!salesFunnelInViewport) {
			setsalesFunnelInViewport(inViewport);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inViewport]);

	const {
		salesFunnel, setFilters, filters,
		loading, range, setRange,
	} =	useListSalesFunnelData(salesFunnelInViewport);
	useEffect(() => {
		setFilters((prevFilters) => ({
			...prevFilters,
			to_currency : currency,
			entity_code : entity_code.length > 0 ? entity_code : undefined,
		}));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [headerFilters]);

	const { revenue_per_month } = salesFunnel?.summary || {};
	const revenueMonth = (revenue_per_month || [])?.map((item) => ({
		id    : (item?.invoice_month || '').trim(),
		value : item?.revenue_amount,
	}));

	const handleTabs = (val) => {
		setShowZone(!!val);
		setFilters((prevFilters) => ({
			...prevFilters,
			show_my_zone: !!val,
		}));
	};

	return (
		<div className={styles.card_wrapper} ref={ref}>
			<SalesFunnelHeading
				enableFilter={false}
				dateFilter
				filters={filters}
				setFilters={setFilters}
				salesFunnel={salesFunnel}
				range={range}
				setRange={setRange}
			/>
			<div className={styles.card_wrapper}>
				<div className={styles.row}>
					<div className={styles.col}>
						<BookingsDone
							salesFunnel={salesFunnel}
							currency={currency}
							loading={loading}
						/>
						<QuotationCard
							salesFunnel={salesFunnel}
							currency={currency}
							loading={loading}
						/>
					</div>

					<div className={styles.col}>
						<InvoiceCard
							salesFunnel={salesFunnel}
							currency={currency}
							revenueMonth={revenueMonth}
							loading={loading}
						/>
						<BookingConfirmed
							salesFunnel={salesFunnel}
							currency={currency}
							loading={loading}
						/>
					</div>
				</div>
				<div className={styles.desktop}>
					<div className={styles.tab_container}>
						<Tabs
							activeTab={showZone}
							themeType="primary"
							onChange={(e) => handleTabs(e)}
						>
							<TabPanel name={false} title="ORG" />
							<TabPanel name title="ZONE" />
						</Tabs>
					</div>
					{loading ? (
						<LoadingPage />
					) : (
						<FunnelHeader
							currency={currency}
							salesFunnel={salesFunnel}
							filters={filters}
							setFilters={setFilters}
							showZone={showZone}
							setShowZone={setShowZone}
						/>
					)}
				</div>
				<div className={styles.mobile}>
					{loading ? (
						<LoadingPage />
					) : (
						<MobileFunnelHeader
							currency={currency}
							salesFunnel={salesFunnel}
							filters={filters}
							setFilters={setFilters}
							showZone={showZone}
							setShowZone={setShowZone}
						/>
					)}
				</div>

			</div>

		</div>
	);
}

export default SalesFunnel;
