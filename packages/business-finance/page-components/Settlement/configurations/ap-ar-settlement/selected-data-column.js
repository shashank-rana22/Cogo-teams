/* eslint-disable max-lines-per-function */
import { Tooltip, Pill, ButtonIcon } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
// import { IcMArrowRotateUp, IcMArrowRotateDown } from '@cogoport/icons-react';
import { useEffect } from 'react';

// import styles from './styles.module.css';

const useGetMatchingColumns = (
	// {
	// columnsToShow = [],
	// loading,
	selectedData,
	setSelectedData,
	// sortBy,
	// setSortBy,
	// sortType,
	// setSortType,
	// sortData, setSortData,
	// arrowDirections,
	// setArrowDirections,
	// }
) => {
	// const { list = [] } = data || {};
	// const { sortBy, sortType } = sortData || {};
	// const currentPageListIds = useMemo(() => list.map(({ id }) => id), [list]);
	// // console.log('f', data);
	// const [selectAll, setSelectAll] = useState(false);
	// const [pageCheckedRows, setPageCheckedRows] = useState({});
	// // const [selectedData, setSelectedData] = useState([]);
	// const pageNumber = data?.pageNo;
	// const checkedRowsId = pageCheckedRows[pageNumber] || [];
	const DOV_VAL_LENGTH = 10;
	const AMT_LENGTH = 8;
	const ZEROTH_INDEX = 0;
	// console.log(selectedData);
	const handleDeleteClick = (idToDelete) => {
		// Remove the item with the given ID from selectedData
		console.log('dfd');
		const updatedSelectedData = selectedData.filter((item) => item.id !== idToDelete);
		// Update the selectedData state
		setSelectedData(updatedSelectedData);
	};
	useEffect(() => {
		// Additional actions or effects to perform when selectedData changes
		// For example, you might update the UI or make an API call here
	}, [selectedData]);

	// useEffect(() => {
	// 	// Update selectAll based on checkboxes of current page
	// 	const currentPageCheckedIds = pageCheckedRows[pageNumber] || [];
	// 	const isRowsChecked = currentPageListIds.every((id) => currentPageCheckedIds.includes(id));
	// 	setSelectAll(isRowsChecked);
	// }, [pageCheckedRows, currentPageListIds, pageNumber]);

	// const onChangeBodyCheckbox = (event, id) => {
	// 	const rowData = data?.list.find((row) => row.id === id);

	// 	if (!rowData) {
	// 		return;
	// 	}
	// 	setPageCheckedRows((previousPageCheckedRows) => {
	// 		const currentPageCheckedIds = previousPageCheckedRows[pageNumber] || [];

	// 		let newPageCheckedIds = [];

	// 		if (event.target.checked) {
	// 			newPageCheckedIds = [...currentPageCheckedIds, id];
	// 			setSelectedData((previousData) => [...previousData, rowData]);
	// 		} else {
	// 			newPageCheckedIds = currentPageCheckedIds.filter((selectedId) => selectedId !== id);
	// 			setSelectedData((previousData) => previousData.filter((row) => row.id !== rowData.id));
	// 		}

	// 		return {
	// 			...previousPageCheckedRows,
	// 			[pageNumber]: newPageCheckedIds,
	// 		};
	// 	});
	// };

	// const onChangeTableHeadCheckbox = () => {
	// 	setPageCheckedRows((previousPageCheckedRows) => {
	// 		// const currentPageCheckedIds = previousPageCheckedRows[pageNumber] || [];
	// 		let newSelectedData = [...selectedData];
	// 		let newPageCheckedIds = [];

	// 		if (selectAll) {
	// 			// Unselect all checkboxes, including header
	// 			newPageCheckedIds = [];
	// 			newSelectedData = selectedData.filter((item) => !currentPageListIds.includes(item.id));
	// 		//  else if (currentPageCheckedIds.length > 0) {
	// 		// 	// Clear all checkboxes if some are selected
	// 		// 	newPageCheckedIds = [];
	// 		// 	newSelectedData = selectedData.filter(item => !currentPageListIds.includes(item.id));
	// 		// }
	// 		} else {
	// 			// Select all checkboxes, including header
	// 			newPageCheckedIds = currentPageListIds;
	// 			newSelectedData = [...new Set([...selectedData, ...list])];
	// 		}
	// 		setSelectedData(newSelectedData);
	// 		return {
	// 			...previousPageCheckedRows,
	// 			[pageNumber]: newPageCheckedIds,
	// 		};
	// 	});
	// };
	// // console.log(sortData.sortBy, sortType);

	// const renderSortingArrows = (key) => {
	// 	(
	// 		<div className={styles.icon_flex}>
	// 			<IcMArrowRotateUp
	// 				className={sortBy === key && sortType === 'Asc' && styles.active}
	// 				cursor="pointer"
	// 				onClick={() => setSortData({
	// 					...sortData,
	// 					sortType : 'Asc',
	// 					sortBy   : key,
	// 				})}
	// 			/>
	// 			<IcMArrowRotateDown
	// 				className={sortBy === key && sortType === 'Desc' && styles.active}
	// 				cursor="pointer"
	// 				onClick={() => setSortData({
	// 					...sortData,
	// 					sortType : 'Desc',
	// 					sortBy   : key,
	// 				})}
	// 			/>
	// 		</div>
	// 	);
	// };
	// const [editedValues, setEditedValues] = useState({});

	// // Initialize the state with the original values from the data prop
	// useEffect(() => {
	// 	const initialEditedValues = {};
	// 	selectedData.forEach((row) => {
	// 		initialEditedValues[row.id] = { ...row };
	// 	});
	// 	setEditedValues(initialEditedValues);
	// }, [selectedData]);

	// // Function to handle value change when editing
	// const handleValueChange = (rowId, field, newValue) => {
	// 	setEditedValues((prevEditedValues) => ({
	// 		...prevEditedValues,
	// 		[rowId]: {
	// 			...prevEditedValues[rowId],
	// 			[field]: newValue,
	// 		},
	// 	}));
	// };

	// Function to refresh and revert edited values to original
	//   const handleRefresh = () => {
	//     // Revert editedValues to original values
	//     setEditedValues((prevEditedValues) => {
	//       const refreshedValues = {};
	//       Object.keys(prevEditedValues).forEach((rowId) => {
	//         refreshedValues[rowId] = { ...selectedData.find((row) => row.id === rowId) };
	//       });
	//       return refreshedValues;
	//     });
	//   };
	//   const handleSettle = () => {
	//     // Update your original data with editedValues
	//     const updatedData = selectedData.map((row) => ({
	//       ...row,
	//       ...editedValues[row.id],
	//     }));

	//     // Update your data with the updatedData
	//     // For example, if you're using state to hold your data:
	//     // setData(updatedData);
	//     setSelectedData(updatedData);
	//     console.log('Updated Data:', updatedData);
	//   };

	const columns = [
		// {
		// 	id     : 'checkbox',
		// 	key    : 'checkbox',
		// 	Header : (
		// 		<Checkbox
		// 			checked={selectAll}
		// 			onChange={(event) => onChangeTableHeadCheckbox(event)}
		// 			disabled={loading}
		// 		/>
		// 	),
		// 	accessor: ({ id = '' }) => (
		// 		<Checkbox
		// 			checked={checkedRowsId.includes(id)}
		// 			onChange={(event) => onChangeBodyCheckbox(event, id)}
		// 		/>

		// 	),
		// },
		{
			Header: (
				<div style={{ fontSize: '12px' }}>DOCUMENT NO</div>
			),
			id       : 'documentValue',
			accessor : (row) => (
				<div>
					<Tooltip
						content={(
							<>
								<div>
									{row?.documentValue}
								</div>
								<div>
									{row?.documentType}
								</div>
							</>
						)}
						interactive
					>
						<div>
							{/* {row?.documentValue || '-'} */}
							{(row?.documentValue && row?.documentValue.length > DOV_VAL_LENGTH
								? `${row?.documentValue.substr(ZEROTH_INDEX, DOV_VAL_LENGTH)}...`
								: row?.documentValue) || '-'}
						</div>
						<Pill
							size="md"
							color="#CFEAED"
							style={{
								fontSize        : '10px',
								backgroundColor : '#CFEAED',
								borderRadius    : '6px',
								textAlign       : 'center',
							}}
						>
							{row?.documentType}
						</Pill>
					</Tooltip>
				</div>
			),
		},
		// {
		// 	Header: (
		// 		<span style={{ fontSize: '12px', display: 'flex' }}>
		// 			DOC. DATE
		// 			{/* {
		// 					(arrowDirections.transactionDate === 'Desc')
		// 						? (
		// 							<span
		// 								onClick={() => {
		// 									setSortType('Asc');
		// 									setSortBy('transactionDate');
		// 									arrowDirections.transactionDate('Asc');
		// 								}}
		// 								style={{ cursor: 'pointer' }}
		// 							>
		// 								▼
		// 							</span>
		// 						)
		// 						: (
		// 							<span
		// 								onClick={() => {
		// 									setSortType('Desc');
		// 									setSortBy('transactionDate');
		// 									arrowDirections.transactionDate('Desc');
		// 								}}
		// 								style={{ cursor: 'pointer' }}
		// 							>
		// 								▲
		// 							</span>
		// 						)
		// 			} */}
		// 			{/* {renderSortingArrows('transactionDate')} */}
		// 		</span>
		// 	),
		// 	id       : 'transactionDate',
		// 	accessor : (item) => (item?.transactionDate
		// 		? item.transactionDate.substr(ZEROTH_INDEX, DOV_VAL_LENGTH) : '--'),
		// },
		{
			Header: (
				<div style={{ fontSize: '12px', display: 'flex' }}>
					DOC AMOUNT
					{/* {
							(arrowDirections.documentAmount === 'Desc')
								? (
									<span
										onClick={() => {
											setSortType('Asc');
											setSortBy('documentAmount');
											arrowDirections.documentAmount('Asc');
										}}
										style={{ cursor: 'pointer' }}
									>
										▼
									</span>
								)
								: (
									<span
										onClick={() => {
											setSortType('Desc');
											setSortBy('documentAmount');
											arrowDirections.documentAmount('Desc');
										}}
										style={{ cursor: 'pointer' }}
									>
										▲
									</span>
								)
					} */}
					{/* {renderSortingArrows('documentAmount')} */}
				</div>
			),
			// accessor : (item) => `${item?.currency} ${item?.documentAmount}` || '--',
			id       : 'documentAmount',
			accessor : (item) => (
				<div>
					<Tooltip content={item?.documentAmount}>
						{item?.currency}
						{' '}
						{item?.documentAmount.toString().length > AMT_LENGTH
							? `${item?.documentAmount.toString().substr(ZEROTH_INDEX, AMT_LENGTH)}..`
							: item?.documentAmount}
					</Tooltip>
				</div>
			),

		},
		{
			Header   : (<div style={{ fontSize: '12px' }}>EXC RATE</div>),
			accessor : (item) => item?.exchangeRate || '--',
			id       : 'exchangeRate',
		},
		// {
		// 	Header   : (<div style={{ fontSize: '12px' }}>TDS APPLICABLE AMOUNT</div>),
		// 	accessor : (item) => `${item?.currency} ${item?.taxableAmount}` || '--',
		// 	id       : 'taxableAmount',
		// },
		{
			Header: (
				<div style={{ fontSize: '12px', display: 'flex' }}>
					TDS
					{/* {renderSortingArrows('tdsAmount')} */}
				</div>),
			// accessor : (item) => `${item?.currency} ${item?.tds}` || '--',
			id       : 'tds',
			accessor : (item) => (
				<div>
					<Tooltip content={item?.tds}>
						{/* <Tooltip content={editedValues[row.id]?.tds || '0'}> */}
						{item?.currency}
						{' '}
						{item?.tds.toString().length > AMT_LENGTH
							? `${item?.tds.toString().substr(ZEROTH_INDEX, AMT_LENGTH)}..`
							: item?.tds}
						{/* {editedValues[row.id]?.tds?.toString().length > AMT_LENGTH
                            	? `${editedValues[row.id]?.tds?.toString().substr(ZEROTH_INDEX, AMT_LENGTH)}..`
                            	: editedValues[row.id]?.tds} */}
						<IcMEdit
							style={{ cursor: 'pointer' }}
							height={14}
							width={14}
							// onClick={(e) => handleValueChange(row.id, 'tds', e.target.value)}
						/>
					</Tooltip>
				</div>
			),
		},
		{
			Header: (
				<div style={{ fontSize: '12px', display: 'flex' }}>
					NOSTRO
					{/* {renderSortingArrows('balanceAmount')} */}
				</div>),
			// accessor : (item) => `${item?.currency} ${item?.balanceAmount}` || '--',
			id       : 'nostroAmount',
			accessor : (item) => (
				<div>
					{/* <Tooltip content={item?.nostroAmount}> */}
					{item?.currency}
					{' '}
					{item?.nostroAmount.toString().length > AMT_LENGTH
						? `${item?.nostroAmount.toString().substr(ZEROTH_INDEX, AMT_LENGTH)}..`
						: item?.nostroAmount}
					{/* </Tooltip> */}
				</div>
			),
		},
		{
			Header   : (<div style={{ fontSize: '12px' }}>SETTLED TDS</div>),
			accessor : (item) => `${item?.currency} ${item?.settledTds}` || '--',
			id       : 'settledTds',
		},
		// {
		// 	Header: (
		// 		<div style={{ fontSize: '12px', display: 'flex' }}>
		// 			PAID/RECIEVED
		// 			{renderSortingArrows('paidAmount')}
		// 		</div>),
		// 	accessor : (item) => `${item?.currency} ${item?.settledAmount}` || '--',
		// 	id       : 'settledAmount',
		// },
		{
			Header: (
				<div style={{ fontSize: '12px', display: 'flex' }}>
					BALANCE
					{/* {renderSortingArrows('balanceAmount')} */}
				</div>),
			// accessor : (item) => `${item?.currency} ${item?.balanceAmount}` || '--',
			id       : 'balanceAmount',
			accessor : (item) => (
				<div>
					<Tooltip content={item?.balanceAmount}>
						{item?.currency}
						{' '}
						{item?.balanceAmount.toString().length > AMT_LENGTH
							? `${item?.balanceAmount.toString().substr(ZEROTH_INDEX, AMT_LENGTH)}..`
							: item?.balanceAmount}
						<IcMEdit
							height={14}
							width={14}
						/>
					</Tooltip>
				</div>
			),
		},
		{
			Header: (
				<div style={{ fontSize: '12px', display: 'flex' }}>
					ALLOCATION
					{/* {renderSortingArrows('balanceAmount')} */}
				</div>),
			// accessor : (item) => `${item?.currency} ${item?.balanceAmount}` || '--',
			id       : 'allocationAmount',
			accessor : (item) => (
				<div>
					<Tooltip content={item?.allocationAmount}>
						{item?.currency}
						{' '}
						{item?.allocationAmount.toString().length > AMT_LENGTH
							? `${item?.allocationAmount.toString().substr(ZEROTH_INDEX, AMT_LENGTH)}..`
							: item?.allocationAmount}
					</Tooltip>
				</div>
			),
		},
		{
			Header: (
				<div style={{ fontSize: '12px', display: 'flex' }}>
					BALANCE AFTER
					{' '}
					<br />
					ALLOCATION
					{/* {renderSortingArrows('balanceAmount')} */}
				</div>),
			// accessor : (item) => `${item?.currency} ${item?.balanceAmount}` || '--',
			id       : 'balanceAfterAllocation',
			accessor : (item) => (
				<div>
					{/* <Tooltip content={item?.balanceAfterAllocation}> */}
					{item?.currency}
					{' '}
					{item?.balanceAfterAllocation.toString().length > AMT_LENGTH
						? `${item?.balanceAfterAllocation.toString().substr(ZEROTH_INDEX, AMT_LENGTH)}..`
						: item?.balanceAfterAllocation}
					{/* </Tooltip> */}
				</div>
			),
		},
		{
			Header   : (<div />),
			// accessor : (item) => `${item?.currency} ${item?.balanceAmount}` || '--',
			id       : 'id',
			accessor : (item) => (
				<div>
					<ButtonIcon
						size="lg"
						icon={<IcMDelete />}
						themeType="primary"
						onClick={() => handleDeleteClick(item?.id)}
					/>
					{/* <IcMDelete /> */}
				</div>
			),
		},
		// {
		// 	Header   : (<div style={{ fontSize: '12px' }}>STATUS</div>),
		// 	// accessor : (item) => item?.status || '--',
		// 	id       : 'status',
		// 	accessor : (item) => (
		// 		<Pill
		// 			size="lg"
		// 			color={
		// 			item?.status === 'Unpaid' || item?.status === 'Unutilized'
		// 				? '#FEF199'
		// 				: '#acdadf'
		// 			}
		// 		>
		// 			{item?.status || '--'}
		// 		</Pill>
		// 	),
		// },
	];
	// const finalColumns = [];

	// columnsToShow.forEach((item) => {
	// 	const column = columns.find((col) => col.id === item);
	// 	finalColumns.push(column);
	// });

	return columns;
};
export default useGetMatchingColumns;
