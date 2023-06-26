import { Input } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import List from '../../../../commons/List/index.tsx';
import showOverflowingNumber from '../../../../commons/showOverflowingNumber.tsx';

import config from './config';
import styles from './styles.module.css';

const TEXT_LIMIT_NUM = 20;
const DEFAULT_PAGE_INDEX = 1;

function ListView({ filters, setFilters, data, loading }) {
	const functions = {
		renderName: ({ tradePartyDetailName }) => (
			<div>{showOverflowingNumber(tradePartyDetailName, TEXT_LIMIT_NUM)}</div>
		),
		renderOutstandingAmount: ({ outstandingAmount, ledCurrency }) => (
			<div>
				{formatAmount({
					amount   : outstandingAmount,
					currency : ledCurrency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						minimumFractionDigits : 2,
					},
				})}
			</div>
		),
		renderOnAccount: ({ onAccountAmount, ledCurrency }) => (
			<div>
				{formatAmount({
					amount   : onAccountAmount,
					currency : ledCurrency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						minimumFractionDigits : 2,
					},
				})}
			</div>
		),
		renderCreditController: ({ organizationStakeholderName }) => (
			<div>{organizationStakeholderName || '-'}</div>
		),
	};
	return (
		<div>
			<div className={styles.search_container}>
				<div>
					<Input
						name="q"
						size="sm"
						value={filters?.search}
						onChange={(e) => setFilters({ ...filters, search: e })}
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
					functions={functions}
					loading={loading}
					page={filters.pageIndex || DEFAULT_PAGE_INDEX}
					handlePageChange={(pageValue) => {
						setFilters((p) => ({
							...p,
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
