import { Toast, Button } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import useIrisRequest from '@cogoport/request/hooks/useIrisRequest';

import useGetColumns from '../../../common/Columns';
import Filters from '../../../common/Filters';
import UserTableData from '../../../common/UserTableData';
import feedbackDataColumns from '../../../constants/feedback-data-columns';
import useGetOrganizationTree from '../useGetOrganizatioonTree';

import styles from './styles.module.css';

function ListView({ viewType = false }) {
	const {
		treeData = {}, loading = false,
		params = {},
		setParams = () => {},
		setPage = () => {},
		refetchList,
	} = useGetOrganizationTree({ viewType });

	const [{ loading: downloadLoading = false }, trigger] = useIrisRequest({
		url    : 'get_iris_download_employee_csv',
		method : 'get',
	}, { manual: true });

	const downloadCsv = async () => {
		try {
			const response = await trigger();
			Toast.success('File Downloaded Successfully');

			if (response.data?.url) { window.open(response.data.url, '_blank'); }
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
	};

	const { list = [], pagination_data = {} } = treeData;
	const { total_count = '' } = pagination_data;

	const columnsToShow = feedbackDataColumns.employeeList;
	const columns = useGetColumns({ columnsToShow, refetchList });

	return (
		<>
			<div className={styles.download_csv}>
				<Button
					size="md"
					onClick={() => { downloadCsv(); }}
					style={{ marginTop: '6px' }}
					disabled={downloadLoading || loading}
				>
					<IcMDownload />
					Master CSV
				</Button>
			</div>

			<div className={styles.filters}>
				<Filters params={params} setParams={setParams} source="employee_directory_list" />
			</div>

			<UserTableData
				columns={columns}
				list={list}
				setPagination={setPage}
				pagination={params.Page}
				page_limit={params.PageLimit}
				total_count={total_count}
				loading={loading}
			/>
		</>
	);
}

export default ListView;
