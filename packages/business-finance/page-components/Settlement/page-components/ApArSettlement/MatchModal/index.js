import { Modal, Button, Datepicker } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

export default function MatchModal({
	matchModalShow,
	setMatchModalShow,
	totalMatchingBalance, selectedData,
	// setSelectedData,
}) {
	function onClose() {
		setMatchModalShow(false);
	}
	const INDEX = 0;
	const [date, setDate] = useState('');
	// console.log(selectedData[0]);
	return (

		<Modal
			size="xl"
			className={styles.container}
			show={matchModalShow}
			onClose={() => onClose()}
			placement="center"
			scroll
		>
			<Modal.Header title={
                (
	<>
		<div>
			MATCHING
			{' '}
			<sub>( Drag and drop to set the matching hierarchy )</sub>
		</div>
		<br />
		<div style={{ display: 'flex', alignItems: 'center' }}>

			<div>
				Matching Balance
				{' '}
				{selectedData[INDEX]?.currency}
				{' '}
				{totalMatchingBalance}
			</div>
			<div style={{ margin: '1rem' }}>
				Settlement Date
				<Datepicker
					placeholder="Enter Date"
					// showTimeSelect
					dateFormat="MM/dd/yyyy"
					name="date"
					onChange={(e) => { setDate(e); }}
					value={date}
				/>
			</div>
		</div>
	</>
			)
        }
			/>

			<Modal.Body>
				et consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
				consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda.
				Hic ipsam doloremque assumenda
				et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
				Pariatur eaque aut sunt?
				et consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
				consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda.
				Hic ipsam doloremque assumenda
				et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
				Pariatur eaque aut sunt?
				et consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
				consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda.
				Hic ipsam doloremque assumenda
				et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
				Pariatur eaque aut sunt?
				et consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
				consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda.
				Hic ipsam doloremque assumenda
				et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
				Pariatur eaque aut sunt?
				et consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
				consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda.
				Hic ipsam doloremque assumenda
				et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
				Pariatur eaque aut sunt?
				consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda.
				Hic ipsam doloremque assumenda
				et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
				Pariatur eaque aut sunt?
				et consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
				consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda.
				Hic ipsam doloremque assumenda
				et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
				Pariatur eaque aut sunt?
				et consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
				consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda.
				Hic ipsam doloremque assumenda
				et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
				Pariatur eaque aut sunt?consequuntur,

				voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda.
				Hic ipsam doloremque assumenda
				et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
				Pariatur eaque aut sunt?
				et consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
				consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda.
				Hic ipsam doloremque assumenda
				et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
				Pariatur eaque aut sunt?
				et consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
				consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda.
				Hic ipsam doloremque assumenda
				et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
				Pariatur eaque aut sunt?
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={() => onClose()}>Cancel</Button>
			</Modal.Footer>
		</Modal>
	);
}
// style={{ width: '1200px', height: '650px' }}
