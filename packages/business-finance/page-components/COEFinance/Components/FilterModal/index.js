import { Modal, Button, MultiSelect } from '@cogoport/components';
import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';
import { IcMFilter, IcCRedCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import Filter from '../../../commons/Filters';
import { FILTERS } from '../../configurations/filters_config';
import { CURRENCY_DATA } from '../../constants/constant';

import styles from './styles.module.css';

function FilterModal({ setFilters = () => {}, filters = {} }) {
	const [modalFilters, setModalFilters] = useState({
		currency    : [],
		serviceType : [],
	});
	const [showModal, setShowModal] = useState(false);
	const [currencies, setCurrencies] = useState([{}]);

	useEffect(() => {
		setModalFilters((prev) => ({
			...prev,
			currency: CURRENCY_DATA.filter((ite) => currencies.includes(ite.id)).map(
				(ite) => ite.text,
			),
		}));
	}, [currencies, setModalFilters]);

	const handleRemoveCurrency = (item) =>	{
		const currencyList = [...(modalFilters?.currency || [])];
		const newList = currencyList?.filter((currency) => currency !== item);
		setModalFilters((p) => ({
			...p,
			currency: newList,
		}));
	};

	const isFilterEmpty = Object.keys(modalFilters)?.length === 2
	&& isEmpty(modalFilters?.currency)
	&& isEmpty(modalFilters?.serviceType);

	const showRedDot = !isEmpty(filters?.currency)
						|| !isEmpty(filters?.serviceType)
							|| !!filters?.billDate || !!filters?.dueDate
							|| !!filters?.updateDate || !!filters?.billType;

	const clearFilters = () => {
		setModalFilters({
			currency    : [],
			serviceType : [],
		});
		setFilters((prev) => ({
			...prev,
			currency    : undefined,
			serviceType : undefined,
			billDate    : undefined,
			dueDate     : undefined,
			updatedDate : undefined,
			billType    : undefined,
		}));
		setCurrencies([]);
		setShowModal(false);
	};

	return (
		<div className={styles.modal_container}>
			<Modal
				size="md"
				placement="center"
				scroll={false}
				show={showModal}
				closeOnOuterClick={false}
				onClose={() => setShowModal(false)}
			>
				<Modal.Header
					title={
						<div className={styles.heading_container}>FILTERS</div>
				}
				/>

				<Modal.Body>
					<div className={styles.currencys}>Currency</div>
					<div
						style={{
							display      : 'flex',
							marginBottom : '24px',
							marginLeft   : '26px',
						}}
					>
						<div>
							<div className={styles.select_input}>
								<MultiSelect
									value={modalFilters?.currency}
									onChange={(val) => setModalFilters((prev) => ({ ...prev, currency: val }))}
									placeholder="Select Currency"
									options={getCurrencyOptions()}
									size="md"
								/>
							</div>

							<li className={styles.selected_items_container}>
								{modalFilters?.currency?.map((item) => (
									<div key={item?.label} className={styles.items}>
										<div className={styles.selected_options}>{item}</div>
										<div
											className={styles.cross}
											onClick={() => {
												handleRemoveCurrency(item);
											}}
											role="presentation"
										>
											&#10005;
										</div>
									</div>
								))}
							</li>

						</div>
					</div>

					<div className={styles.container_filter}>
						<Filter
							controls={FILTERS}
							filters={modalFilters}
							setFilters={setModalFilters}
						/>
					</div>
					<div className={styles.buttons}>
						<div className={styles.clear}>
							<Button
								themeType="secondary"
								onClick={clearFilters}
								disabled={isFilterEmpty}
							>
								Clear Filters
							</Button>
						</div>
						<div>
							<Button
								disabled={isFilterEmpty}
								onClick={() => {
									setFilters((prev) => ({ ...prev, ...modalFilters }));
									setShowModal(false);
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
				Filters
				{' '}
				<span className={styles.icon}>
					<IcMFilter />
				</span>
				{showRedDot ? (
					<IcCRedCircle
						height={8}
						width={8}
						style={{ marginBottom: '12px' }}
					/>
				) : null }
			</div>
		</div>
	);
}

export default FilterModal;
