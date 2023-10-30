import { Toast } from '@cogoport/components';
import { useRequest, useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateJob = ({
	query,
	setShowButton,
	showButton,
	setShowFinal,
	showFinal,
}) => {
	const { shipmentId, jobNumber, jobSource, jobType } = query || {};

	const { user_data: userData } = useSelector(({ profile }) => ({
		user_data: profile?.user || {},
	}));

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_shipment',
			method : 'post',
		},
		{ manual: true },
	);

	const [{ loading: FinalLoading }, FinalTrigger] = useRequestBf(
		{
			url     : '/common/job/close-financially',
			method  : 'post',
			authKey : 'post_common_job_close_financially',
		},
		{ manual: true },
	);

	const getFinalData = async () => {
		try {
			await FinalTrigger({
				data: {
					jobNumber,
					jobType,
					jobSource,
					updatedBy: userData?.user?.id,
				},
			});
			setShowFinal(!showFinal);
			Toast.success('Close successfully...');
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	};
	const getData = async (data) => {
		const jobClose = () => {
			if (data === 'Undo') {
				return false;
			}
			return true;
		};

		try {
			await trigger({
				data: {
					id            : shipmentId,
					is_job_closed : jobClose(),
				},
			});
			Toast.success('Close successfully...');
			setShowButton(!showButton);
		} catch (error) {
			Toast.error(error?.response?.data?.message);
		}
	};

	return { getData, getFinalData, FinalLoading, loading };
};

export default useUpdateJob;
