import { Input, Button, Popover, Toggle } from '@cogoport/components';
import { IcMSearchlight, IcMFilter } from '@cogoport/icons-react';
import { useHandleVersionChangeToOld } from '@cogoport/next';
import ScopeSelect from '@cogoport/scope-select';
import { useState } from 'react';

import useGetPartner from '../../hooks/useGetPartner';

import DetailsView from './DetailsView';
import FilterPopover from './Filter';
import styles from './styles.module.css';
import TablePagination from './TablePagination';
import TableView from './TableView';

function Partners() {
	const [clickedItem, setClickedItem] = useState({});
	const [view, setView] = useState('empty');
	const [entityType, setEntityType] = useState('cogoport');
	const { filters, setFilters, loading, data, q, setQ, refetch } = useGetPartner();
	const paginationProps = { setFilters, filters, data };
	const [visible, setVisible] = useState(false);
	const { handleRouteChange } = useHandleVersionChangeToOld({});
	return (
		<div className={styles.body}>
			<div className={styles.table}>
				<div className={styles.filters}>
					<Toggle
						size="md"
						onLabel="Old"
						offLabel="New"
						onChange={handleRouteChange}
					/>
					<Popover
						placement="bottom"
						visible={visible}
						onClickOutside={() => setVisible(false)}
						render={(
							<FilterPopover
								setFilters={setFilters}
								setVisible={setVisible}
							/>
						)}
					>
						<Button
							className={styles.filter_button}
							themeType="secondary"
							onClick={() => setVisible(true)}
						>
							<div className={styles.filter_div}>
								FILTER
								<div className={styles.filter_icon}><IcMFilter /></div>
							</div>

						</Button>
					</Popover>

					<Input
						size="sm"
						placeholder="Search by Name Email"
						value={q}
						onChange={setQ}
						suffix={<IcMSearchlight />}
					/>

					<Button
						className={styles.create_btn}
						onClick={() => { setView('create'); setEntityType('channel_partner'); }}
					>
						Create Partner
					</Button>
					<div className={styles.scope_select}>
						<ScopeSelect size="md" />
					</div>

				</div>
				<TableView
					loading={loading}
					data={data?.list}
					setClickedItem={setClickedItem}
					setView={setView}
				/>
				{!loading
					? <TablePagination {...paginationProps} /> : null}

			</div>
			<div className={styles.side_bar}>
				<DetailsView
					view={view}
					setView={setView}
					clickedItem={clickedItem}
					setClickedItem={setClickedItem}
					entityType={entityType}
					setEntityType={setEntityType}
					refetch={refetch}
				/>
			</div>
		</div>
	);
}
export default Partners;
