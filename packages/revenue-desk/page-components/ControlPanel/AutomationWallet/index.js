import { Button, Select, Pagination, Placeholder } from '@cogoport/components';
import React, { useState } from 'react';

import {
	serviceOptions, VALUE_FIVE, VALUE_FOUR, VALUE_ONE, VALUE_THREE, VALUE_TWO, VALUE_ZERO, VALUE_TEN, SRC,
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
				/>

				<Button
					size="md"
					themeType="accent"
					onClick={() => setCreateWallet(!createWallet)}
				>
					Create New Wallet
				</Button>
			</div>

			{loading
				&& (
					[VALUE_ONE, VALUE_TWO, VALUE_THREE, VALUE_FOUR, VALUE_FIVE]?.map((key) => (
						<Placeholder
							height="50px"
							width="1250px"
							key={key}
							style={{ margin: '10px' }}
						/>
					))
				)}

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
