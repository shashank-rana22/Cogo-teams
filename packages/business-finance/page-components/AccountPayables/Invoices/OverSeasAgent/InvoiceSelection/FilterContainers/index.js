import { Button, Input } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React from 'react';

import Filter from '../../../../../commons/Filters/index.tsx';
import { invoiceFilters } from '../../../configurations/index';
import FilterModal from '../../../MoreFilters/index';

import styles from './styles.module.css';

function FilterContainers({
	filters = '',
	setFilters = () => {},
	goBack = () => {},
	resetPage = () => {},
	active = '',
	showHeader = '',
	setShowHeader = () => {},
	viewSelectedInvoice = false,
	onClear = () => {},
	filterClear = [],
}) {
	return (
		<div className={styles.filters}>
			{!viewSelectedInvoice && (
				<div className={styles.filtercontainer}>
					<Filter controls={invoiceFilters} filters={filters} setFilters={setFilters} />
					<FilterModal
						type="createpayrun"
						filters={filters}
						setFilters={setFilters}
						filterLength={5}
						onClear={onClear}
						filterClear={filterClear}
					/>
				</div>
			)}

			<div className={styles.search_filter}>
				<div className={styles.search}>
					<Input
						name="search"
						size="sm"
						value={filters?.search || ''}
						onChange={(val) => setFilters((prevFilters) => ({
							...prevFilters,
							search    : val,
							pageIndex : 1,
						}))}
						placeholder="Search By Name/Invoice Number/Sid"
						suffix={(
							<div style={{ margin: '4px', display: 'flex' }}>
								<IcMSearchdark height={15} width={15} />
							</div>
						)}
					/>

					<Button
						themeType="accent"
						onClick={() => {
							goBack();
							resetPage();
							setShowHeader(true);
						}}
						style={{ width: '100px', margin: '0px 10px', height: '40px' }}
						disabled={active !== 'invoice_selection' || showHeader}
					>
						Go Back
					</Button>
				</div>
			</div>
		</div>
	);
}

export default FilterContainers;
