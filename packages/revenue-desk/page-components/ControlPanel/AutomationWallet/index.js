import { Button, Select, Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import { serviceOptions } from '../../constants';
import useListRevenueDeskWallet from '../hooks/useListRevenueDeskWallet';

import CreateWallet from './CreateWallet';
import AutomationWalletDetails from './Details';
import styles from './styles.module.css';

function AutomationWallet() {
	const [createWallet, setCreateWallet] = useState(false);

	const SRC = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/folder-image-with-man';
	const ZERO_VALUE = 0;
	const ONE_VALUE = 1;
	const TEN_VALUE = 10;
	const {
		data, filters = {}, setFilter = () => {},
		refetch = () => {}, loading, page, setPage,
	} = useListRevenueDeskWallet();

	const onChange = (item, key) => {
		setFilter((prev) => ({ ...prev, [key]: item }));
	};

	return (
		<>
			<div className={styles.container}>
				<Select
					placeholder="Service Type"
					options={serviceOptions}
					value={filters?.service_type}
					onChange={(val) => onChange(val, 'service_type')}
					size="md"
				/>

				<Button
					size="md"
					themeType="accent"
					onClick={() => setCreateWallet(!createWallet)}
				>
					Create New Wallet
				</Button>
			</div>

			{data?.list?.length === ZERO_VALUE ? (
				<div className={styles.empty_icon}>
					<img
						src={SRC}
						alt="empty_page"
						height="50%"
						width="50%"
					/>
				</div>
			) : (
				<div>
					{data?.list?.map((val) => (
						<div key={val?.id}>
							<AutomationWalletDetails data={val} refetch={refetch} loading={loading} />
						</div>
					))}
					{(data?.total_count || ZERO_VALUE) > TEN_VALUE ? (
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								totalItems={data?.total_count || ZERO_VALUE}
								currentPage={page || ONE_VALUE}
								pageSize={data?.page_limit}
								onPageChange={setPage}
							/>
						</div>
					) : null}
				</div>
			)}

			{createWallet && (
				<CreateWallet
					createWallet={createWallet}
					setCreateWallet={setCreateWallet}
					refetch={refetch}
				/>
			)}
		</>
	);
}

export default AutomationWallet;
