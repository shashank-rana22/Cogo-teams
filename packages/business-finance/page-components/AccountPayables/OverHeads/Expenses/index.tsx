import React, {useState} from "react";
import {Button, Input} from '@cogoport/components';
import List from '../../../commons/List';
import dummyData from "./utils/dummyData";
import dummyData2 from "./utils/dummyData2";
import {expenseRecurringConfig, expenseNonRecurringConfig} from "./utils/config";
import {IcMSearchlight} from '@cogoport/icons-react';
import SegmentedControl from '../../../commons/SegmentedControl/index';
import CreateExpenseModal from "./CreateExpenseModal";
import styles from './styles.module.css';

function ExpenseComponent () {
    const [recurringState, setRecurringState] = useState('recurring')
    const [expenseFilters, setExpenseFilters] = useState({
        expenseType:recurringState,
        searchValue: '',
        pageIndex: 1,
        pageLimit: 10
    });
    const [showModal, setShowModal] = useState(false);

    const OPTIONS = [
        {
            label: 'Recurring',
            value: 'recurring'
        },
        {
            label: 'Non-Recurring',
            value: 'nonRecurring'
        }
    ]

    const handleChange = (e) => {
        console.log('e-',e);
        
        setExpenseFilters((previousState) => ({
			...previousState,
			
		})); 
    }

    const renderHeaders = () => {
        return (
            <div className ={styles.headerContainer}>
                <div className={styles.leftContainer} >
                    <div className={styles.segmentedControl}>
                    <SegmentedControl 
                        options={OPTIONS}
                        activeTab={recurringState}
                        setActiveTab={setRecurringState}
                        color="#ED3726"
                        background="#FFFAEB"
                        />
                    </div>


                </div>
                <div className={styles.rightContainer}>
                    <Button 
                       size="lg" 
                       themeType="secondary" 
                       onClick={ () => setShowModal(true)} >Create Expense</Button>
                    <Input 
                        size="md" 
                        placeholder="Search by Vendor Name/PAN/Organization ID/Sage ID" 
                        prefix={<IcMSearchlight/>}
                        value={expenseFilters.searchValue} 
                        onChange = {(e)=> handleChange(e)}  
                        className = {styles.search}
                    />
                </div>
            </div>
        )
    }
    return (
        <div> 
            {renderHeaders()}
            <List
                config={recurringState==='recurring'? expenseRecurringConfig() : expenseNonRecurringConfig()}  
                itemData={recurringState==='recurring' ? dummyData : dummyData2}
                loading={false}
                page={expenseFilters.pageIndex|| 1}
                handlePageChange={(pageValue:number)=>{
                    setExpenseFilters((p) => ({...p, pageIndex: pageValue}))
                }}
                showPagination = {true}
            />

            {showModal && <CreateExpenseModal showModal={showModal} setShowModal={setShowModal}/>}
        </div>
    )
}

export default ExpenseComponent