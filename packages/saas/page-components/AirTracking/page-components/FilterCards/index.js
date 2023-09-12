import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import { FILTER_CARDS_LIST, FILTER_KEYS, FILTER_KEY_TO_ID, FILTER_KEY_TO_LABEL } from '../../common/constants';

import styles from './styles.module.css';

function FilterCards({
	filters,
	setFilters,
	setShow,
	setStatus,
	show,
	airTrackers = {},
	isMobile = false,
	isMapView = false,
	setMapView = () => {},
	...props
}) {
	const { push } = useRouter();
	const [activeKey, setActiveKey] = useState(FILTER_KEYS.ALL_CARGO);

	const { stats = {} } = airTrackers || {};

	const removeActiveKeyFromFilters = () => {
		const newFilters = { ...filters };
		delete newFilters[activeKey];

		return newFilters;
	};

	const onClick = (key) => {
		if (key === activeKey) return;

		const newFilters = removeActiveKeyFromFilters();
		if (key === FILTER_KEYS.ALL_CARGO) {
			setStatus(['active', 'completed']);
			setFilters(newFilters);
		} else {
			newFilters[key] = stats[FILTER_KEY_TO_ID[key]];
			setFilters(newFilters);
			setStatus(['active']);
		}
	};

	useEffect(() => {
		let newActiveKey = FILTER_KEYS.ALL_CARGO;
		FILTER_CARDS_LIST.forEach((key) => {
			if (key in filters) {
				newActiveKey = key;
			}
		});
		setActiveKey(newActiveKey);
	}, [filters]);

	const selectedCardLabel = FILTER_KEY_TO_LABEL[FILTER_CARDS_LIST.filter(
		(key) => key === activeKey,
	)[GLOBAL_CONSTANTS.zeroth_index]] ?? '';
	const trackersList = airTrackers?.list || [];
	return (
		// <div>FilterCards</div>
		<>
			<div className={styles.filter_card_container} style={{ marginTop: 24, marginBottom: 16 }}>
				{FILTER_CARDS_LIST.map((key) => (
					<CardComponent
						key={key}
						id={key}
						onClick={onClick}
						activeKey={activeKey}
						stats={stats}
						{...(key === 'total_subscriptions' && {
							'data-instructional-overlay-step': '1',
						})}
						{...(key === 'on_track_air_cargos' && {
							'data-instructional-overlay-step': '2',
						})}
						{...(key === 'attention_required' && {
							'data-instructional-overlay-step': '3',
						})}
					/>
				))}
			</div>
			{isMobile && (
				<Flex justifyContent="space-between">
					<Button
						size="md"
						variant="secondary"
						style={{ margin: '8px 12px' }}
						onClick={() => setMapView(!isMapView)}
						id="air_trackers_list_view_btn"
					>
						{isMapView ? 'List View' : 'Map View'}
					</Button>
					<Button
						size="lg"
						variant="ghost"
						style={{ color: '#E15151' }}
						onClick={() => push('/saas/air-tracking/archive')}
						id="air_trackers_archive_cargo_btn"
					>
						Archived Cargo
					</Button>
				</Flex>
			)}
			<Flex
				alignItems="center"
				justifyContent="space-between"
				marginBottom="5px"
			>
				{!isMobile && (
					<Flex justifyContent="flex-start">
						<Heading>{selectedCardLabel}</Heading>
						<Button
							size="md"
							variant="secondary"
							style={{ margin: '8px 12px' }}
							onClick={() => setMapView(!isMapView)}
							id="air_trackers_list_view_btn"
						>
							{isMapView ? 'List View' : 'Map View'}
						</Button>
					</Flex>
				)}
				{!isMobile && (
					<Flex justifyContent="center" alignItem="center">
						<div {...{ 'data-instructional-overlay-step': '5' }}>
							<Link
								size="lg"
								variant="ghost"
								href="/saas/air-tracking/archive"
								id="air_trackers_archive_cargo_btn"
								passHref
							>
								<Linked>Archived Cargo</Linked>
							</Link>
						</div>
						{isEmpty(trackersList) && (
							<FilterContainer>
								<FilterTooltip
									filters={filters}
									setFilters={setFilters}
									trackers={airTrackers}
									{...props}
									{...{ 'data-instructional-overlay-step': '6' }}
									setShow={setShow}
									show={show}
								/>
							</FilterContainer>
						)}
					</Flex>
				)}
			</Flex>
		</>
	);
}

export default FilterCards;
