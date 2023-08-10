import { Button, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMCrossInCircle, IcMFilter, IcCRedCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import Layout from '../../commons/Layout';
import controls from '../../configurations/filters-controls';

import styles from './styles.module.css';

function Filters({ filters, setFilters, activeTab }) {
	const [open, setOpen] = useState(false);

	const { control, handleSubmit, reset, formState:{ errors } } = useForm();

	const handleData = (val) => {
		setFilters(val);
		setOpen(false);
	};

	const handleReset = () => {
		setFilters({});
		reset();
		setOpen(false);
	};
	const showFilterDot = () => {
		const isFilterApplied = Object.values(filters).some((value) => !isEmpty(value));

		return isFilterApplied ? <IcCRedCircle height={8} width={8} className={styles.filter_dot} /> : null;
	};

	useEffect(() => {
		reset();
		setFilters({});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab]);

	return (
		<Popover
			placement="bottom"
			trigger="click"
			render={(
				<div className={styles.pop_container}>
					<div className={styles.header}>
						<div className={styles.heading}>Filters</div>
						<Button
							themeType="tertiary"
							onClick={() => setOpen(false)}
						>
							<IcMCrossInCircle width={18} height={18} fill="#333" />
						</Button>
					</div>
					<Layout
						control={control}
						fields={controls}
						errors={errors}
					/>
					<div className={styles.styled_button}>
						<Button
							themeType="secondary"
							onClick={() => handleReset()}
							style={{ marginRight: 12 }}
						>
							Clear
						</Button>
						<Button
							onClick={handleSubmit(handleData)}
						>
							Apply
						</Button>
					</div>
				</div>
			)}
			visible={open}
		>
			<Button
				themeType="secondary"
				size="md"
				onClick={() => {
					setOpen((prev) => !prev);
				}}
				style={{ marginLeft: '8px' }}
			>
				<IcMFilter
					width={20}
					height={20}
					fill="#ee3425"
					style={{ padding: '1px 1px 2px 2px' }}
				/>
				{showFilterDot()}
			</Button>
		</Popover>
	);
}

export default Filters;
