import { Button, Input, Popover, Tooltip } from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';
import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';
import { IcMRefresh, IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import Filter from '../../../commons/Filters';
import { amountCollectionFilters } from '../../configurations/on-account-collections/accountCollectionFilter';
import { MORE_FILTERS_AMOUNT_COLLECTION } from
	'../../configurations/on-account-collections/moreFilterAccountCollection';
import useAccountCollection from '../../hooks/useAccountCollection';

import CustomTable from './common/CustomTable';
import Header from './Header';
import styles from './styles.module.css';

const searchPlaceholder = 'Search by Customer Name / UTR No /Doc. Value';

function OnAccountCollection() {
	const [sort, setSort] = useState({});
	const { control, watch } = useForm();
	const entityType = watch('entityCode');
	const currencyType = watch('currency');
	const {
		data,
		globalFilters,
		setGlobalFilters,
		loading,
		clearFilters,
		refetch,
	} = useAccountCollection({ sort, entityType, currencyType });

	const onPageChange = (val:number) => {
		setGlobalFilters((prev) => ({ ...prev, page: val }
		));
	};

	const { accMode = '', search = '' } = globalFilters || {};

	const content = () => (
		<div className={styles.content_filter}>
			<AsyncSelectController
				control={control}
				name="currency"
				options={getCurrencyOptions()}
				placeholder="Select Currency"
			/>
			<Filter
				controls={MORE_FILTERS_AMOUNT_COLLECTION}
				filters={globalFilters}
				setFilters={setGlobalFilters}
			/>
		</div>
	);

	return (
		<div>
			<Header refetch={clearFilters} loading={loading} />

			<div className={styles.container}>
				<div className={styles.filter_data}>
					<div className={styles.filter_amount_collection}>
						<AsyncSelectController
							control={control}
							name="entityCode"
							asyncKey="list_cogo_entity"
							placeholder="Entity"
						/>
						<Filter
							controls={amountCollectionFilters({
								accMode,
							})}
							filters={globalFilters}
							setFilters={setGlobalFilters}
						/>
					</div>

					<div className={styles.filter_search_more_filters}>
						<Popover
							placement="bottom"
							render={content()}
						>
							<Button themeType="secondary" size="md">
								<div className={styles.more_filter_div}>
									+ More Filters
								</div>
							</Button>
						</Popover>

						<div>
							<Tooltip
								placement="top"
								content="RELOAD"
							>
								<Button
									themeType="secondary"
									onClick={() => refetch()}
									disabled={loading}
								>
									<IcMRefresh className={styles.icon_color} />
								</Button>
							</Tooltip>
						</div>

						<div className={styles.filter_search}>
							<Input
								name="q"
								size="sm"
								value={search}
								onChange={(e: any) => setGlobalFilters((prev) => ({ ...prev, search: e }))}
								placeholder={searchPlaceholder}
								suffix={(
									<div className={styles.icon_div}>
										<IcMSearchlight height={15} width={15} />
									</div>
								)}
							/>
						</div>
					</div>
				</div>

				<CustomTable data={data} onPageChange={onPageChange} refetch={refetch} loading={loading} />
			</div>

		</div>
	);
}
export default OnAccountCollection;
