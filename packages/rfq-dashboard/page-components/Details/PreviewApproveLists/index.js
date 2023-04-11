import { Checkbox, Button } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { PortsOriginDestinationDetailsData } from '../../../configurations/details-ports-origin-destination';

import PortsCard from './PortsCard';
import styles from './styles.module.css';
import ToApproveModal from './ToApproveModal';

function PreviewAndApproveLists() {
	const [selected, setSelected] = useState([]);

	const [checkAll, setCheckAll] = useState(false);
	const [show, setShow] = useState(false);

	const handleSelectAll = (e) => {
		if (e.target.checked) {
			const list = [];
			PortsOriginDestinationDetailsData.forEach((item) => {
				list.push(item.id);
			});
			setSelected(list);
			setCheckAll(true);
		} else {
			setCheckAll(false);
			setSelected([]);
		}
	};
	const changeSelection = (id, state) => {
		if (state) {
			setSelected([...selected, id]);
		} else {
			setSelected(selected.filter((item) => item !== id));
		}
	};

	// const selectedPortsItems = PortsOriginDestinationDetailsData.filter((item) => item.id === selected?.[0]);
	// console.log(selectedPortsItems, 'selectedPortsItems');

	useEffect(() => {
		console.log('selected', selected?.[0]);
		if (selected?.length === PortsOriginDestinationDetailsData?.length)setCheckAll(true);
		else setCheckAll(false);
	}, [selected]);

	return (
		<div className={styles.main_container}>
			<div className={styles.header}>
				<Checkbox
					label="Select All"
					// value="a2"
					checked={checkAll}
					onChange={handleSelectAll}
					disabled={!PortsOriginDestinationDetailsData?.length}
					// disabled={false}
					// loading
				/>
				<Button
					size="md"
					themeType="primary"
					// onClick={handleUpdate}
					onClick={() => setShow(true)}
					disabled={!PortsOriginDestinationDetailsData?.length || !selected?.length}
				>
					<span>
						Preview and Approve(
						{selected.length || 0}
						)
					</span>
				</Button>
				{
					show && (
						<ToApproveModal
							show={show}
							setShow={setShow}
							// data={selectedPortsItems}
							selected={selected}
							changeSelection={changeSelection}
						/>
					)
				}
			</div>
			<div className={styles.approve_remaining_complete_shipment_section}>
				<div className={styles.shipment_lists_section}>
					<div className={styles.lists_heading_section}>
						<span className={styles.lists_heading_section}>Request for Approval</span>
						<div className={`
						${styles.lists_heading_section} 
						${styles.port_pairs_nos}`}
						>
							(
							{PortsOriginDestinationDetailsData.length}
							{' '}
							Port Pairs)
						</div>
					</div>
					{
						PortsOriginDestinationDetailsData.map((item) => (
							<div className={styles.ports_section}>
								<PortsCard
									{...item}
									data={item}
									selected={selected}
									changeSelection={changeSelection}
								/>
							</div>
						))
					}
				</div>
				<div className={styles.shipment_lists_section}>
					<div className={styles.lists_heading_section}>
						<span className={styles.lists_heading_part}>Remaining</span>
						<div className={`
						${styles.lists_heading_section}
						${styles.port_pairs_nos}`}
						>
							(
							{PortsOriginDestinationDetailsData.length}
							)
							Port Pairs
						</div>
					</div>
					{
						PortsOriginDestinationDetailsData.map((item) => (
							<div className={styles.ports_section}>
								<PortsCard {...item} isClickable={false} />
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}
export default PreviewAndApproveLists;
