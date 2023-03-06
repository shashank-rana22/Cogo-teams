// import { Button } from '@cogoport/components';
import { Popover } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

// eslint-disable-next-line import/order
import PopOverContent from '../../../../commons/PopoverContent';

/* eslint-disable */
import countries from '../../../../../../.data-store/constants/countries.json';
import WORK_SCOPES_OPTIONS from '../CreateAudienceForm/utils/workScopeMappings';

import styles from './styles.module.css';

function audienceListColumns({ 
	onClickDeleteIcon,
	showPopOver,
	setShowPopOver,
	updateApiLoading
 }) {

	const onClickNoButton = (item)=>{
		setShowPopOver(null)
	}

	const listColumns = [
		{
			Header   : 'NAME',
			accessor : (items) => (
				<div className={styles.question}>
					{startCase(items?.name) || '--'}
				</div>
			),
		},
		{
			Header   : 'FUNCTION',
			accessor : (items) => (
				<div className={styles.topics}>
					{startCase(items?.auth_function) || '--'}
				</div>
			),
		},
		{
			Header   : 'SUB FUNCTION',
			accessor : (items) => (
				<div className={styles.topics}>
					{startCase(items?.auth_sub_function) || '--'}
				</div>
			),
		},
		{
			Header   : 'COGO ENTITY',
			accessor : (items) => (
				<div className={styles.topics}>
					{startCase(items?.cogo_entity_name) || '--'}
				</div>
			),
		},
		{
			Header   : 'COUNTRY',
			accessor : (item) => {
				const selectedCountry = countries.find((country)=> country.id===item.country_id)
				return (
				<div className={styles.tags}>
					{selectedCountry?.name||'--'}
				</div>)
			},
		},
		{
			Header   : 'WORK SCOPE',
			accessor : (item) => {
				const selectedWorkScope = WORK_SCOPES_OPTIONS.find((element)=> element?.value===item.work_scope)
				return (
				<div className={styles.tags}>
					{selectedWorkScope?.label||'--'}
				</div>)
			},
		},
		{
			Header   : 'PLATFORM',
			accessor : (items) => (
				<div className={styles.topics}>
					{startCase(items?.platform) || '--'}
				</div>
			),
		},
		{
			Header   : 'ACTIONS',
			accessor : (item) => {
				
				return(
					<Popover
					    placement="top"
						interactive
						visible={showPopOver===item?.id}
						styles={{marginRight:'20px'}}
						render={(
							<PopOverContent
								source='audience'
								onCLickYesButton ={()=>onClickDeleteIcon(item)}
								onClickNoButton={()=>onClickNoButton(item)}
								loading={updateApiLoading}
							/>
						)}
					>
						<div className={styles.button_container}>

 							<div className={styles.delete_button}>
							<IcMDelete 
							height={20} 
							width={20}  
							onClick = {
								()=>{setShowPopOver(() => 
								(showPopOver ===item?.id ? null : item?.id));}}
								/>
                            </div>

   						</div>
					</Popover>
				)
				
			},
		},
	];
	// onClick={() => onClickDeleteIcon(item)}
	return { listColumns };
}

export default audienceListColumns;
