import { Modal } from '@cogoport/components'
import React,{useState} from 'react'
import styles from './styles.module.css'
import Filter from '../../../commons/Filters'
import { FILTERS } from '../../configurations/filters_config'
import { Button } from '@cogoport/components'
import {IcMFilter, IcCRedCircle} from "@cogoport/icons-react"
import { GenericObject } from '../../../commons/Interfaces'

interface Props{
	filters: GenericObject;
	setFilters:(p: object) => void;
}

const FilterModal = ({filters,setFilters}:Props) => {
	const [showModal, setShowModal] =useState(false);
	
 const isFilterApplied = () =>{
	 if(filters?.billDate || filters?.billType || filters?.dueDate || filters?.services || filters?.updatedDate){
		return true;
	 }else{
		 return false;
	 }
 }

	
return (
	<div className={styles.modal_container}>
    <Modal size="md" placement="center" scroll={false} show={showModal} onClose={()=>{setShowModal(false)}}>
			<Modal.Header title={(
				<div className={styles.heading_container}>
					FILTERS
				</div> as never as string
			)}
			/>
			<Modal.Body>
				<div className={styles.container_filter}>
				<Filter controls={FILTERS} filters={filters} setFilters={setFilters} />
				
				</div>
				<div className={styles.buttons}>
					<div className={styles.clear}>
					<Button onClick={()=>{
						setFilters({})
						setShowModal(false)}}
						>Clear Filters</Button>
					</div>
					<div className={styles.apply}>
					<Button onClick={()=>{setShowModal(false)}}>Apply</Button>
					</div>
				</div>
			</Modal.Body>
	</Modal>
	<div role="button" className={styles.filterButton} onClick={()=>{setShowModal(true)}}>
		Filters <span className={styles.icon}><IcMFilter/></span>
			{isFilterApplied() && <IcCRedCircle height={8} width={8}/>}
	</div>
	</div>
)
}

export default FilterModal