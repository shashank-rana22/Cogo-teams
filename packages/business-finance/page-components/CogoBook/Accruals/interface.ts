export interface FilterInterface {
	year?:string
	month?:string
	shipmentType?:string
	profitAmount?:string
	profitType?:string
	tradeType?:string
	service?:string
	range?:string
	jobState?:string
	query?:string
	date?:any
	profitPercent?:string
	page?:number,
}

export interface ColumnInterface {
	getTableHeaderCheckbox?: () => JSX.Element
	setOpenDeleteModal?: React.Dispatch<React.SetStateAction<boolean>>
	openDeleteModal?: boolean
	deleteSelected?: (id: any, handleModal: any) => Promise<void>
	getTableBodyCheckbox?: (item: any) => JSX.Element
}
