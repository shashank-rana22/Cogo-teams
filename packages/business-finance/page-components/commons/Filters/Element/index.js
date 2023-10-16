import {
	DateRangepicker,
	Textarea,
	Input,
	Modal,
	Pill,
	Select,
	MultiSelect,
	Tooltip,
	Datepicker,
	SingleDateRange,
	RadioGroup,
	Checkbox,
	Timepicker,
} from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import freightMapping from '../../Constants/freight-mappings';
import CostView from '../../costView/index';
import SegmentedControl from '../../SegmentedControl';

import styles from './styles.module.css';

function Element({
	type,
	value,
	className,
	url,
	href = '#',
	name,
	filters,
	checkboxLabel = '',
	radioOptions,
	...rest
}) {
	const [show, setShow] = useState(false);
	const { style, selectWidth, options, onlyNumbersAllowed = false } = rest;
	const { setFilters } = rest;
	const tagClick = (val) => {
		setFilters((prev) => ({
			...prev,
			[name]    : val.value,
			pageIndex : 1,
		}));
	};

	const getElement = () => {
		switch (type) {
			case 'tags':
				return (
					<div className={styles.flex} style={style}>
						{rest?.options?.map((val) => (
							<div
								role="presentation"
								key={val.value}
								style={{ margin: '5px' }}
								onClick={() => tagClick(val)}
							>
								<div
									className={val.value === filters[name]
										? styles.active
										: styles.normal}
								>
									{val.label}
								</div>
							</div>
						))}
					</div>
				);
			case 'href':
				return (
					<div style={style}>
						<div role="presentation" className={styles.url_container} onClick={() => setShow(true)}>
							{value}
						</div>
						{show && href && (
							<Modal
								className="primary lg"
								show={show}
								onClose={() => setShow(false)}
							>
								<CostView shipment_id={href} />
							</Modal>
						)}
					</div>
				);

			case 'pdfView':
				return (
					<div>
						<div
							className={styles.url_container}
							style={style}
							onClick={() => window.open(url, '_blank')}
							role="presentation"
						>
							{(value).length > 15 ? (
								<Tooltip interactive placement="top" content={value}>
									<div
										className={styles.text_div}
									>
										{`${(value).substring(0, 15)}...`}
									</div>
								</Tooltip>
							) : (
								<div className={styles.text_div}>{value}</div>
							)}
						</div>
					</div>
				);
			case 'pills':
				return (
					<>
						{rest?.options?.map((val) => (
							<Pill
								size="sm"
								color="yellow"
								className={className}
								style={style}
								key={val?.label}
							>
								{val?.label || ''}
							</Pill>
						))}
						;
					</>
				);
			case 'select':
				return (
					<div
						className={styles.select_container}
						style={{
							'--width': selectWidth || '200px',
						}}
					>
						<Select
							value={value}
							className={className}
							options={options || []}
							style={style}
							{...rest}
						/>
					</div>
				);
			case 'multiSelect':
				return (
					<div
						className={styles.select_container}
						style={{
							'--width': selectWidth || '200px',
						}}
					>
						<MultiSelect
							value={value}
							className={className}
							options={options || []}
							style={style}
							{...rest}
						/>
					</div>
				);
			case 'input':
				return (
					<Input
						value={value}
						style={style}
						className={className}
						prefix={<IcMSearchlight height={15} width={15} />}
						type={onlyNumbersAllowed ? 'number' : 'text'}
						{...rest}
					/>
				);
			case 'datepicker':
				return (
					<div className={styles.single_date}>
						<Datepicker
							name="date"
							value={value}
							style={style}
							{...rest}
						/>
					</div>

				);
			case 'singleDateRange':
				return (
					<div className={styles.single_date}>
						<SingleDateRange
							name="date"
							value={value}
							style={style}
							{...rest}
						/>
					</div>
				);
			case 'dateRangepicker':
				return (
					<DateRangepicker
						name="date"
						value={value}
						style={style}
						{...rest}
					/>
				);

			case 'serviceType':
				return (
					<div className={className} {...rest}>
						{freightMapping[value]?.name.replace(
							'_',
							'',
						) || '-'}
					</div>
				);
			case 'segmented':
				return (
					<SegmentedControl
						options={rest?.options || []}
						activeTab={(value) || ''}
						setActiveTab={(val) => {
							setFilters((p) => ({ ...p, [name]: val }));
						}}
						style={style}
						{...rest}
					/>
				);
			case 'textarea':
				return (
					<Textarea
						value={value}
						style={style}
						className={className}
						{...rest}
					/>
				);
			case 'fileUploader':
				return (
					<FileUploader
						className={className}
						style={style}
						value={value}
						name={name}
						{...rest}
					/>
				);
			case 'asyncSelect':
				return (
					<AsyncSelect
						className={className}
						value={value}
						style={style}
						{...rest}
					/>
				);
			case 'radioGroup':
				return (
					<RadioGroup
						className={className}
						style={style}
						value={value}
						options={radioOptions}
						id={String(rest?.id)}
						onChange={rest?.onChange}

					/>
				);
			case 'checkbox':
				return (
					<Checkbox
						className={className}
						style={style}
						value={value}
						label={String(checkboxLabel)}
						{...rest}
					/>
				);
			case 'timepicker':
				return (
					<Timepicker
						className={className}
						style={style}
						value={value}
						{...rest}
					/>
				);
			default:
				return (
					<div className={className} {...rest}>
						{value}
					</div>
				);
		}
	};
	return <div>{getElement()}</div>;
}

export default Element;
