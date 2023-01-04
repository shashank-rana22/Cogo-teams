import { Input, Popover, Button } from '@cogoport/components';
import { IcMSearchlight, IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import Filters from '../Filters';

import styles from './styles.module.css';

function Header({ hookSetters = {}, activeTab = '' }) {
	const [serialId, setSerialId] = useState('');
	const [showFilters, setShowFilters] = useState(false);
	const handleChangeSerial = (value) => {
		hookSetters.setFilters({ q: value });
		setSerialId(value);
	};

	const renderBody = (
		<Filters
			hookSetters={hookSetters}
			setShowFilters={setShowFilters}
			activeTab={activeTab}
		/>

	);
	return (
		<>
			<h1>
				FCL Revenue Desk
			</h1>
			<div className={styles.row}>

				<div className={styles.input}>
					<Input
						name="q"
						value={serialId}
						onChange={(e) => handleChangeSerial(e)}
						placeholder="Search by SID"
						style={{ width: '300px' }}
						prefix={<IcMSearchlight widht="20px" height="20px" />}
					/>
				</div>
				<div className={styles.fcl_filters}>
					<Popover
						render={renderBody}
						placement="left"
						className={styles.filter_popover}
						trigger="mouseenter"
					>
						<Button
							themeType="accent"
							onClick={() => setShowFilters(!showFilters)}
							className={styles.filter_button}
						>
							<IcMFilter width="20px" height="28px" />
						</Button>
					</Popover>
				</div>

			</div>
			<div />

		</>
	);
}
export default Header;
