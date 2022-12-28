import React,{useState}  from "react";
import { Button,ToolTip,Modal } from "@cogoport/components";
import styles from './styles.module.css';
import { isEmpty } from '@cogoport/utils';
import { IcMInfo } from '@cogoport/icons-react';
import { urgencyOptions } from "./controls";
import AddUrgencyTag from "./AddUrgencyTag/index";
import RemoveTagConfirmation from './RemoveTagConfirmation/index';


const InvoiceDetails =({data={},getBillRefetch})=>{
    const {bill} = data ;
	const collectionPartyId = data?.billAdditionalObject?.collectionPartyId;
    const {grandTotal} = bill || {};
	const [removeTag, setRemoveTag] = useState(false);
	const [showAddTag, setShowAddTag] = useState(false);

    if (data?.serviceType === 'air_freight') {
		urgencyOptions.push({ label: 'Airlines DO Payments', value: 'air_do' });
	}


    let displayTag = '';
	urgencyOptions.forEach((option) => {
		if (option.value === data?.billAdditionalObject?.urgencyTag)
			displayTag = option.label;
	});

    const remarkRender = () => {
		return (
				<div>Urgent Remarks - {data?.billAdditionalObject?.urgencyRemarks}</div>
		);
	};

    const renderEditTag = (
		<div>
			<div className={styles.cardField}>
				<p>Tag - {displayTag}</p>

				{!isEmpty(data?.billAdditionalObject?.urgencyRemarks) &&
				data?.billAdditionalObject?.urgencyTag === 'urgent' ? (
					<ToolTip
						placement="bottom"
						theme="light-border"
						interactive
						content={remarkRender()}
					>
							<IcMInfo />
					</ToolTip>
				) : null}
			</div >

			<div>
				<Button className="secondary sl" onClick={() => setRemoveTag(true)}>
					Remove Tag
				</Button>

				<Button className="secondary sl" onClick={() => setShowAddTag(true)}>
					Edit Tag
				</Button>
			</div>
		</div>
	);

    const renderEmpty = (
		<div className={styles.flexdiv}>
			<div>No Urgency Tag &nbsp;</div>
			<Button className="secondary sl" onClick={() => setShowAddTag(true)}>
				Add Tag
			</Button>
		</div>
	);

    return(
        <div className={styles.container}> 

        <h3>Invoice Details</h3>
        {showAddTag ? (
				<AddUrgencyTag
					billId={data?.bill?.id}
					serviceType={data?.serviceType}
					showAddTag={showAddTag}
					getBillRefetch={getBillRefetch}
					setShowAddTag={setShowAddTag}
					collectionPartyId={collectionPartyId}
				/>
			) : null}
        <div className={styles.smallHr} />
        <div className={styles.card} >
            <div className={styles.cardField}>Invoice Amount - &nbsp; <span className={styles.amount}>INR {grandTotal}</span></div>
            <div className={styles.verticalSmallHr}/>
            <div className={styles.cardField}>
                Tag - &nbsp; <span className={styles.tag}>
                {data?.billAdditionalObject?.urgencyTag
				? renderEditTag
				: !isEmpty(data) && renderEmpty}
                </span>
                </div>
            <div className={styles.verticalSmallHr}/>
            <div className={styles.cardField}>Remark - The remarks from payables/S02</div>
        </div>

        {removeTag ? (
				<Modal
					show={removeTag}
					onClose={() => setRemoveTag(false)}
					className="secondary sm"
					closable={false}
				>
					<RemoveTagConfirmation
						setRemoveTag={setRemoveTag}
						getBillRefetch={getBillRefetch}
						billId={data?.bill?.id}
						collectionPartyId={collectionPartyId}
					/>
				</Modal>
			) : null}

        </div>
    )
}

export default InvoiceDetails