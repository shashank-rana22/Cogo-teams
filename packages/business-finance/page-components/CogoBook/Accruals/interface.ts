export interface FilterInterface {
	year?:any
	month?:any
	shipmentType?:string
	profitAmount?:string
	profitType?:string
	tradeType?:string
	service?:string
	range?:string
	jobState?:string
	query?:string
	profitAmountUpper?:string
	profitPercentUpper?:string
	date?:any
	profitPercent?:string
	sortBy?:string
	page?:number,
	sortType?:string
	entity?:string
}

export interface ColumnInterface {
	getTableHeaderCheckbox?: () => JSX.Element
	setOpenDeleteModal?: React.Dispatch<React.SetStateAction<{}>>
	openDeleteModal?: {}
	deleteSelected?: (id: any, handleModal: any) => Promise<void>
	getTableBodyCheckbox?: (item: any) => JSX.Element
	filters?: {
		search: string;
		archivedStatus: string;
		page: number;
		pageLimit: number;
		sortType?: string;
		sortBy?: string;
	}
	setFilters?: React.Dispatch<React.SetStateAction<{
		search: string;
		archivedStatus: string;
		page: number;
		pageLimit: number;
		sortType?: string;
		sortBy?: string;
	}>>
}
