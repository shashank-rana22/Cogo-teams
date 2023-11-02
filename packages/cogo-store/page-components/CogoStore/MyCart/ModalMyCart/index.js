import { Button, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMError } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ModalMyCart({
	list = [],
	show = false,
	setShow = () => {},
	onClose = () => {},
	getColorFromCode = () => {},
	currency_code = '',
}) {
	return (
		<Modal size="md" show={show} onClose={() => setShow(false)} placement="center">
			<Modal.Body>
				<IcMError
					className={styles.error_icon}
					height={60}
					width={60}
				/>

				<div className={styles.modal_q}>Are you sure you want to place your order?</div>
				{(list || []).map((item) => (
					<div className={styles.products} key={item.id}>
						<div className={styles.products_right}>
							<img
								src={item?.product_images[GLOBAL_CONSTANTS.zeroth_index]}
								alt=""
								height="80px"
								width="80px"
							/>
							<div className={styles.product_content}>
								<div className={styles.black}>{item.product_name}</div>
								<div className={styles.dot_list}>
									<span>Color</span>
									<div
										className={styles.color_dot}
										style={{
											backgroundColor : `${getColorFromCode(item.color_id)}`,
											border          : '1px solid rgba(0,0,0,.2)',
										}}
									/>
									<span>{item.size}</span>
									<span style={{ marginLeft: '4px' }}>{` x ${item.quantity}`}</span>
								</div>
							</div>
						</div>
						<div className={styles.amount_total}>
							{currency_code}
							{' '}
							{item.sub_total_amount}
						</div>
					</div>
				))}
			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="secondary"
					onClick={() => setShow(false)}
					className={styles.cancel_btn}
				>
					Cancel

				</Button>
				<Button themeType="accent" onClick={onClose}>Yes,Proceed</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalMyCart;
