import React, {useState} from "react";
import {Button, Input} from '@cogoport/components';
import {IcMSearchlight} from '@cogoport/icons-react';
import styles from './styles.module.css';

function ExpenseComponent () {
    const [expenseFilters, setExpenseFilters] = useState({
        expenseType:'recurring',
        searchValue: '',
        pageIndex: 1,
        pageLimit: 10
    });
    const [showModal, setShowModal] = useState(false);

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
                    {/* {
                        Object.keys(Controls).map((key)=> {
                            const  {options = [], placeholder = '', value =''} = Controls[key];
                            return ( 
                                <Select 
                                   value={filters?.[key]} 
                                   onChange={(e) => handleChange(e, value)} 
                                   placeholder={placeholder} 
                                   options={options} 
                                   className ={styles.select}
                                   isClearable
                                   />
                            )
                        })
                    } */}

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
        </div>
    )
}

export default ExpenseComponent