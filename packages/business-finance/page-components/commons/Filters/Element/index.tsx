import {Input, Modal, Pills, Select, Tags, Tooltip, Datepicker} from '@cogoport/components';
import React, { useState } from 'react';
import freightMapping  from '../../Constants/freight-mappings';
import CostView from '../../costView/index';
import styles from './styles.module.css'
import { Options } from '../../Interfaces';
import SegmentedControl from '../../SegmentedControl';
import {IcMSearchlight} from '@cogoport/icons-react';

interface ElementProps{
	type?:string;
	value?:string;
	className?:string;
	url?:string;
	href?:string;
	key?:string;
	name:string;
	onChange?: (val: any) => void;
	options?:Options[];
	setFilters:(p:object) => void;
	filters:object;
	[key:string]:string|undefined|((val: any) => void)|Options[]|object;
}

const Element = ({
	type,
	value,
	className,
	url,
	href = '#',
	name,
	filters,
	...rest
}:ElementProps) => {



const [show, setShow] = useState<boolean>(false);
const {setFilters}=rest;
const tagClick=(val:Options)=>{
	setFilters((prev:object) => ({
		...prev,
		[name]    : val.value,
		pageIndex : 1,
	}))
}

	const getElement = () => {
		switch (type) {
			case 'tags':
				return (
					<div className={styles.flex}>
					{rest?.options?.map((val)=>(
					<div style={{margin:'5px'}} onClick={()=>tagClick(val)}>
							<Tags themeType="yellow" size="md" className={val.value===filters[name as keyof typeof filters]?styles.active:styles.normal} >{val.label}</Tags>
					</div>))}
					</div>
				);
			case 'href':
				return (
					<div>
						<div className={styles.urlContainer} onClick={() => setShow(true)}>{value}</div>
						{show && href && (
							<Modal
								className="primary lg"
								show={show}
								onClose={() => setShow(false)}
							>
								<CostView onClose={() => setShow(false)} shipment_id={href} />
							</Modal>
						)}
					</div>
				);

			case 'pdfView':
				return (
					<div>
						<div className={styles.urlContainer} onClick={() => window.open(url, '_blank')}>
							{value!.length > 15 ? (
								<Tooltip
									interactive
									theme="light"
									placement="top"
									content={value}
								>
									<div className={styles.textDiv}>{`${value!.substring(0, 15)}...`}</div>
								</Tooltip>
							) : (
								<div className={styles.textDiv}>{value}</div>
							)}
						</div>
					</div>
				);
			case 'pills':
				return (
					<Pills value={value} className={className} {...rest} />
				);
			case 'select':
				return (
					<div className={styles.select_container}>
					<Select value={value} className={className} {...rest}/>
					</div>
				);
			case 'input':
				return <Input value={value} className={className} prefix={(
					<IcMSearchlight
						height={15}
						width={15}
					/>
				)} {...rest} />;
			case 'datepicker':
				return (
					<Datepicker name="date"  value={value} {...rest} />
				);
			case 'serviceType':
				return (
					<div className={className} {...rest}>
						{freightMapping[value as keyof typeof freightMapping]?.name.replace('_', '') || '-'}
					</div>
				);
			case 'segmented':
				return(
					<SegmentedControl options={rest?.options as {label:string ,value:string, icon?: JSX.Element ,badge?:number}[] } 
					activeTab={value||''} 
					setActiveTab={(val:string)=>{setFilters((p:object)=>({...p,[name]    : val}))}}
					{...rest}
					/>
				)

			default:
				return (
					<div className={className} {...rest}>
						{value}
					</div>
				);
		}
	};
	return (
		<div>
			{getElement()}
		</div>
	);
};

export default Element;
