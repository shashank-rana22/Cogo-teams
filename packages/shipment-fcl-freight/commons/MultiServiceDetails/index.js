import { Popover, Button } from '@cogoport/components';
import React, { useState } from 'react';

import ContainerInfo from '../CargoDetails/CargoDetailsPills';

import styles from './styles.module.css';

function MultiServiceDetails({
	children,
	mainServices = {},
	showSingle = false,
	withButton = true,
}) {
	const [show, setShow] = useState(false);

	if (mainServices.length <= 1 && !showSingle) {
		return null;
	}
	const renderBody = () => (

		mainServices.map((item) => (
			<div className={styles.container_info}>
				<ContainerInfo detail={item} className="details" />
			</div>
		))

	);

	return (
		<Popover
			theme="light"
			show={show}
			placement="bottom"
			render={renderBody()}
		>
			{withButton ? (
				<Button
					style={{
						background : 'none',
						padding    : 2,
						color      : '#366EFD',
						border     : 'none',
						height     : 'auto',
					}}
					onClick={() => setShow(false)}
				>
					{children}
				</Button>
			) : (
				{ children }
			)}
		</Popover>
	);
}
export default MultiServiceDetails;
