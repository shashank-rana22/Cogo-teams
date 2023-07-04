import { Modal, Button, MultiSelect, Pill } from '@cogoport/components';
import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';
import { IcMFilter, IcCRedCircle, IcMCross } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import Filter from '../../../commons/Filters';
import { GenericObject } from '../../../commons/Interfaces';
import { FILTERS } from '../../configurations/filters_config';
import { CURRENCY_DATA } from '../../constants/constant';

import styles from './styles.module.css';

interface Props {
	filters: GenericObject;
	setFilters: (p: object) => void;
}
interface Ite {
	id?: string;
	icon?: JSX.Element;
	text?: string;
}

function FilterModal({ filters, setFilters }: Props) {
	const [showModal, setShowModal] = useState(false);

	const isFilterApplied = () => {
		if (
			filters?.billDate
      || filters?.billType
      || filters?.dueDate
      || filters?.serviceType?.length > 0
      || filters?.updatedDate
      || filters?.currency?.length > 0
		) {
			return true;
		}
		return false;
	};

	const [currencies, setCurrencies] = useState([{}]);

	useEffect(() => {
		setFilters((prev) => ({
			...prev,
			currency: CURRENCY_DATA.filter((ite) => currencies.includes(ite.id)).map(
				(ite) => ite.text,
			),
		}));
	}, [currencies, setFilters]);

	const handleClose = () => {
		setFilters({});
		setCurrencies([]);
		setShowModal(false);
	};
	const handleRemoveCurrency = (item, index) => {
		const currencyList = filters?.currency;
		currencyList.splice(index, 1);
		setFilters(() => ({
			...filters,
			currency: currencyList,
		}));
		console.log(filters, index, item, currencyList);
	};
	console.log(filters);
	return (
		<div className={styles.modal_container}>
			<Modal
				size="md"
				placement="center"
				scroll={false}
				show={showModal}
				onClose={() => {
					handleClose();
				}}
			>
				<Modal.Header
					title={
            (
	<div className={styles.heading_container}>FILTERS</div>
            ) as never as string
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
						{/* {CURRENCY_DATA.map((item) => {
							const { id, icon, text }: Ite = item;
							return (
								<div
									key={id}
									className={cl`${styles.currency_values}
											${currencies.includes(id as keyof typeof currencies)
										? styles.selected : styles.unselected
									} ${styles.currency_filter}`}
									onClick={() => {
										if (currencies?.includes(id)) {
											const value = currencies.filter((it) => it !== item?.id);
											setCurrencies(value);
										} else {
											setCurrencies([...currencies, id]);
										}
									}}
									role="presentation"
								>
									<div className="iconShow">{icon}</div>
									<div className="textShow">{text}</div>
								</div>
							);
						})} */}
						<div>

							{/* <div className={styles.text}>Other Currencys</div> */}
							<div className={styles.select_input}>
								{JSON.stringify(filters?.currency)}
								{JSON.stringify(filters)}
								<MultiSelect
									value={filters?.currency}
									onChange={(val:string[]) => setFilters({ currency: val })}
									placeholder="select currency"
									options={getCurrencyOptions()}
									size="md"
								/>
							</div>

							{filters?.currency?.map((item, index) => (
								<span key={item} className={styles.select_currency}>
									<span className={styles.currency_lebal}>
										{item}
									</span>
									<Button
										size="sm"
										themeType="tertiary"
										className={styles.cross_button}
										onClick={() => handleRemoveCurrency(item, index)}
									>
										<IcMCross width={10} height={10} />

									</Button>
								</span>
							))}

						</div>
					</div>

					<div className={styles.container_filter}>
						<Filter
							controls={FILTERS}
							filters={filters}
							setFilters={setFilters}
						/>
					</div>
					<div className={styles.buttons}>
						<div className={styles.clear}>
							<Button
								themeType="secondary"
								onClick={() => {
									setFilters({});
									setCurrencies([]);
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
				{isFilterApplied() && <IcCRedCircle height={8} width={8} />}
			</div>
		</div>
	);
}

export default FilterModal;
