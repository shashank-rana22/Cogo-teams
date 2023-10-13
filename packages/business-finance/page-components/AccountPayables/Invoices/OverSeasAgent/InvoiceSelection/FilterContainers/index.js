import { Button, Input } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React from 'react';

import Filter from '../../../../../commons/Filters/index';
import { invoiceFilters } from '../../../configurations/index';
import FilterModal from '../../../MoreFilters/index';

import styles from './styles.module.css';

function FilterContainers({
	filters = '',
	setFilters = () => {},
	goBack = () => {},
	setShowHeader = () => {},
	viewSelectedInvoice = false,
	onClear = () => {},

}) {
	return (
		<div className={styles.filters}>
			{!viewSelectedInvoice ? (
				<div className={styles.filtercontainer}>
					<Filter controls={invoiceFilters} filters={filters} setFilters={setFilters} />
					<FilterModal
						type="createpayrun"
						filters={filters}
						setFilters={setFilters}
						filterLength={5}
						onClear={onClear}
					/>
				</div>
			) : null}

			<div className={styles.search_filter}>
				<Input
					name="search"
					size="sm"
					className={styles.search}
					value={filters?.search || ''}
					onChange={(val) => setFilters((prevFilters) => ({
						...prevFilters,
						search    : val,
						pageIndex : 1,
					}))}
					placeholder="Search By Name/Invoice Number/Sid"
					suffix={(
						<div className={styles.icon}>
							<IcMSearchdark height={15} width={15} />
						</div>
					)}
				/>

				<Button
					themeType="accent"
					onClick={() => {
						goBack();
						onClear();
						setShowHeader(true);
					}}
					className={styles.go_back_button}
					style={{ width: '100px', margin: '0px 10px', height: '40px' }}
				>
					Go Back
				</Button>
			</div>
		</div>
	);
}

export default FilterContainers;
