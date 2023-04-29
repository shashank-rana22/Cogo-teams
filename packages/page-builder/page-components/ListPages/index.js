import { Modal } from '@cogoport/components';

import useListPages from '../hooks/useListPages';

import CreateDndPage from './CreateDndPage';
import Header from './Header';
import ListTable from './ListTable';
import styles from './styles.module.css';

function ListPages() {
	const {
		showCreatePage,
		setShowCreatePage,
		columns,
		list,
		loading,
		paginationData,
		getNextPage,
		refetch,
		params,
		setParams,
		disabled,
		setSearchValue,
		searchValue,
		debounceQuery,
	} = useListPages();

	return (

		<div>

			<div className={styles.title}>Cogoport Page Builder</div>

			<div>
				<Header
					params={params}
					setParams={setParams}
					disabled={disabled}
					setSearchValue={setSearchValue}
					debounceQuery={debounceQuery}
					searchValue={searchValue}
					setShowCreatePage={setShowCreatePage}
				/>
			</div>

			<div>
				<ListTable
					columns={columns}
					list={list}
					loading={loading}
					paginationData={paginationData}
					getNextPage={getNextPage}
				/>
			</div>

			<Modal
				size="md"
				show={showCreatePage}
				placement="center"
				onClose={() => setShowCreatePage(false)}
			>
				<CreateDndPage
					setShowCreatePage={setShowCreatePage}
					showCreatePage={showCreatePage}
					refetch={refetch}
				/>
			</Modal>
		</div>

	);
}
export default ListPages;
