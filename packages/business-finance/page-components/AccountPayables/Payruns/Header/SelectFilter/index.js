import { TabPanel, Tabs, Toggle } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Filter from '../../../../commons/Filters/index';
import { INNER_TAB_MAPPING, TAB_NAME } from '../../constants';
import useGetEntityBanks from '../../hooks/useGetEntityBank';
import PayrunButtons from '../PayrunButtons/index';

import getChooseFilterControls from './GetChooseFilterControls';
import PaidInnerTab from './PaidInnerTab';
import SearchFilter from './SearchFilter';
import styles from './styles.module.css';

function SelectFilters({
	globalFilters = {},
	setGlobalFilters = () => {},
	isInvoiceView = false,
	activePayrunTab = '',
	setIsInvoiceView = () => {},
	overseasData = '',
	setOverseasData = () => {},
	selectedPayrun = null,
	setSelectedPayrun = () => {},
	checkedRow = null,
	setCheckedRow = () => {},
	itemData = {},
	activeEntity = '',
	refetch = () => {},
	selectedIds = [],
	setSelectedIds = () => {},
}) {
	const { query } = useRouter();

	const handleVersionChange = () => {
		window.location.href = `/${query.partner_id}/business-finance/account-payables/payruns`;
	};
	const { entityBank = [] } = useGetEntityBanks({});
	return (
		<div className={styles.sub_container}>
			<div className={styles.filter_container}>
				<div>
					{isEmpty(selectedPayrun)
						? (
							<div className={styles.filter}>
								{((TAB_NAME).includes(activePayrunTab))
									? (
										<Tabs themeType="tertiary" activeTab={overseasData} onChange={setOverseasData}>
											{INNER_TAB_MAPPING.map((tab) => (
												<TabPanel title={tab.title} name={tab.name} key={tab.name} />
											))}
										</Tabs>
									)
									: null}

							</div>
						)
						: null}
				</div>
				<div className={styles.filter}>
					<Toggle
						name="toggle"
						size="md"
						onLabel="Old"
						offLabel="New"
						onChange={handleVersionChange}
					/>

					<SearchFilter
						globalFilters={globalFilters}
						setGlobalFilters={setGlobalFilters}
						isInvoiceView={isInvoiceView}
						setIsInvoiceView={setIsInvoiceView}
						activePayrunTab={activePayrunTab}
						selectedPayrun={selectedPayrun}
					/>

					<PayrunButtons
						activePayrunTab={activePayrunTab}
						isInvoiceView={isInvoiceView}
						overseasData={overseasData}
						selectedPayrun={selectedPayrun}
						setSelectedPayrun={setSelectedPayrun}
						checkedRow={checkedRow}
						setCheckedRow={setCheckedRow}
						itemData={itemData}
						activeEntity={activeEntity}
						refetch={refetch}
						globalFilters={globalFilters}
						selectedIds={selectedIds}
						setSelectedIds={setSelectedIds}
					/>

				</div>
				<Filter
					filters={globalFilters}
					setFilters={setGlobalFilters}
					controls={getChooseFilterControls(
						{ activePayrunTab, overseasData, isInvoiceView, entityBank },
					)}
				/>
			</div>
			<PaidInnerTab
				activePayrunTab={activePayrunTab}
				itemData={itemData}
				overseasData={overseasData}
				setOverseasData={setOverseasData}
			/>
		</div>
	);
}

export default SelectFilters;
