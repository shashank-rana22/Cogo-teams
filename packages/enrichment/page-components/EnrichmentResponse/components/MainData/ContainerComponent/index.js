import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import CreateResponse from './components/CreateResponse';
import Header from './components/Header';
import List from './components/List';
import styles from './styles.module.css';

function ContainerComponent({
	list = [],
	refetchResponses = () => {},
	loadingResponses = false,
	actionType = '',
	activeTab = '',
	paginationData = {},
	getNextPage = () => {},
}) {
	const [showForm, setShowForm] = useState(false);

	const { page, page_limit, total_count } = paginationData || {};

	return (
		<div className={styles.padd}>

			<div className={styles.main}>
				<Header
					activeTab={activeTab}
					actionType={actionType}
					setShowForm={setShowForm}
					loadingResponses={loadingResponses}
				/>

				<List
					list={list}
					activeTab={activeTab}
					loadingResponses={loadingResponses}
				/>

				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						pageSize={page_limit}
						totalItems={total_count}
						onPageChange={getNextPage}
					/>
				</div>

				<CreateResponse
					showForm={showForm}
					activeTab={activeTab}
					setShowForm={setShowForm}
					refetchResponses={refetchResponses}
				/>

			</div>
		</div>
	);
}

export default ContainerComponent;
