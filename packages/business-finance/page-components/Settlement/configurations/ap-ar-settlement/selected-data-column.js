/* eslint-disable max-lines-per-function */
import { Tooltip, Pill, ButtonIcon } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { useEffect } from 'react';

const useGetMatchingColumns = (
	selectedData,
	setSelectedData,
) => {
	const DOV_VAL_LENGTH = 10;
	const AMT_LENGTH = 8;
	const ZEROTH_INDEX = 0;
	const handleDeleteClick = (idToDelete) => {
		// Remove the item with the given ID from selectedData
		const updatedSelectedData = selectedData.filter((item) => item.id !== idToDelete);
		// Update the selectedData state
		setSelectedData(updatedSelectedData);
	};
	useEffect(() => {
		// Additional actions or effects to perform when selectedData changes
		// For example, you might update the UI or make an API call here
	}, [selectedData]);

	const columns = [
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
		{
			Header: (
				<div style={{ fontSize: '12px', display: 'flex' }}>
					DOC AMOUNT
				</div>
			),
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
		{
			Header: (
				<div style={{ fontSize: '12px', display: 'flex' }}>
					TDS
				</div>),
			id       : 'tds',
			accessor : (item) => (
				<div>
					<Tooltip content={item?.tds}>
						{item?.currency}
						{' '}
						{item?.tds.toString().length > AMT_LENGTH
							? `${item?.tds.toString().substr(ZEROTH_INDEX, AMT_LENGTH)}..`
							: item?.tds}
						<IcMEdit
							style={{ cursor: 'pointer' }}
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
					NOSTRO
				</div>),
			id       : 'nostroAmount',
			accessor : (item) => (
				<div>
					{item?.currency}
					{' '}
					{item?.nostroAmount.toString().length > AMT_LENGTH
						? `${item?.nostroAmount.toString().substr(ZEROTH_INDEX, AMT_LENGTH)}..`
						: item?.nostroAmount}
				</div>
			),
		},
		{
			Header   : (<div style={{ fontSize: '12px' }}>SETTLED TDS</div>),
			accessor : (item) => `${item?.currency} ${item?.settledTds}` || '--',
			id       : 'settledTds',
		},
		{
			Header: (
				<div style={{ fontSize: '12px', display: 'flex' }}>
					BALANCE
				</div>),
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
				</div>),
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
				</div>),
			id       : 'balanceAfterAllocation',
			accessor : (item) => (
				<div>
					{item?.currency}
					{' '}
					{item?.balanceAfterAllocation.toString().length > AMT_LENGTH
						? `${item?.balanceAfterAllocation.toString().substr(ZEROTH_INDEX, AMT_LENGTH)}..`
						: item?.balanceAfterAllocation}
				</div>
			),
		},
		{
			Header   : (<div />),
			id       : 'id',
			accessor : (item) => (
				<div>
					<ButtonIcon
						size="lg"
						icon={<IcMDelete />}
						themeType="primary"
						onClick={() => handleDeleteClick(item?.id)}
					/>
				</div>
			),
		},
	];

	return columns;
};
export default useGetMatchingColumns;
