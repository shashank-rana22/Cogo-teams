import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useLedgerDownload = ({ date, entities, item, setShowLedgerModal }) => {
	const { profile } = useSelector((state) => state || {});

	const { startDate, endDate } = date || {};
	const { businessName, organizationId } = item;

	const convertDate = (dateToConvert) => dateToConvert?.toISOString()?.replace('T', ' ');

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/report/ar-ledger',
			method  : 'get',
			authKey : 'get_payments_report_ar_ledger',
		},
		{ manual: true },
	);

	const downloadLedger = async () => {
		try {
			const response = await trigger({
				params: {
					orgId       : organizationId,
					startDate   : convertDate(startDate),
					endDate     : convertDate(endDate),
					orgName     : businessName,
					requestedBy : profile?.user?.id,
					entityCodes : entities,
				},
			});
			const { data:downloadUrl } = response || {};
			window.open(downloadUrl);
			setShowLedgerModal(false);
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		downloadLedger,
		loading,
		data,
	};
};

export default useLedgerDownload;
