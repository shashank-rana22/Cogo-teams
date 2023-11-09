import { Pagination, Placeholder, cl } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import getUsagesConfig from '../../../../../../configuration/usagesConfig';
import useGetUsages from '../../../../../../hooks/useGetUsages';
import getValues from '../../../../../../utils/getValues';
import itemFunction from '../../../../../../utils/itemFunctions';
import EmptyState from '../../EmptyState';

import styles from './styles.module.css';

function Usages({ info = {}, currentTab = '' }) {
	const usageConfig = getUsagesConfig();

	const { loading, data, setPage } = useGetUsages({ info, currentTab });

	const { order_history = [], page, total_count, page_limit } = data || {};

	const list = loading ? [...Array(5).keys()] : order_history;

	if (isEmpty(order_history)) {
		return (
			<EmptyState currentTab={currentTab} />
		);
	}

	return (
		<>
			<div className={styles.table_container}>
				<div className={cl`${styles.header} ${styles.flex_box}`}>
					{usageConfig.map((config) => (
						<div
							key={config.key}
							className={cl`${styles.col} ${styles[config?.key]}`}
						>
							{startCase(config.label)}

						</div>
					))}
				</div>

				<div className={styles.scroll_container}>

					{(list || []).map((usage) => (
						<div key={usage?.id || usage} className={styles.flex_box}>

							{usageConfig.map((config) => (
								<div
									key={config.key}
									className={cl`${styles.col} ${styles[config?.key]}`}
								>
									{loading
										? <Placeholder />
										: getValues({
											itemData: usage,
											config,
											itemFunction,
										})}
								</div>
							))}
						</div>
					))}
				</div>
			</div>

			<div
				className={styles.flex_box}
				style={{ justifyContent: 'center' }}
			>
				<Pagination
					type="number"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPage}
				/>
			</div>
		</>
	);
}

export default Usages;
