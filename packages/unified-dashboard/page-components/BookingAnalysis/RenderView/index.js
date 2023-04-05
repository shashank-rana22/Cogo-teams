import React from 'react';

import Loader from '../../../common/Loader';
import LoadingPage from '../../../common/LoadingPage';

import MobileBookingAnalysis from './MobileBookingAnalytics';
import Months from './Months';
import RevenueSection from './RevenueSection';
import styles from './styles.module.css';

function RenderView({
	loading,
	setFilters = {},
	filters = {},
	selectedFilterTab,
	maxEtd,
	data = [],
	headerFilters,
	bookingAnalysis,
	showRevenue,
	setShowRevenue,
}) {
	const { currency } = headerFilters;

	const selectedCurrency = currency === false ? 'USD' : 'INR';

	return (
		<>
			<div className={styles.desktop}>
				<div>
					{loading === true ? (
						<LoadingPage />
					) : (
						<>
							<Months
								data={data}
								setFilters={setFilters}
								filters={filters}
								maxEtd={maxEtd}
								selectedFilterTab={selectedFilterTab}
							/>
							<RevenueSection
								selectedFilterTab={selectedFilterTab}
								currency={selectedCurrency}
								data={bookingAnalysis}
								showRevenue={showRevenue}
								setShowRevenue={setShowRevenue}
							/>
							{' '}
						</>
					)}
				</div>
			</div>
			<div className={styles.mobile}>
				<div>
					{loading ? (
						[...Array(4)].map(() => (
							<div className={styles.card_wrapper}>
								<Loader count={4} />
							</div>
						))
					) : (
						<>
							{' '}
							<MobileBookingAnalysis
								setFilters={setFilters}
								filters={filters}
								maxEtd={maxEtd}
								data={data}
								selectedFilterTab={selectedFilterTab}
							/>
							<RevenueSection
								currency={selectedCurrency}
								data={bookingAnalysis}
								selectedFilterTab={selectedFilterTab}
								showRevenue={showRevenue}
								setShowRevenue={setShowRevenue}
							/>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default RenderView;
