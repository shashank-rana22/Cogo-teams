import { Pagination, Modal } from '@cogoport/components';
import { useState } from 'react';

import DetailsForm from './components/DetailsForm';
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
	const [detailsForm, setDetailsForm] = useState({});

	const { page, page_limit, total_count } = paginationData || {};

	return (
		<div className={styles.padd}>

			<div className={styles.main}>
				<Header
					activeTab={activeTab}
					actionType={actionType}
					setDetailsForm={setDetailsForm}
					loadingResponses={loadingResponses}
				/>

				<List
					list={list}
					activeTab={activeTab}
					actionType={actionType}
					setDetailsForm={setDetailsForm}
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

				{detailsForm?.show && (
					<Modal
						size="md"
						show={detailsForm?.show}
						placement="center"
						onClose={() => setDetailsForm({})}
					>
						{activeTab && (
							<DetailsForm
								detailsForm={detailsForm}
								setDetailsForm={setDetailsForm}
								activeTab={activeTab}
								refetchResponses={refetchResponses}
							/>
						)}
					</Modal>
				)}

			</div>
		</div>
	);
}

export default ContainerComponent;
