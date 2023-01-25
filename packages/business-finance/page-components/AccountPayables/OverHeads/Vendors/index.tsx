import { Select, Button, Input, Tooltip } from "@cogoport/components"
import React, {useState, useEffect} from "react";
import { GenericObject } from "../../../commons/Interfaces";
import List from "../../commons/List/index";
import OVER_HEAD_CONFIG from "./utils/config";
import Controls from "./utils/controls";
import styles from "./styles.module.css";
import dummyData from "./utils/data";
import CreateExpenseModal from "./CreateExpenseModal";
import useListVendors from "./hooks/useListVendors";
import { IcMFtick, IcMCrossInCircle, IcMInfo } from "@cogoport/icons-react"

interface itemProps {
    createdDate:String,
    venderSerialId: Number, 
    kycStatus:  String,
    name: String,
    pan: String,
    category: String,
    payments: Number,
    openInvoices: Number,
  }
interface Props{
filters:GenericObject;
setFilters: (p: object) => void;
subActiveTab:string
}

function VenderComponent () {
    const [filters, setFilters] = useState({
        KYC_STATUS: 'ALL_VENDORS', 
        CATEGORY: 'RENT',
        pageIndex: 1,
        pageLimit: 15,
        searchValue: ''
    })

    const [sort, setSort] = useState({});
    const [showModal, setShowModal] = useState(false);

    const {loading = false, data, listApi = () => {}} = useListVendors();

    const handleChange = (e, value) => {
        setFilters((previousState) => ({
			...previousState,
			...{[value]: e}
		})); 
    }

    useEffect(() => {
        listApi(filters)
    }, [filters])

    const renderHeaders = () => {
        return (
            <div className ={styles.headerContainer}>
                <div className={styles.leftContainer} >
                    {
                        Object.keys(Controls).map ((key)=> {
                            const  {options = [], placeholder = '', value =''} = Controls?.[key]
                            return (
                                <Select value={filters?.[key]} onChange={(e) => handleChange(e, value)} placeholder={placeholder} options={options} className ={styles.select}/>
                            )
                        })
                    }
                </div>
                <div className={styles.rightContainer}>
                    <Button size="xl" themeType="primary" onClick={ () => setShowModal(true)} >Create Vendor</Button>
                    <Input 
                        size="lg" 
                        placeholder="Vendor Name/PAN/Organization ID/ Sage ID" 
                        value={filters.searchValue} 
                        onChange = {(e)=> handleChange(e, 'searchValue')}  
                        className = {styles.search}
                    />
                </div>
            </div>
        )
    }

    const functions:any = {
        renderKYCStatus: (itemData:itemProps) => (
            <RenderKYCStatus item={itemData}/>
        ),
        renderPayments: (itemData:itemProps) => (
            <RenderPayments item={itemData}/>
        ),
        renderInvoice: (itemData:itemProps) => (
            <RenderInvoice item={itemData}/>
        )
    }

    return (
        <div>
            {renderHeaders()}

            <List
                config={OVER_HEAD_CONFIG}  
                itemData={dummyData}
                loading={false}
                sort={sort}
                setSort={setSort}
                functions = {functions}
                page={filters.pageIndex||1}
                handlePageChange={(pageValue:number)=>{
                    setFilters((p) => ({...p, pageIndex: pageValue}))
                }}
                showPagination = {true}
            />

            {
                showModal && <CreateExpenseModal showModal = {showModal} setShowModal = {setShowModal}/>
            }
        </div>
    )
}

export default VenderComponent


const RenderKYCStatus = (item) => {
    const {item: itemData = {}}=  item
    const {kycStatus = ''} = itemData
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            { kycStatus === 'verified' ? <div><IcMFtick color ='#67C676'/> Verified</div> : <div><IcMCrossInCircle color ='#e10d1f'/> Pending</div>}
        </div>
    )
}

const RenderPayments = (item) => {
    const {item: itemData = {}}=  item
    const {payments = ''} = itemData
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
            {payments} <Tooltip content="heyy motherfucker" placement="top">
		        <IcMInfo />
	        </Tooltip>
        </div>
    )
}

const RenderInvoice = (item) => {
    const {item: itemData = {}}=  item
    const {openInvoices = ''} = itemData;
    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
            {openInvoices} <div> (INR 12000) </div>
        </div>
    )
}