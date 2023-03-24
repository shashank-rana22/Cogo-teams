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
}

export interface ColumnInterface {
	getTableHeaderCheckbox?: () => JSX.Element
	setOpenDeleteModal?: React.Dispatch<React.SetStateAction<boolean>>
	openDeleteModal?: boolean
	deleteSelected?: (id: any, handleModal: any) => Promise<void>
	getTableBodyCheckbox?: (item: any) => JSX.Element
}
