import { Modal } from '@cogoport/components';

import useDNDPages from '../hooks/useDNDPages';

import CreateDndPage from './components/CreateDndPage';
import Header from './components/Header';
import List from './components/List';
import styles from './styles.module.css';

function DNDPages() {
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
	} = useDNDPages();

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
				<List
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
export default DNDPages;
