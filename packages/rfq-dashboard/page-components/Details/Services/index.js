/* eslint-disable no-mixed-spaces-and-tabs */
import { Checkbox, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import { PortsOriginDestinationDetailsData } from '../../../configurations/details-ports-origin-destination';

import EmptyPortsSection from './EmptyPortSection';
import PortsCard from './PortsCard';
import styles from './styles.module.css';
import ToApproveModal from './ToApproveModal';

const TITLE_MAPPING = {
	auto_approved          : 'Request For Approvals',
	requested_for_approval : 'Remaining Port Pairs',
};

function Services({ loading, rate_card_list_object = {}, refetchRateCards }) {
	const [selected, setSelected] = useState([]);

	const [checkAll, setCheckAll] = useState(false);
	const [show, setShow] = useState(false);

	const handleSelectAll = (e) => {
		if (e.target.checked) {
			const list = [];
			PortsOriginDestinationDetailsData.forEach((item) => {
				list.push(item);
			});
			setSelected(list);
			setCheckAll(true);
		} else {
			setCheckAll(false);
			setSelected([]);
		}
	};

	const changeSelection = (item, state) => {
		if (state) {
			setSelected([...selected, { ...item }]);
		} else {
			setSelected(selected.filter((elem) => elem?.id !== item?.id));
		}
	};

	useEffect(() => {
		// console.log('selected', selected);
		if (selected?.length === PortsOriginDestinationDetailsData?.length)setCheckAll(true);
		else setCheckAll(false);
	}, [selected]);

	// return (
	// 	<div />
	// );

	return (
		<div className={styles.main_container}>
			<div className={styles.header}>
				<Button
					size="md"
					themeType="primary"
				// onClick={handleUpdate}
					onClick={() => setShow(true)}
					disabled={!PortsOriginDestinationDetailsData?.length || !selected?.length}
				>
					Preview and Approve
				</Button>
				{
					show && (
						<ToApproveModal
							show={show}
							setShow={setShow}
							// data={selectedPortsItems}
							selected={selected}
							changeSelection={changeSelection}
							isClickable={false}
						/>
					)
            }
			</div>

			{(isEmpty(rate_card_list_object) && !loading)
				? <EmptyPortsSection />
				: Object.keys(rate_card_list_object).map((key) => (
					<div className={styles.approve_remaining_complete_shipment_section}>
						<div className={styles.lists_heading_section}>
							<span className={styles.lists_heading_section}>{TITLE_MAPPING[key]}</span>
							<div className={` ${styles.lists_heading_section} ${styles.port_pairs_nos}`}>
								(
								{rate_card_list_object[key].length}
								{' '}
								Port Pairs)
							</div>
						</div>
						{rate_card_list_object[key].map((rate_card) => (
							<div className={styles.ports_section} key={rate_card.id}>
								<PortsCard
									id={rate_card.id}
									data={rate_card}
								// selected={selected}
								// changeSelection={changeSelection}
									loading={loading}
									title={key}
									refetchRateCards={refetchRateCards}
								/>
							</div>
				  ))}
					</div>
			  ))}
		</div>
	  );

	// return (
	// 	<div className={styles.main_container}>
	// 		{(isEmpty(PortsOriginDestinationDetailsData) && !loading)
	// 			? <EmptyPortsSection />
	// 			:								(
	// 				<>
	// 					<div className={styles.header}>
	// 						<Checkbox
	// 							label="Select All"
	// 				// value="a2"
	// 							checked={checkAll}
	// 							onChange={handleSelectAll}
	// 							disabled={!PortsOriginDestinationDetailsData?.length && loading}
	// 						/>
	// 						<Button
	// 							size="md"
	// 							themeType="primary"
	// 				// onClick={handleUpdate}
	// 							onClick={() => setShow(true)}
	// 							disabled={!PortsOriginDestinationDetailsData?.length || !selected?.length}
	// 						>
	// 							<span>
	// 								Preview and Approve(
	// 								{selected.length || 0}
	// 								)
	// 							</span>
	// 						</Button>
	// 						{
	// 				show && (
	// 					<ToApproveModal
	// 						show={show}
	// 						setShow={setShow}
	// 						// data={selectedPortsItems}
	// 						selected={selected}
	// 						changeSelection={changeSelection}
	// 						isClickable={false}
	// 					/>
	// 				)
	// 			}
	// 					</div>
	// 					<div className={styles.approve_remaining_complete_shipment_section}>
	// 						<div className={styles.shipment_lists_section}>
	// 							<div className={styles.lists_heading_section}>
	// 								<span className={styles.lists_heading_section}>Request for Approval</span>
	// 								<div className={` ${styles.lists_heading_section} ${styles.port_pairs_nos}`}>
	// 									(
	// 									{PortsOriginDestinationDetailsData.length}
	// 									{' '}
	// 									Port Pairs)
	// 								</div>
	// 							</div>
	// 							{PortsOriginDestinationDetailsData.map((item) => (
	// 								<div className={styles.ports_section}>
	// 									<PortsCard
	// 										id={item.id}
	// 										{...item}
	// 										data={item}
	// 										selected={selected}
	// 										changeSelection={changeSelection}
	// 										loading={loading}
	// 									/>
	// 								</div>
	// 							))}
	// 						</div>
	// 						<div className={styles.shipment_lists_section}>
	// 							<div className={styles.lists_heading_section}>
	// 								<span className={styles.lists_heading_part}>Remaining</span>
	// 								<div className={`
	// 					${styles.lists_heading_section}
	// 					${styles.port_pairs_nos}`}
	// 								>
	// 									(
	// 									{PortsOriginDestinationDetailsData.length}
	// 									)
	// 									Port Pairs
	// 								</div>
	// 							</div>
	// 							{
	// 					PortsOriginDestinationDetailsData.map((item) => (
	// 						<div className={styles.ports_section}>
	// 							<PortsCard {...item} isClickable={false} loading={loading} />
	// 						</div>
	// 					))
	// 				}
	// 						</div>
	// 					</div>
	// 				</>
	// 			)}

	// 	</div>
	// );
}
export default Services;
