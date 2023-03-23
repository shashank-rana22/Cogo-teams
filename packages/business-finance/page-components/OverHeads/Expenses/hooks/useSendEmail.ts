import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useSendEmail = () => {
	const { profile	} = useSelector((state:any) => state);

	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/expense/send-email',
			method  : 'post',
			authKey : 'expense_send_email',
		},
		{ manual: true },
	);

	const sendMail = async ({ rowData }) => {
		console.log('rowData-', rowData);

		const {} = rowData || {};
		try {
			await trigger({
				data: {
					stakeholderId : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
					userId        : profile?.user?.id,
					approveLink   : 'sda.com',
					rejectLink    : 'as.co',
					vendorName    : 'Hello',
					category      : 'RENT',
					expenseDate   : '2022-09-28 07:57:47', // billdate
					payableAmount : '123', // maxPayoutallowed(recurring record) && grandtotal(nonRecurr)
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	return {
		sendMail,
		loading,
	};
};

export default useSendEmail;
