import { Tabs, TabPanel } from '@cogoport/components';
// import ScopeSelector from '@cogoport/forms/page-components/Business/ScopeSelect';
// import { IcMFilter } from '@cogoport/icons-react';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import { cogoOneLogo } from '../../constants';

import styles from './styles.module.css';

function Header({ timeline, setTimeline }) {
	const { query, back } = useRouter();
	const { id: agentId = '' } = query || {};
	// const [filterVisible, setFilterVisible] = useState(false);
	// const [filters, setFilters] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{agentId && (
					<IcMArrowBack className={styles.back_icon} onClick={() => back()} />
				)}
				<div>
					<img
						src={cogoOneLogo}
						alt="-"
					/>
				</div>
				<div className={styles.heading_name}>ogoOne Dashboard</div>
			</div>

			<div className={styles.header_right_section}>

				{/* <ScopeSelector /> */}
				<div className={styles.filter_dot} />
				{/* <div className={styles.filter_icon}>
        <Popover
            placement="left"
            render={(
                <Filter
                    setFilterVisible={setFilterVisible}
                    filters={filters}
                    setFilters={setFilters}
                />
            )}
            visible={filterVisible}
            onClickOutside={() => setFilterVisible(false)}
        >

            <IcMFilter width={25} height={25} onClick={() => setFilterVisible(!filterVisible)} />
        </Popover>
    </div> */}

				<Tabs
					activeTab={timeline}
					themeType="tertiary"
					onChange={setTimeline}
					className={styles.tabs_style}
				>
					<TabPanel name="day" title="Day" />
					<TabPanel name="week" title="Week" />
					<TabPanel name="month" title="Month" />
				</Tabs>

			</div>

		</div>
	);
}

export default Header;
