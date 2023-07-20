import { Tooltip, Placeholder } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import FilterModal from '../../../page-components/SearchResults/common/Filters/FilterModal';
import getLoadArray from '../../../page-components/SearchResults/utils/getLoadArray';

import styles from './styles.module.css';

const ZERO_VALUE = 0;

function LoadOverview({ data = {}, service_key = 'search_type', loading = false, isAllowedToEdit = true }) {
	const [showModal, setShowModal] = useState(false);

	const service = data[service_key];
	const { service_details, services } = data || {};

	const load = getLoadArray(service, service_details || services || []);
	const firstLoadObject = load.shift();

	const renderContainerDetails = (loadItem = {}, isFirst = false, margin = 0) => (
		<div className={styles.container} style={{ margin }}>
			<div className={styles.load_item}>

				<span className={styles.text}>
					{`${loadItem.containers_count} X ${['20', '40'].includes(loadItem.container_size)
						? `${loadItem.container_size}ft` : loadItem.container_size}, 
						${startCase(loadItem.container_type)}`}
				</span>

				{isAllowedToEdit && isFirst ? (
					<IcMEdit
						height={12}
						width={12}
						className={styles.edit}
						onClick={() => setShowModal(true)}
					/>
				) : null}
			</div>

			<div className={styles.load_item} style={{ margin: '0 12px' }}>
				<span className={styles.text}>
					{startCase(loadItem.commodity) || 'All Commodities'}
				</span>
			</div>
		</div>
	);

	const renderPackagesDetails = (loadItem = {}, isFirst = false, margin = 0) => (
		<div className={styles.container} style={{ margin }}>
			<div className={styles.load_item}>

				<span className={styles.text}>
					{`${loadItem.packages_count} X ${loadItem.volume} CBM`}
				</span>

				{isAllowedToEdit && isFirst ? (
					<IcMEdit
						height={12}
						width={12}
						className={styles.edit}
						onClick={() => setShowModal(true)}
					/>
				) : null}
			</div>

			<div className={styles.load_item} style={{ margin: '0 12px' }}>
				<span className={styles.text}>
					{startCase(loadItem.commodity) || 'All Commodities'}
				</span>
			</div>
		</div>
	);
	const renderTrucksDetails = () => {};

	const LOAD_MAPPING = {
		fcl_freight : renderContainerDetails,
		lcl_freight : renderPackagesDetails,
		air_freight : renderPackagesDetails,
		ltl_freight : renderTrucksDetails,
		ftl_freight : renderTrucksDetails,
	};

	const renderLoad = LOAD_MAPPING[service || 'fcl_freight'];

	if (loading) {
		return (
			<div className={styles.container}>
				<Placeholder height="25px" width="100px" margin="0px 16px 0px 0px" />
				<Placeholder height="25px" width="100px" margin="0px 36px 0px 0px" />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{renderLoad(firstLoadObject, true)}

			{isEmpty(load) ? null : (
				<Tooltip
					maxWidth="max-content"
					placement="top"
					content={(
						<div className={styles.content}>
							{load.map((loadItem, index) => {
								const margin = index === ZERO_VALUE ? ZERO_VALUE : '8px 0 0 0';
								return renderLoad(loadItem, false, margin);
							})}
						</div>
					)}
				>
					<div className={styles.more_tag}>{`+${load.length} More`}</div>
				</Tooltip>
			)}

			{showModal ? (
				<FilterModal
					data={data}
					show={showModal}
					setShow={setShowModal}
					showLoadControlsOnly
				/>
			) : null}

		</div>
	);
}

export default LoadOverview;
