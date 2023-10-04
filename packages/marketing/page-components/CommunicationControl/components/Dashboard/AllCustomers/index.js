import { Table, Placeholder, Button, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import Layout from '../../../common/Layout';
import TableView from '../../../common/TableView';
import getControls from '../../../configurations/all-customers-filter-controls';
import useGetCustomers from '../../../hooks/useGetCustomers';
import removeObjEmptyValue from '../../../utils/removeObjEmptyValue';

import getColumns from './Columns';
import styles from './styles.module.css';

const FIRST_PAGE = 1;

function AllCustomers() {
	const [isOpen, setIsOpen] = useState(false);
	const {
		data = {}, loading = false, setFilters = () => {},
		pagination = FIRST_PAGE, setPagination = () => {},
	} = useGetCustomers();
	const cols = getColumns({ data });

	const loadingColumn = [
		{
			Header   : 'LOADING...',
			accessor : (item) => (
				<Placeholder key={item?.id} height="50px" />
			),
		},
	];

	const { control, formState:{ errors }, reset, handleSubmit } = useForm();

	const onSubmit = (values) => {
		setFilters(removeObjEmptyValue(values));
		setIsOpen(false);
	};
	const onReset = () => {
		reset();
		setFilters({});
		setIsOpen(false);
	};

	if (loading) {
		return (
			<div className={styles.table_container}>
				<Table
					columns={loadingColumn}
					data={[{}, {}, {}]}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.popover_container}>
				<Popover
					placement="bottom"
					visible={isOpen}
					onClickOutside={() => { setIsOpen(false); }}
					content={(
						<div>
							<div className={styles.filter_header}>
								<h3>Filters</h3>
								<div className={styles.filter_btn_container}>
									<Button
										themeType="secondary"
										size="sm"
										style={{ marginRight: 5 }}
										onClick={() => onReset()}
									>
										RESET FORM
									</Button>
									<Button
										size="sm"
										onClick={() => handleSubmit(onSubmit)()}
									>
										SHOW RESULTS
									</Button>
								</div>
							</div>
							<Layout
								control={control}
								controls={getControls}
								errors={errors}
							/>
						</div>
					)}
				>
					<Button
						onClick={() => { setIsOpen(!isOpen); }}
					>
						FILTER BY
						<IcMFilter style={{ marginLeft: 5 }} />
					</Button>
				</Popover>
			</div>

			<TableView
				columns={cols}
				data={data}
				pagination={pagination}
				setPagination={setPagination}
				loading={loading}
			/>
		</div>
	);
}
export default AllCustomers;
