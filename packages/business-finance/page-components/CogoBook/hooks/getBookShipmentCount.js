import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useState } from 'react';

const useBookShipmentCount = ({ filters, setShowBookShipment }) => {
	const [bookShipmentValue, setBookShipmentValue] = useState(0);

	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const [
		{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/pnl/accrual/booking-jobs-count',
			method  : 'get',
			authKey : 'get_pnl_accrual_booking_jobs_count',
		},
		{ manual: true },
	);
	const [{ loading:bookShipmentConfirmLoading }, bookShipmentTrigger] = useRequestBf(
		{
			url     : '/pnl/accrual/book-billed-shipments',
			method  : 'post',
			authKey : 'post_pnl_accrual_book_billed_shipments',
		},
		{ manual: true },
	);

	const { year, month } = filters || {};
	const getShipmentCount = useCallback(async () => {
		try {
			const res = await trigger({
				params: {
					year          : year || undefined,
					month         : month || undefined,
					archiveStatus : 'BILLED',

				},
			});
			setBookShipmentValue(res?.data);
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	}, [year, month, trigger]);

	const bookShipmentConfirmData = async () => {
		try {
			const res = await bookShipmentTrigger({
				data: {
					jobListRequest: {
						year          : year || undefined,
						month         : month || undefined,
						archiveStatus : 'BILLED',
					},
					totalJobs   : bookShipmentValue,
					performedBy : userId,
				},
			});
			if (res?.data) {
				Toast.success(res?.data || 'Succesfully Booked');
			}
			setShowBookShipment(false);
		} catch (err) {
			if (err?.response?.data?.message) {
				Toast.error(err?.response?.data?.message);
			}
		}
	};
	useEffect(() => {
		getShipmentCount();
	}, [getShipmentCount]);

	return {
		getShipmentCount,
		bookShipmentValue,
		data,
		loading,
		bookShipmentConfirmLoading,
		bookShipmentConfirmData,
	};
};
export default useBookShipmentCount;
