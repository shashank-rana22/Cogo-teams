import { Placeholder, Pagination, Input } from '@cogoport/components';
import { IcMArrowRight, IcMTeam, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../../../common/EmptyState';

import styles from './styles.module.css';

function Locations({
	data = {}, setSelectedLocation = () => {},
	loading = false, setFilters = () => {},
	debounceQuery,
}) {
	const [searchQuery, setSearchQuery] = useState('');
	const { page, page_limit, total_count, list } = data || {};

	const onPageChange = (pageNumber) => {
		setFilters((prev) => ({
			...prev,
			page: pageNumber,
		}));
	};

	const handleSearch = (val) => {
		debounceQuery(val);
		setSearchQuery(val);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.above_text}>BRANCHES</div>
				<Input
					size="md"
					prefix={<IcMSearchlight />}
					placeholder="Search"
					onChange={(e) => handleSearch(e)}
					value={searchQuery}
					style={{ width: '200px' }}
				/>
			</div>
			<div className={styles.branches_container}>
				{isEmpty(list || []) ? <EmptyState /> : (list || []).map((item) => (
					loading ? <Placeholder height="50px" width="100%" margin="0px 0px 20px 0px" key={item.id} /> : (
						<div
							key={item.id}
							aria-hidden
							className={styles.card}
							onClick={() => setSelectedLocation(item.id)}
						>
							<div className={styles.card_container}>
								<div className={styles.card_content}>
									<div className={styles.left_card}>
										<div className={styles.location}>
											<span>{item.display_name}</span>
										</div>
									</div>
								</div>
								<div className={styles.arrow_section}>
									<div className={styles.below_text}>
										<IcMTeam />
										<span>{item.employee_count}</span>
									</div>
									<div><IcMArrowRight width={20} height={20} /></div>
								</div>
							</div>
						</div>
					)
				))}
			</div>
			{!isEmpty(list || [])	? (
				<div className={styles.pagination}>
					<Pagination
						type="compact"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={onPageChange}
					/>
				</div>
			) : null}
		</div>
	);
}

export default Locations;
