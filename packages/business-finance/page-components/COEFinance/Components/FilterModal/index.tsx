import { Modal, Button, MultiSelect } from '@cogoport/components';
import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';
import { IcMFilter, IcCRedCircle } from '@cogoport/icons-react';
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
	const handleRemoveCurrency = (item) =>	{
		const currencyList = [...(filters?.currency || [])];
		currencyList.splice(item, 1);
		setFilters(() => ({
			currency: currencyList,
		}));
	};

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
						<div>
							<div className={styles.select_input}>
								<MultiSelect
									value={filters?.currency}
									onChange={(val:string[]) => setFilters((prev) => ({ ...prev, currency: val }))}
									placeholder="Select Currency"
									options={getCurrencyOptions()}
									size="md"
								/>
							</div>

							<li className={styles.selected_items_container}>
								{filters?.currency?.map((item) => (
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
