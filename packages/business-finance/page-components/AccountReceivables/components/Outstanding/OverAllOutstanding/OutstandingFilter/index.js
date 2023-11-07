import { Button, Input, Placeholder, Popover } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import {
	IcMArrowRotateUp,
	IcMArrowRotateDown,
	IcMCross,
	IcMAppSearch,
} from '@cogoport/icons-react';
import { useState } from 'react';

import { SORTBY_OPTION } from '../../../../constants/index';

import BulkPostModal from './BulkPostModal';
import CallPriorityModal from './CallPriorityModal';
import FilterpopOver from './FilterpopOver/index';
import styles from './styles.module.css';

function Filters({
	handleChange = () => {},
	handleInputReset = () => {},
	setOrderBy = () => {},
	orderBy = { key: '', order: '', label: '' },
	setParams = () => {},
	params = {},
	formFilters = {},
	setFormFilters = () => {},
	clearFilter = () => {},
	queryKey = '',
	entityCode = '',
	refetch = () => {},
	callPriorityData = {},
	callPriorityLoading = false,
}) {
	const [showSortPopover, setShowSortPopover] = useState(false);
	const [showCallPriority, setShowCallPriority] = useState(false);
	const [showBulkPostModal, setShowBulkPostModal] = useState(false);

	const sortStyleAsc = orderBy.order === 'Asc' ? '#303B67' : '#BDBDBD';

	const sortStyleDesc = orderBy.order === 'Desc' ? '#303B67' : '#BDBDBD';

	function Content() {
		return (
			<div className={styles.styled_row}>
				{SORTBY_OPTION.map((item) => (
					<div
						key={item.value}
						className={styles.styled_col}
						onClick={() => {
							setOrderBy({
								key   : item.value,
								order : 'Desc',
								label : item.label,
							});
							setShowSortPopover(false);
							setParams({
								...params,
								page: 1,
							});
						}}
						role="presentation"
					>
						<div className={styles.tile_heading}>{item.label}</div>
					</div>
				))}
			</div>
		);
	}

	let placeholder;
	if (queryKey === 'q') {
		placeholder = ENTITY_FEATURE_MAPPING[entityCode]?.placeholder.tax_number;
	} else if (queryKey === 'tradePartySerialId') {
		placeholder = 'Search By Trade Party';
	} else if (queryKey === 'sageId') {
		placeholder = 'Search By Sage Organization Id';
	} else if (queryKey === 'organizationSerialId') {
		placeholder = 'Search By Serial Id';
	}
	const { search = '' } = params || {};

	return (
		<div className={styles.container}>
			<div className={styles.filter_container}>
				<div className={styles.upper_sort_div}>
					<div className={styles.sort_container}>
						<Popover
							placement="bottom"
							render={<Content />}
							visible={showSortPopover}
							onClickOutside={() => setShowSortPopover(false)}
						>
							<div
								style={{ display: 'flex', cursor: 'pointer' }}
								onClick={() => setShowSortPopover(!showSortPopover)}
								role="presentation"
							>
								Sort By:
								{' '}
								<div className={styles.filter_value}>
									{orderBy.label}
									{' '}
									<div className={styles.sort_icon_style}>
										{showSortPopover ? (
											<IcMArrowRotateUp />
										) : (
											<IcMArrowRotateDown />
										)}
									</div>
								</div>
							</div>
						</Popover>
					</div>
					<div
						role="presentation"
						className={styles.icon_div}
						onClick={() => {
							setOrderBy((prev) => ({
								key   : prev.key,
								order : prev.order === 'Asc' ? 'Desc' : 'Asc',
								label : prev.label,
							}));
							setParams({ ...params, page: 1 });
						}}
					>
						<IcMArrowRotateUp style={{ color: sortStyleAsc }} />

						<IcMArrowRotateDown style={{ color: sortStyleDesc }} />
					</div>

					<FilterpopOver
						filters={formFilters}
						setFilters={setFormFilters}
						clearFilter={clearFilter}
						refetch={refetch}
					/>

					<Button
						className={styles.bulk_btn}
						onClick={() => setShowBulkPostModal(true)}
					>
						Bulk Update
					</Button>
				</div>
				<div className={styles.flex_wrap}>
					<div className={styles.call}>
						<div
							style={{ display: 'flex', cursor: 'pointer' }}
							onClick={() => setShowCallPriority(true)}
							role="presentation"
						>
							<div className={styles.calllabel}>
								{callPriorityLoading ? (
									<Placeholder width="60px" />
								) : (
									callPriorityData
										?.businessName
								)}
							</div>
							<div className={styles.callpriority}>Call Priority</div>
						</div>
					</div>
					<div className={styles.flex_wrap}>
						<Input
							placeholder={placeholder}
							value={search}
							onChange={(e) => handleChange(e)}
							suffix={
								search ? (
									<IcMCross
										onClick={handleInputReset}
										cursor="pointer"
										className={styles.icon_style}
									/>
								) : (
									<IcMAppSearch />)
							}
							prefix={null}
							className={styles.styled_input}
						/>
					</div>
				</div>
			</div>
			{showCallPriority ? (
				<CallPriorityModal
					showCallPriority={showCallPriority}
					setShowCallPriority={setShowCallPriority}
					data={callPriorityData}
				/>
			) : null}
			{showBulkPostModal ? (
				<BulkPostModal
					showBulkPostModal={showBulkPostModal}
					setShowBulkPostModal={setShowBulkPostModal}
					refetch={refetch}
				/>
			) : null}
		</div>
	);
}

export default Filters;
