import {
	Loader,
	Radio,
	Modal,
	Toggle,
	Button, RadioGroup, Chips, CheckboxGroup, Popover, Tooltip, Select,
} from '@cogoport/components';
import { IcMDelete, IcMInfo } from '@cogoport/icons-react';
import { format, startCase } from '@cogoport/utils';
import { useState } from 'react';

import SelectAccrual from '../../../../commons/SelectAccrual';
import useSaveCustom from '../../../hooks/useSaveCustom';
import useSaveCustomList from '../../../hooks/useSaveCustomList';
import { OptionMonth } from '../../SourceFile/utils';
import { entityMapping, optionsCheck, optionsPeriod, optionsPills, optionsRadio } from '../constant';

import ModalMonth from './ModalMonth';
import styles from './styles.module.css';

function Card({
	filters,
	setFilters,
	selectFilter,
	setSelectFilter,
	fetchRatioApi,
	fetchReportApi,
	select,
	setSelect,
	setShowReport,
	setFiltersData,
	reportTriggerLoading,
}) {
	const [modal, setModal] = useState(false);
	const [customModal, setCustomModal] = useState(false);
	const { refetch, saveLoading } = useSaveCustom({ filters });
	const {
		refetch:refetchSave, saveData, loading, LoadingDelete,
		refetchDelete,
	} = useSaveCustomList({ setCustomModal });

	const content = () => (
		<div className={styles.content_container}>
			<div>Rows</div>
			<div className={styles.border} />
			<CheckboxGroup
				style={{ flexDirection: 'column', width: '100%' }}
				options={optionsCheck}
				onChange={(val) => { setFilters((prev) => ({ ...prev, rowCheck: val })); }}
				value={filters?.rowCheck}
			/>
		</div>
	);

	const handleClick = () => {
		fetchRatioApi(setShowReport);
		fetchReportApi(setShowReport);
	};

	const handleCustom = () => {
		refetchSave();
	};

	const contentRadioData = () => (
		<div>
			<div className={styles.chips}>
				<Chips
					size="md"
					items={optionsPills}
					selectedItems={filters?.chip}
					onItemChange={(val:string) => { setFilters((prev) => ({ ...prev, chip: val })); }}
				/>
			</div>
			<div className={styles.radio}>
				<RadioGroup
					options={optionsRadio(filters?.chip)}
					onChange={(val) => { setFilters((prev) => ({ ...prev, radio: val })); }}
					value={filters?.radio}
				/>
			</div>

		</div>
	);
	const rest = { onClickOutside: () => { setSelect(false); setSelectFilter(false); } };

	const handleEvent = (event, filtersItem) => {
		if (event.target.checked) {
			setFiltersData(JSON.parse(filtersItem));
		}
	};

	const handleDelete = (item) => {
		refetchDelete(item);
	};

	return (
		<div>
			<div className={styles.container}>
				<div>
					<div className={styles.period}>
						Selection Criteria
						<Tooltip
							content={<div className={styles.tool}>Please select the accounting month</div>}
							placement="top"
						>
							<div className={styles.info_icon_container}>
								<IcMInfo />
							</div>
						</Tooltip>
					</div>

					<div className={styles.hr_period} />

					<div className={styles.select_container}>
						<div>
							<div className={styles.bold_font_data}>Entity*</div>
							<Select
								value={filters?.entity}
								onChange={(val:string) => { setFilters((prev) => ({ ...prev, entity: val })); }}
								placeholder="Entity"
								options={[
									{ label: 'Entity 201', value: '201' },
									{ label: 'Entity 301', value: '301' },
									{ label: 'Entity 401', value: '401' },
									{ label: 'Entity 501', value: '501' },
								]}
								isClearable
								style={{ width: '150px' }}
							/>
						</div>

						<div>
							<div className={styles.bold_font_data}>Month*</div>
							<Select
								value={filters?.date}
								onChange={(val:string) => { setFilters((prev) => ({ ...prev, date: val })); }}
								placeholder="Month"
								options={OptionMonth()}
								disabled={filters?.category}
								isClearable
								style={{ width: '150px' }}
							/>

						</div>
						<div>

							<div className={styles.bold_font_data}>Report Period*</div>
							<Select
								value={filters?.category}
								onChange={(val:string) => { setFilters((prev) => ({ ...prev, category: val })); }}
								placeholder="Category"
								options={optionsPeriod}
								disabled={filters?.month}
								isClearable
								style={{ width: '180px' }}
							/>
						</div>

						<div>
							<div className={styles.bold_font_data}>Show non zero active only*</div>
							<Popover
								placement="bottom"
								caret={false}
								render={content()}
								visible={select}
								{...rest}
							>
								<div
									className={styles.select_popover}
									onClick={() => { setSelect(!select); }}
									role="presentation"
								>
									<SelectAccrual
										value={startCase(filters?.rowCheck) || startCase(filters?.colCheck)}
										placeholder="Category"
										setFilters={setFilters}
									/>
								</div>

							</Popover>

						</div>
						<div>
							<div className={styles.bold_font_data}>View Data By*</div>
							<Popover
								placement="bottom"
								caret={false}
								render={contentRadioData()}
								visible={selectFilter}
								{...rest}
							>
								<div
									className={styles.select_popover}
									onClick={() => { setSelectFilter(!selectFilter); }}
									role="presentation"
								>
									<SelectAccrual
										value={startCase(filters?.radio)}
										placeholder="Choose Customization"
										setFilters={setFilters}
									/>
								</div>

							</Popover>

						</div>
					</div>
					<div className={styles.buttons}>
						<Button
							themeType="secondary"
							onClick={() => {
								handleCustom();
							}}
							loading={loading}
						>
							View saved Customizations

						</Button>

						{customModal && (
							<Modal show={customModal} onClose={() => { setCustomModal(false); }} size="xl">
								<Modal.Header title="Customized Filters" />
								<Modal.Body>
									{saveData.map((item, index) => {
										const { filters:filtersItem } = item || {};

										const {
											cogoEntityId = '', month = '', rowCheck,
											radio = '', chip = '',
										} = JSON.parse(filtersItem) || {};

										return (
											<div className={styles.filters}>
												<div className={styles.radio_filters}>
													<div>
														<Radio
															name="checked1"
															onChange={(event) => { handleEvent(event, filtersItem); }}
														/>

													</div>
													<div>
														Filter
														{index + 1}
													</div>
												</div>

												<div className={styles.border_filter} />
												<div>
													Entity
													<div className={styles.bold_font}>
														{entityMapping[cogoEntityId] || '--'}

													</div>
												</div>
												<div>
													Report Period
													<div className={styles.bold_font}>
														{ month ? format(month, 'dd MMM yyy') : '--'}
														{' '}
													</div>
												</div>
												<div>
													Show Non Zero Active Only
													<div className={styles.bold_font}>
														Rows -
														{' '}
														{rowCheck ? startCase(rowCheck[0]) : '--'}

														{ rowCheck ? startCase(rowCheck[1]) : ''}
													</div>
												</div>

												<div>
													View Data By
													<div className={styles.bold_font}>
														{chip || '--'}
														{' '}
														-
														{' '}
														{radio || '---'}
													</div>
												</div>
												<div
													className={styles.delete_icon}
													onClick={() => { handleDelete(item); }}
													role="presentation"
												>
													{LoadingDelete
														? <Loader />
														: <IcMDelete height="20px" width="20px" />}

												</div>
											</div>
										);
									})}

								</Modal.Body>
								<Modal.Footer>
									<Button onClick={() => {
										handleClick();
										setCustomModal(false);
									}}
									>
										Apply Filter

									</Button>
								</Modal.Footer>
							</Modal>
						) }
						<Button
							themeType="secondary"
							onClick={() => { refetch(); }}
							loading={saveLoading}
						>
							Save Customizations

						</Button>
						<Button
							onClick={() => { handleClick(); }}
							disabled={!(filters?.entity && (filters?.date || filters?.category))}
							loading={reportTriggerLoading}
						>
							Run Report
						</Button>

					</div>
				</div>

			</div>

			<div className={styles.toggle_data}>
				<div>
					<Toggle
						name="mode"
						size="md"
						offLabel="Comparison Mode"
						showOnOff
						value={filters?.mode}
						onChange={(e) => {
							setFilters((prev) => ({ ...prev, mode: !!e?.target?.checked }));
							setModal(e?.target?.checked);
						}}
					/>
				</div>

				{modal && (

					<ModalMonth modal={modal} setModal={setModal} filters={filters} setFilters={setFilters} />

				)}

				<div>
					<Toggle
						name="ratio"
						size="md"
						onLabel="Value Ratio"
						offLabel="Volume Ratio"
						showOnOff
						value={filters?.ratio}
						onChange={(e) => {
							setFilters((prev) => ({ ...prev, ratio: e?.target?.checked ? 'VALUE' : 'VOLUME' }));
						}}
					/>
				</div>
			</div>
		</div>

	);
}
export default Card;
