import Empty from '../../common/Empty';
import LoadingPage from '../../common/LoadingPage';
import useGetBookingAnalysis from '../../hooks/useListBookingAnalysis';

import BookingAnalysisHeading from './BookingAnalysisHeading';
import RenderView from './RenderView';
import styles from './styles.module.css';

function BookingAnalysis({ headerFilters = {} }) {
	const {
		bookingAnalysis,
		loading,
		setParams,
		params,
		selectedFilterTab,
		setSelectedFilterTab,
	} = useGetBookingAnalysis(headerFilters);

	const { months_considered = [], max_etd = '' } = bookingAnalysis || {};

	const renderBookingData = () => {
		if (loading) {
			return <LoadingPage className={styles.loading} />;
		}

		if (!bookingAnalysis) {
			return <Empty />;
		}

		return (
			<RenderView
				loading={loading}
				selectedFilterTab={selectedFilterTab}
				setSelectedFilterTab={setSelectedFilterTab}
				setFilters={setParams}
				filters={params}
				maxEtd={max_etd}
				data={months_considered}
				headerFilters={headerFilters}
				bookingAnalysis={bookingAnalysis}
			/>
		);
	};

	return (
		<div className={styles.card_wrapper}>
			<BookingAnalysisHeading
				setParams={setParams}
				params={params}
				loading={loading}
				selectedFilterTab={selectedFilterTab}
				setSelectedFilterTab={setSelectedFilterTab}
				heading="Booking Analysis"
			/>
			{renderBookingData()}
		</div>
	);
}

export default BookingAnalysis;
