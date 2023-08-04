import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../commons/toastApiError.ts';

const useLedgerDownload = ({ date, entities, item, setShowLedgerModal }) => {
	const { profile } = useSelector((state) => state || {});

	const { startDate, endDate } = date || {};
	const { businessName, organizationId } = item;

	const convertDate = (dateToConvert) => formatDate({
		date       : dateToConvert,
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		formatType : 'date',
	});

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
			const { data: downloadUrl } = response || {};
			window.open(downloadUrl);
			setShowLedgerModal(false);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		downloadLedger,
		loading,
		data,
	};
};

export default useLedgerDownload;
