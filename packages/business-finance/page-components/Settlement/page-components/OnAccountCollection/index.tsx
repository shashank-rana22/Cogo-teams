import { Button, Input, Popover, Tooltip } from '@cogoport/components';
import {
	AsyncSelectController,
	SelectController,
	useForm,
} from '@cogoport/forms';
import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';
import { IcMRefresh, IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import Filter from '../../../commons/Filters';
import { amountCollectionFilters } from '../../configurations/on-account-collections/accountCollectionFilter';
import { MORE_FILTERS_AMOUNT_COLLECTION }
	from '../../configurations/on-account-collections/moreFilterAccountCollection';
import useAccountCollection from '../../hooks/useAccountCollection';
import usePostToSageBulk from '../../hooks/usePostToSageBulk';

import CustomTable from './common/CustomTable';
import Confirmation from './Confirmation';
import Header from './Header';
import styles from './styles.module.css';

const SEARCH_PLACEHOLDER = 'Search by Customer Name / UTR No /Doc. Value';

function OnAccountCollection({ entity }) {
	const {
		control,
		watch,
		formState: { errors = {} },
	} = useForm();
	const entityType = watch('entityCode');
	const currencyType = watch('currency');
	const {
		data,
		globalFilters,
		setGlobalFilters,
		loading,
		clearFilters,
		refetch,
	} = useAccountCollection({ entityType, currencyType });
	const [checkedRows, setCheckedRows] = useState([]);
	const [showConfirm, setShowConfirm] = useState(false);

	const { post, loading: postloading } = usePostToSageBulk({
		refetch, setShowConfirm,
	});

	console.log('entityentity', entity);

	const onPageChange = (val: number) => {
		setGlobalFilters((prev) => ({ ...prev, page: val }));
	};

	const bulkPost = () => {
		post(checkedRows?.filter((value, index, array) => array.indexOf(value) === index));
	};

	const { accMode = '', search = '' } = globalFilters || {};

	const content = (
		<div className={styles.content_filter}>
			<SelectController
				control={control}
				name="currency"
				options={getCurrencyOptions()}
				placeholder="Select Currency"
				rules={{ required: true }}
				isClearable
			/>
			{errors?.currency ? (
				<div className={styles.errors}>* Required</div>
			) : null}
			<Filter
				controls={MORE_FILTERS_AMOUNT_COLLECTION}
				filters={globalFilters}
				setFilters={setGlobalFilters}
			/>
		</div>
	);

	return (
		<div>
			<Header refetch={clearFilters} control={control} />

			<div className={styles.container}>
				<div className={styles.filter_data}>
					<div className={styles.filter_amount_collection}>
						<AsyncSelectController
							control={control}
							name="entityCode"
							asyncKey="list_cogo_entity"
							renderLabel={(item) => `${item?.entity_code} - ${item?.business_name}`}
							placeholder="Select Entity"
							labelKey="entity_code"
							value={entity}
							initialCall
							rules={{ required: true }}
							isClearable
							isSingleEntity
						/>
						{errors?.entityCode ? (
							<div className={styles.errors}>* Required</div>
						) : null}
						<Filter
							controls={amountCollectionFilters({
								accMode,
							})}
							filters={globalFilters}
							setFilters={setGlobalFilters}
						/>
					</div>

					<div className={styles.filter_search_more_filters}>
						<Popover placement="bottom" render={content}>
							<Button themeType="secondary" size="md">
								<div className={styles.more_filter_div}>
									+ More Filters
								</div>
							</Button>
						</Popover>
						<div>
							<Tooltip placement="top" content="RELOAD">
								<Button
									themeType="secondary"
									onClick={() => refetch()}
									disabled={loading}
								>
									<IcMRefresh className={styles.icon_color} />
								</Button>
							</Tooltip>
						</div>

						<Button
							onClick={() => {
								setShowConfirm(true);
							}}
							disabled={isEmpty(checkedRows)}
						>
							Bulk Post
						</Button>
						<Button
							onClick={() => {
								setCheckedRows([]);
							}}
						>
							Reset
						</Button>

						<div className={styles.filter_search}>
							<Input
								name="q"
								size="sm"
								value={search}
								onChange={(val: string) => setGlobalFilters((prev) => ({
									...prev,
									search: val,
								}))}
								placeholder={SEARCH_PLACEHOLDER}
								suffix={(
									<div className={styles.icon_div}>
										<IcMSearchlight
											height={15}
											width={15}
										/>
									</div>
								)}
							/>
						</div>
					</div>
				</div>

				<Confirmation
					showConfirm={showConfirm}
					setShowConfirm={setShowConfirm}
					bulkPost={bulkPost}
					checkedRows={checkedRows}
					loading={postloading}
				/>

				<CustomTable
					data={data}
					onPageChange={onPageChange}
					refetch={refetch}
					loading={loading}
					setGlobalFilters={setGlobalFilters}
					globalFilters={globalFilters}
					checkedRows={checkedRows}
					setCheckedRows={setCheckedRows}
				/>
			</div>
		</div>
	);
}

export default OnAccountCollection;
