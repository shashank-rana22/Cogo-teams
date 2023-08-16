import { Select, Input, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState, useEffect } from 'react';

import useGetColumns from '../../common/Columns';
import CustomTable from '../../common/CustomTable';
import UpdateResource from '../UpdateResource';

import styles from './styles.module.css';
import useListResources from './useListResources';

const statusOptions = [{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }];

function ListResources() {
	const router = useRouter();
	const [updateResource, setUpdateResource] = useState({});
	const [searchState, setSearchState] = useState('');
	const [status, setStatus] = useState('active');

	const { query = '', debounceQuery } = useDebounceQuery();

	const {
		data = {}, loading = false, setPage, params,
		setRefetch,
	} = useListResources({ searchState: query, status });

	const { list = [], pagination_data = {} } = data;
	const { total_count = 0 } = pagination_data;

	const columns = useGetColumns({ setUpdateResource });

	const routeToAddPage = () => {
		router.push('/resources/create');
	};

	useEffect(() => {
		debounceQuery(searchState);
	}, [searchState, debounceQuery]);

	if (updateResource.id) {
		return (
			<UpdateResource
				resource={updateResource}
				setUpdateResource={setUpdateResource}
				setRefetch={setRefetch}
			/>
		);
	}

	return (
		<>
			<div className={styles.header}>
				<div>
					Resources
				</div>

				<Button onClick={() => routeToAddPage()}>
					<IcMPlus style={{ marginRight: '4px' }} />
					Create New
				</Button>
			</div>

			<div className={styles.filter_container}>
				<Input
					placeholder="Search by name/display_name"
					value={searchState}
					onChange={setSearchState}
					style={{ marginRight: '8px' }}
				/>
				<Select placeholder="Status" onChange={setStatus} value={status} options={statusOptions} />
			</div>

			<CustomTable
				columns={columns}
				list={list}
				pagination={params.page}
				setPagination={setPage}
				page_limit={params.page_limit}
				total_count={total_count}
				loading={loading}
			/>
		</>
	);
}

export default ListResources;
