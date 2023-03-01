import { useSelector } from '@cogoport/store';
import React from 'react';

import LoadingPage from '../../../common/LoadingPage';
import Loader from '../../../utils/loader';

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
	// const isMobile = useSelector((state) => (state.general || {}).isMobile);

	const isMobile = false;

	const { currency } = headerFilters;

	const selectedCurrency = currency === false ? 'USD' : 'INR';

	// return (
	// 	<>
	// 		<div className={styles.desktop}>
	// 			Desktop
	// 		</div>
	// 		<div className={styles.mobile}>
	// 			Mobile
	// 		</div>
	// 	</>
	// );

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

	// if (isMobile) {
	// 	return (
	// 		<div>
	// 			{loading ? (
	// 				[...Array(4)].map(() => (
	// 					<div className={styles.card_wrapper}>
	// 						<Loader count={4} />
	// 					</div>
	// 				))
	// 			) : (
	// 				<>
	// 					{' '}
	// 					<MobileBookingAnalysis
	// 						setFilters={setFilters}
	// 						filters={filters}
	// 						maxEtd={maxEtd}
	// 						data={data}
	// 						selectedFilterTab={selectedFilterTab}
	// 					/>
	// 					<RevenueSection
	// 						currency={selectedCurrency}
	// 						data={bookingAnalysis}
	// 						selectedFilterTab={selectedFilterTab}
	// 					/>
	// 				</>
	// 			)}
	// 		</div>
	// 	);
	// }

	// return (
	// 	<div>
	// 		{loading === true ? (
	// 			<LoadingPage />
	// 		) : (
	// 			<>
	// 				<Months
	// 					data={data}
	// 					setFilters={setFilters}
	// 					filters={filters}
	// 					maxEtd={maxEtd}
	// 					selectedFilterTab={selectedFilterTab}
	// 				/>
	// 				<RevenueSection
	// 					selectedFilterTab={selectedFilterTab}
	// 					currency={selectedCurrency}
	// 					data={bookingAnalysis}
	// 				/>
	// 				{' '}
	// 			</>
	// 		)}
	// 	</div>
	// );
}

export default RenderView;
