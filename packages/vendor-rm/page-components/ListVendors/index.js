import { Popover, Input, Pagination, Button, Toggle } from '@cogoport/components';
import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import { IcMFilter } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty, upperCase } from '@cogoport/utils';
import { useState } from 'react';

import FilterContent from './FilterContent';
import Header from './Header';
import useListCogoEntities from './hooks/useListCogoEntities';
import useVendorList from './hooks/useVendorList';
import useVendorStats from './hooks/useVendorStats';
import KycStatusTabs from './KycStatusTabs';
import styles from './styles.module.css';
import TabularSection from './TabularSection';

function ListVendors() {
	const router = useRouter();

	const { entityLoading, entityData = [] } = useListCogoEntities();
	const entityDataCount = entityData.length;

	const defaultEntity = ENTITY_MAPPING[301].id;

	const [activeEntity, setActiveEntity] = useState(defaultEntity);
	const [active, setActive] = useState(true);
	const {
		loading,
		data = {},
		params = {},
		setParams = () => {},
		columns,
		showFilter,
		setShowFilter,
		searchValue,
		handleChangeQuery,
		isFilterInUse,
	} = useVendorList({ activeEntity, active });

	const {
		data: dataStats,
	} = useVendorStats({ activeEntity });

	const { total_count, page_limit: pageLimit } = data || {};

	const ENTITY_OPTIONS = (entityData || []).map((item) => {
		const {
			business_name: companyName = '',
			id = '',
			entity_code: entityCode = '',
		} = item || {};

		return {
			label : `${upperCase(companyName)} (${entityCode})`,
			value : id,
		};
	});

	const { list = [] } = data;

	return (
		<>
			<Header
				activeEntity={activeEntity}
				setActiveEntity={setActiveEntity}
				entityOptions={ENTITY_OPTIONS}
				entityDataCount={entityDataCount}
				entityLoading={entityLoading}
			/>

			<KycStatusTabs
				params={params}
				setParams={setParams}
				dataStats={dataStats}
			/>

			<div className={styles.group}>
				<div className={styles.heading}>
					<h3 className={styles.title}>All Vendors</h3>
				</div>

				<div className={styles.actions_container}>
					<Toggle
						offLabel="Active"
						onLabel="In Active"
						size="sm"
						onChange={() => setActive(!active)}
						showOnOff
						value={active}
					/>
					<Popover
						theme="light"
						placement="bottom"
						visible={showFilter}
						content={(
							<FilterContent
								setParams={setParams}
								setShowFilter={setShowFilter}
							/>

						)}
						interactive
					>
						<div
							role="presentation"
							className={styles.filter_container}
							onClick={() => setShowFilter(!showFilter)}
						>
							{
								isFilterInUse ? (
									<div className={styles.filter_in_use} />
								) : null
							}
							<p className={styles.text}>Filter</p>
							<IcMFilter style={{ margin: '2px 2px 2px 4px' }} />
						</div>
					</Popover>

					<div className={styles.input_wrapper}>
						<Input
							size="md"
							value={searchValue}
							onChange={(value) => handleChangeQuery(value)}
							placeholder="Search by PAN / GST / Business Name..."
						/>
					</div>

					<div className={styles.button_container}>
						<Button
							size="lg"
							role="presentation"
							type="button"
							onClick={() => router.push('/onboard-vendor')}
							themeType="primary"
						>
							Add New Vendor
						</Button>
					</div>
				</div>

			</div>

			<TabularSection
				loading={loading}
				data={list}
				columns={columns}
			/>

			{!isEmpty(list) && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={params?.page}
						totalItems={total_count}
						pageSize={pageLimit}
						onPageChange={(value) => setParams((pv) => ({
							...pv,
							page: value,
						}))}
					/>
				</div>
			)}

		</>
	);
}

export default ListVendors;
