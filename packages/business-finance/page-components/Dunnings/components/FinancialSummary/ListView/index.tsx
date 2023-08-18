import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import List from '../../../../commons/List';
import useSendMail from '../hooks/useSendMail';

import config from './config';
import listFunctions from './listFunctions';
import styles from './styles.module.css';

const DEFAULT_PAGE_INDEX = 1;

interface Props {
	filters?: {
		search?: string;
		pageIndex?: number;
	};
	setFilters?: Function;
	data?: {
		list: object[];
	};
	loading?: boolean;
}

function ListView({ filters = {}, setFilters = () => {}, data = { list: [] }, loading = false }:Props) {
	const { sendMail, mailSendLoading } = useSendMail();

	return (
		<div>
			<div className={styles.search_container}>
				<div>
					<Input
						name="q"
						size="sm"
						value={filters?.search}
						onChange={(e) => setFilters((prev) => ({ ...prev, search: e }))}
						placeholder="Search By Customer Name"
						suffix={(
							<div style={{ margin: '4px', display: 'flex' }}>
								<IcMSearchlight height={15} width={15} />
							</div>
						)}
					/>

				</div>
			</div>
			<div>
				<List
					config={config}
					itemData={data}
					functions={listFunctions({ sendMail, mailSendLoading })}
					loading={loading}
					page={filters.pageIndex || DEFAULT_PAGE_INDEX}
					handlePageChange={(pageValue) => {
						setFilters((prev:object) => ({
							...prev,
							pageIndex: pageValue,
						}));
					}}
					showPagination
				/>
			</div>
		</div>
	);
}

export default ListView;
