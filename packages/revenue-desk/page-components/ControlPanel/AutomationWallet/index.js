import { Button, Select, Pagination } from '@cogoport/components';
import React, { useState } from 'react';

import LoaderDetails from '../../common/Loader';
import {
	serviceOptions, VALUE_ONE, VALUE_ZERO, VALUE_TEN, SRC,
} from '../../constants';
import useListRevenueDeskWallet from '../hooks/useListRevenueDeskWallet';

import CreateWallet from './CreateWallet';
import AutomationWalletDetails from './Details';
import styles from './styles.module.css';

function AutomationWallet() {
	const [createWallet, setCreateWallet] = useState(false);
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
					style={{ width: '200px' }}
				/>

				<Button
					size="md"
					themeType="accent"
					onClick={() => setCreateWallet(!createWallet)}
				>
					Create New Wallet
				</Button>
			</div>

			{loading && <LoaderDetails />}

			{!loading && (
				<div>
					{data?.list?.length === VALUE_ZERO ? (
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
									<AutomationWalletDetails data={val} refetch={refetch} />
								</div>
							))}
							{(data?.total_count || VALUE_ZERO) > VALUE_TEN ? (
								<div className={styles.pagination_container}>
									<Pagination
										type="table"
										totalItems={data?.total_count || VALUE_ZERO}
										currentPage={page || VALUE_ONE}
										pageSize={data?.page_limit}
										onPageChange={setPage}
									/>
								</div>
							) : null}
						</div>
					)}
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
