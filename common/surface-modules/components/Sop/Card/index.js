import { Button, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCPin, IcMPin } from '@cogoport/icons-react';
import React, { useState, useRef } from 'react';
import { v1 as uuid } from 'uuid';

import useAddSopData from '../../../hooks/useAddSopData';
import useUpdateShipmentOperatingProcedure from '../../../hooks/useUpdateShipmentOperatingProcedure';
import updateSopPayload from '../helpers/update-sop-details-payload';

import ChildBlocks from './ChildBlocks';
import ShowConditions from './ShowConditions';
import styles from './styles.module.css';

function SopCard({
	details,
	reload,
	setReload = () => {},
	trade_partners_details,
	primary_service = {},
}) {
	const [showActions, setShowActions] = useState(false);
	const sopData = details;
	const { instructions } = details || [];

	let updatePermission = true;

	if (![true, false].includes(updatePermission)) {
		updatePermission = true;
	}
	const initialBlocks = [];

	(instructions || []).forEach((obj, index) => {
		const instructionObject = {
			id       : `${index}_${uuid()}`,
			mainData : JSON.parse(JSON.stringify(obj)),
		};
		initialBlocks.push(instructionObject);
	});

	const [blocks, setBlocks] = useState([...initialBlocks]);
	const originalData = initialBlocks;

	const handleAddBlocks = () => {
		const newBlock = { id: `${blocks.length}_${uuid()}`, mainData: {} };
		setBlocks([...blocks, newBlock]);
	};

	const sopCardRef = useRef({});

	const { sopID, trigger, loading } = useAddSopData({
		formValues   : blocks,
		bookingRadio : false,
		api          : 'update',
		sopID        : details?.id,
		originalData,
	});

	const { upatePinnedStatus } = useUpdateShipmentOperatingProcedure({
		sopData,
		reload,
		setReload,
		updatePermission,
	});

	const update = async () => {
		const { finalPayload, updatable } = await updateSopPayload({
			sopCardRef,
			blocks,
			originalData,
			sopID,
		});
		try {
			if (finalPayload.sop_instructions.length) {
				if (updatable) {
					const res = await trigger({ data: finalPayload });
					if (!res.hasError) {
						Toast.success('Succesfully updated');
						setReload(!reload);
					} else {
						Toast.error('Something went wrong');
					}
				} else {
					Toast.info('Instructions or Attachment atlest one is required');
				}
			} else {
				Toast.info('Nothing To Update..');
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	return (
		<div className={styles.sop_container}>
			<div className={styles.header_conatiner}>
				<div className={styles.condition_for}>
					{sopData?.shipment_id ? (
						<>For This Shipment</>
					) : (
						<>For Booking Party</>
					)}

					<div className={styles.conditions}>
						{!sopData?.shipment_id ? (
							<ShowConditions
								sopData={sopData}
								trade_partners_details={trade_partners_details}
								primary_service={primary_service}
							/>
						) : null}
					</div>

					<div className={styles.edit_details}>
						Last Edited:
						{formatDate({
							date       : sopData?.updated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType : 'dateTime',
							separator  : '/',
						})}
					</div>
				</div>

				<div
					role="button"
					tabIndex={0}
					className={styles.icon_container}
					onClick={upatePinnedStatus}
				>
					{sopData?.is_pinned ? <IcCPin /> : <IcMPin />}
				</div>
			</div>

			<div className={styles.line} />

			<div className={styles.heading}>{sopData?.heading}</div>
			<div className={styles.heading_edit_details}>
				Last Edited:
				{formatDate({
					date       : sopData?.updated_at,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
					formatType : 'dateTime',
					separator  : '/',
				})}
			</div>

			<div
				className={styles.container_rows}
				role="button"
				tabIndex={0}
				onMouseDown={() => setShowActions(true)}
			>
				<ol>
					{(blocks || []).map((obj) => (
						<ChildBlocks
							key={obj?.id}
							updatePermission={updatePermission}
							id={obj.id}
							mainData={obj?.mainData}
							sopData={sopData}
							blocks={blocks}
							setBlocks={setBlocks}
							ref={(r) => {
								sopCardRef.current[`${obj.id}`] = r;
							}}
						/>
					))}
				</ol>
			</div>

			{showActions ? (
				<div className={styles.action_buttons}>
					<Button
						disabled={loading}
						style={{ color: '#393F70', background: 'none' }}
						onClick={() => {
							handleAddBlocks();
						}}
					>
						+ Add More
					</Button>

					<Button onClick={update} disabled={loading}>
						Update
					</Button>
				</div>
			) : null}
		</div>
	);
}

export default SopCard;
