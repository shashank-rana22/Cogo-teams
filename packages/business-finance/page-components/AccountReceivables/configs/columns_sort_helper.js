const ORANGE = '#F68B21';
const GREY = '#BDBDBD';

const getStyle = ({
	sortType = '',
	sortBy = '',
	activeSortType = '',
	activeSortBy = '',
}) => (sortType === activeSortType && sortBy === activeSortBy ? ORANGE : GREY);

const sortStyleLedgerTotalAsc = ({ sortType, sortBy }) => getStyle({
	sortType,
	sortBy,
	activeSortType : 'asc',
	activeSortBy   : 'ledgerTotal',
});

export const sortStyleLedgerTotalDesc = ({ sortType, sortBy }) => getStyle({
	sortType,
	sortBy,
	activeSortType : 'desc',
	activeSortBy   : 'ledgerTotal',
});

export const sortStyleInvoiceDateAsc = ({ sortType, sortBy }) => getStyle({
	sortType,
	sortBy,
	activeSortType : 'asc',
	activeSortBy   : 'invoiceDate',
});

export const sortStyleInvoiceDateDesc = ({ sortType, sortBy }) => getStyle({
	sortType,
	sortBy,
	activeSortType : 'desc',
	activeSortBy   : 'invoiceDate',
});

export const sortStyleDueDateAsc = ({ sortType, sortBy }) => getStyle({
	sortType,
	sortBy,
	activeSortType : 'asc',
	activeSortBy   : 'dueDate',
});

export const sortStyleDueDateDesc = ({ sortType, sortBy }) => getStyle({
	sortType,
	sortBy,
	activeSortType : 'desc',
	activeSortBy   : 'dueDate',
});

export default sortStyleLedgerTotalAsc;
