import { Popover, Button } from '@cogoport/components';
import React, { useState } from 'react';

import { DECREMENT_BY_ONE, VALUE_ONE } from '../../../../../constants';
import ContainerInfo from '../CargoDetailPills';

import styles from './styles.module.css';

function MultiServiceDetails({
	mainServices,
}) {
	const [show, setShow] = useState(false);

	if (mainServices?.length <= VALUE_ONE) {
		return null;
	}

	const renderBody = () => (
		mainServices?.map((item) => (
			<div key={item} className={styles.container}>
				<ContainerInfo detail={item} className="details" />
			</div>
		))
	);

	return (
		<Popover
			theme="light"
			show={show}
			placement="bottom"
			interactive
			onOuterClick={() => setShow(false)}
			trigger="mouseenter"
			content={renderBody()}
		>
			<Button
				style={{
					background : 'none',
					padding    : 2,
					color      : '#366EFD',
					border     : 'none',
					height     : 'auto',
				}}
				onClick={() => setShow(true)}
			>
				+
				{' '}
				{mainServices.length - DECREMENT_BY_ONE}
				{' '}
				More Details
			</Button>
		</Popover>
	);
}
export default MultiServiceDetails;
