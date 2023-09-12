import { Button, Toggle, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import Filters from './Filters';
import styles from './styles.module.css';

function Header(props) {
	const {
		setTncLevel,
		viewFromDemand,
		filterProps,
		setEditTncModalId,
		currentStatus,
		setCurrentStatus,
		setPagination,
	} = props;

	const {
		general: { isMobile = false },
	} = useSelector((state) => state);
	// const { fields, applyFilters, reset, controls, watch, filters, control } = filterProps;

	const onChangeToggleStatus = () => {
		setCurrentStatus((pv) => (pv === 'active' ? 'inactive' : 'active'));
		setPagination(1);
	};
	const [visible, setVisible] = useState(false);
	return (
		<div className={styles.container}>
			<Button
				className={`primary ${viewFromDemand ? 'sm' : 'md'}`}
				onClick={() => {
					setTncLevel('basicInfo');
					setEditTncModalId(true);
				}}
				style={{ textTransform: 'capitalize' }}
			>
				Create
				{' '}
				{isMobile ? 'T & C' : 'New'}
			</Button>
			<Toggle
				offLabel={{ label: 'Inactive', value: 'inactive' }}
				onLabel={{ label: 'Active', value: 'active' }}
				// onChange={onChangeToggleStatus}
			/>
			<div className={styles.filters_container}>
				<Popover
					placement="left"
					caret={false}
					render={<Filters filterProps={filterProps} setVisible={setVisible} />}
					visible={visible}
					onClickOutside={() => setVisible(false)}
				>
					<Button onClick={() => setVisible(!visible)}>
						Filter
						<IcMFilter />
					</Button>
				</Popover>
			</div>
		</div>
	);
}

export default Header;
