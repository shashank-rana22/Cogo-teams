import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useState, useEffect } from 'react';

const FORMAT = "UTC:yyyy-MM-dd'T'HH:mm:ssZZ";
const useGetData = ({ setCurrentPage, setCarrierList, setFilters, carrierList }) => {
	const [durationValue, onChange] = useState(GLOBAL_CONSTANTS.zeroth_index);
	const [departureDate, setDepartureDate] = useState({});
	const [arrivalDate, setArrivalDate] = useState({});
	const [filterCarrier, setFilterCarrier] = useState([]);

	const { reset, control } = useForm();

	const transitFilter = durationValue !== GLOBAL_CONSTANTS.zeroth_index ? durationValue : '';

	useEffect(() => {
		if (
			filterCarrier.length > GLOBAL_CONSTANTS.zeroth_index
            || Object.keys(departureDate).length
            || Object.keys(arrivalDate).length
            || durationValue
		) {
			const airFilter = {
				airline_id      : filterCarrier,
				departure_start : departureDate.startDate !== undefined
					? formatDate({
						date       : departureDate?.startDate,
						dateFormat : FORMAT,
						formatType : 'date',
					}) : null,
				departure_end: departureDate?.endDate !== undefined
					? formatDate({
						date       : departureDate?.endDate,
						dateFormat : FORMAT,
						formatType : 'date',
					}) : null,
				arrival_start: arrivalDate?.startDate !== undefined
					? formatDate({
						date       : arrivalDate?.startDate,
						dateFormat : FORMAT,
						formatType : 'date',
					}) : null,
				arrival_end: arrivalDate?.endDate !== undefined
					? formatDate({
						date       : arrivalDate?.endDate,
						dateFormat : FORMAT,
						formatType : 'date',
					}) : null,
				transit_time: transitFilter,
			};
			setCurrentPage(GLOBAL_CONSTANTS.one);
			setFilters(airFilter);
		}
	}, [filterCarrier.length, departureDate,
		arrivalDate, durationValue, filterCarrier, transitFilter, setFilters, setCurrentPage]);
	useEffect(() => {
		if (carrierList) {
			const carriers = carrierList.filter((x) => x.status);
			setFilterCarrier(
				carriers.length
					? carriers.map((x) => x.airLineId)
					: carrierList.map((x) => x.airLineId),
			);
		}
	}, [carrierList]);

	const handleCheckList = (item, value) => {
		if (value === 'carrier') {
			setCarrierList((prevCarrier) => prevCarrier.map((valueLocal) => (valueLocal.id === item.id
				? { ...valueLocal, status: !valueLocal.status }
				: valueLocal)));
		}
	};

	const clearAllHandler = () => {
		setCarrierList((prevCarrier) => prevCarrier.map((value) => (value.status === true
			? { ...value, status: !value.status } : value)));
		setDepartureDate({});
		setArrivalDate({});
		setFilterCarrier({});
		onChange(GLOBAL_CONSTANTS.zeroth_index);
		setFilters({});
		reset();
	};

	return {
		handleCheckList,
		clearAllHandler,
		control,
		departureDate,
		onChange,
		durationValue,
		arrivalDate,
		setArrivalDate,
		setDepartureDate,
	};
};
export default useGetData;
