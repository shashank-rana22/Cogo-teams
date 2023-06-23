import { Modal, Button } from '@cogoport/components';
import { IcMFilter, IcCRedCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import Filter from '../../../commons/Filters/index.tsx';
import { moreFilters } from '../configurations/moreFiltersconfig';
import { CURRENCY_DATA } from '../Constants';

import styles from './styles.module.css';

const FILTER_LENGTH = 3;

function FilterModal({ filters = {}, setFilters = () => { } }) {
	const [showModal, setShowModal] = useState(false);
	const [modalFilters, setModalFilters] = useState({});
	const { currency = '' } = modalFilters || {};

	const handleClose = () => {
		setShowModal(false);
	};

	return (
		<div className={styles.modal_container}>
			<Modal
				size="md"
				placement="center"
				scroll={false}
				show={showModal}
				onClose={handleClose}
			>
				<Modal.Header
					title={(<div className={styles.heading_container}>FILTERS</div>)}
				/>

				<Modal.Body>
					<div className={styles.currencys}>Currency</div>
					<div className={styles.currencycontainer}>
						{CURRENCY_DATA.map((item) => {
							const { icon: Icon, text } = item;
							return (
								<div
									className={`${styles.currency_values} 
									${currency === text ? styles.selected : styles.unselected}`}
									key={text}
									onClick={() => {
										if (currency === text) {
											setModalFilters({ ...modalFilters, currency: undefined, pageIndex: 1 });
										} else {
											setModalFilters({ ...modalFilters, currency: text, pageIndex: 1 });
										}
									}}
									role="presentation"
								>
									<div className="iconShow">
										<Icon height={25} width={25} />
									</div>
									<div className="textShow">{text}</div>
								</div>
							);
						})}
					</div>

					<div className={styles.container_filter}>
						<Filter
							controls={moreFilters}
							filters={modalFilters}
							setFilters={setModalFilters}
						/>
					</div>
					<div className={styles.buttons}>
						<div className={styles.clear}>
							<Button
								themeType="secondary"
								onClick={() => {
									setFilters({
										pageIndex   : 1,
										pageSize    : 10,
										invoiceView : filters?.invoiceView || '',
										category    : filters?.category || '',
									});
									setModalFilters({});
									setShowModal(false);
								}}
							>
								Clear Filters
							</Button>
						</div>
						<div>
							<Button
								onClick={() => {
									setShowModal(false);
									setFilters({ ...filters, ...modalFilters });
								}}
							>
								Apply
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
			<div
				role="presentation"
				className={styles.filter_button}
				onClick={() => {
					setShowModal(true);
				}}
			>
				MoreFilters
				<span className={styles.icon}>
					<IcMFilter />
				</span>
				{Object.keys(filters)?.filter((key) => ((key !== 'category')
					&& (!isEmpty(filters?.[key])))).length > FILTER_LENGTH
					&& <IcCRedCircle height={8} width={8} />}
			</div>
		</div>
	);
}

export default FilterModal;
