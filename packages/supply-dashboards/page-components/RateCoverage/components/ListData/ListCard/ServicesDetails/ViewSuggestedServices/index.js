import { Pagination } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import LoaderComponenet from './loader';
import styles from './styles.module.css';

function ViewSuggestedServices({
	listview = [],
	page = {},
	setPage = () => {},
	loading = false,
	showPopover = false,
	setShowPopover = () => {},
	setShowAddRateModal = () => {},
	setServiceIdPresent = () => {},
}) {
	const handleAddRate = (id) => {
		setServiceIdPresent(id);
		setShowPopover(!showPopover);
		setShowAddRateModal(true);
	};

	return (
		<div>
			<div className={styles.page}>
				{loading && <LoaderComponenet />}

				{!loading
				&& (
					<div>
						{(listview?.list || []).length
							? (
								<div>
									<div className={styles.suggested}>
										SUGGESTED SERVICE PROVIDERS
									</div>
									<div>
										{listview?.list.map((listItem) => (
											<div key={listItem?.id}>
												<div
													className={styles.item}
													role="presentation"
													onClick={() => {
														handleAddRate(listItem?.id);
													}}
												>
													{listItem?.business_name}
												</div>
											</div>
										))}
									</div>
								</div>
							)
							: (
								<div>
									<div>
										<div className={styles.no_service}>
											NO SERVICE PROVIDER FOUND
										</div>
										<div className={styles.apply_service}>
											Please apply for service expertise
										</div>
									</div>
									<div className={styles.icon}>
										<IcMSearchlight width="30px" height="30px" />
									</div>
								</div>
							) }
					</div>
				)}
				{listview?.total_count > 10 && (
					<Pagination
						type="number"
						currentPage={page}
						totalItems={listview?.total_count}
						pageSize={listview?.page_limit}
						onPageChange={setPage}
					/>

				)}
			</div>
		</div>
	);
}

export default ViewSuggestedServices;
