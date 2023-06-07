import React from 'react';

import SearchCard from './SearchCard';
import styles from './styles.module.css';

function ManageBpr() {
	return (
		<div>
			<SearchCard />
			<div className={styles.SearchBox}>
				<div>
					<Input
						prefix={(
							<IcMSearchdark
								style={{ width: '20px', height: '20px', marginTop: '5px' }}
							/>
						)}
						suffix={(
							<IcMCross
								onClick={() => onQueryChange('')}
								style={{ cursor: 'pointer', marginTop: '5px' }}
							/>
						)}
						style={{ marginRight: '10px', height: '30px' }}
						onChange={(e) => {
							setPagination(1);
							onQueryChange(e.target.value);
						}}
						value={searchQuery}
						placeholder="Search"
						type="text"
						size="lg"
					/>
				</div>
			</div>
			<BprList list={bprData?.list} bprLoading={bprLoading} refetch={refetch} />

			<Pagination
				className="xl"
				pageRange={bprData?.totalPages}
				pageLimit={10}
				total={bprData?.totalRecords}
				pagination={pagination}
				setPagination={setPagination}
			/>
		</div>
	);
}

export default ManageBpr;
