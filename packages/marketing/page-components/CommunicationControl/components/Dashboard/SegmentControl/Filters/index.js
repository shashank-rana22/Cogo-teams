import { Tabs, TabPanel, Button, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import Layout from '../../../../common/Layout';
import getControls from '../../../../configurations/segment-filter-controls';
import removeObjEmptyValue from '../../../../utils/removeObjEmptyValue';

import styles from './styles.module.css';

const STATUS_FILTER_OPTIONS = [
	{ label: 'ACTIVE', value: 'active' },
	{ label: 'INACTIVE', value: 'deactive' },
];
function Filters({ statusFilter = '', setStatusFilter = () => {}, setShowAddModal = () => {}, setFilters = () => {} }) {
	const [isOpen, setIsOpen] = useState(false);

	const DEFAULT_VALUES = {};
	getControls.forEach((ctrl) => { DEFAULT_VALUES[ctrl?.name] = ctrl?.value; });
	const { control, formState:{ errors }, watch, reset } = useForm({ defaultValues: DEFAULT_VALUES });
	const formValues = watch();

	const onSubmit = () => {
		setFilters(removeObjEmptyValue(formValues));
		setIsOpen(false);
	};
	const onReset = () => {
		reset();
		setFilters({});
		setIsOpen(false);
	};

	return (
		<div className={styles.container}>
			<Tabs
				activeTab={statusFilter}
				themeType="tertiary"
				onChange={setStatusFilter}
			>
				{STATUS_FILTER_OPTIONS.map((item) => (
					<TabPanel
						key={item?.id}
						name={item.value}
						title={item.label}
					/>
				))}
			</Tabs>
			<div className={styles.btn_container}>
				<Button
					onClick={() => setShowAddModal(true)}
					className={styles.btn}
				>
					ADD RULES
				</Button>
				<div className={styles.popver_container}>
					<Popover
						placement="bottom"
						visible={isOpen}
						onClickOutside={() => { setIsOpen(false); }}
						render={(
							<div>
								<div className={styles.filter_header}>
									<h3>Filters</h3>
									<div className={styles.filter_btn_container}>
										<Button
											themeType="secondary"
											size="sm"
											style={{ marginRight: 5 }}
											onClick={() => { onReset(); }}
										>
											RESET FORM
										</Button>
										<Button
											size="sm"
											onClick={() => { onSubmit(); }}
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
						<div>
							<Button
								onClick={() => { setIsOpen((prev) => !prev); }}
								className={styles.btn}
							>
								FILTER BY
								<IcMFilter style={{ marginLeft: 4 }} />
							</Button>
						</div>
					</Popover>
				</div>
			</div>
		</div>
	);
}
export default Filters;
