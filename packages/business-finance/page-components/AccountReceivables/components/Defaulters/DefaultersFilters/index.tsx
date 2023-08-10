import { Button, Popover, Input } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import Filter from '../../../../commons/Filters';

import { defaultersControls } from './controls';
import PopoverFilters from './PopoverFilters';
import styles from './styles.module.css';

interface Global {

	status?:string

	services?:string[]

	invoiceDate?:{ startDate?:Date, endDate?:Date }

	dueDate?:{ startDate?:Date, endDate?:Date }

	currency?:string

	search?:string

}

interface Props {

	globalFilters?: Global,

	setGlobalFilters?:(p: object) => void,

	isClear?:boolean,

	clearFilters?:Function

}

function DefaultersFilters({ globalFilters, setGlobalFilters, isClear, clearFilters }:Props) {
	const [visible, setVisible] = useState(false);

	const control = defaultersControls({ globalFilters });

	const popoverContent = () => (
		<PopoverFilters
			globalFilters={globalFilters}
			setGlobalFilters={setGlobalFilters}
			setVisible={setVisible}
		/>
	);

	return (
		<div>
			<div className={styles.filter_container}>
				<div className={styles.left_filters}>
					<div>
						<Filter
							controls={control}
							filters={globalFilters}
							setFilters={setGlobalFilters}
						/>
					</div>
					<div>
						<Popover visible={visible} placement="bottom" render={popoverContent()}>
							<Button
								size="md"
								themeType="secondary"
								onClick={() => setVisible(!visible)}
							>
								+ More Filters
								<span className={styles.icon}>
									<IcMFilter />
								</span>
							</Button>
						</Popover>
					</div>
					{!isClear && (
						<Button
							style={{ marginLeft: '8px' }}
							onClick={() => clearFilters()}
						>
							Clear Filters

						</Button>
					)}
				</div>
				<div className={styles.search}>
					<Input
						value={globalFilters?.search}
						onChange={(value) => { setGlobalFilters((prev:object) => ({ ...prev, search: value })); }}
						placeholder="Search by Customer Name /Invoice number /SID"
						suffix={(
							<div style={{ margin: '4px', display: 'flex' }}>
								<IcMSearchlight height={15} width={15} />
							</div>
						)}
					/>
				</div>
			</div>
		</div>
	);
}

export default DefaultersFilters;
