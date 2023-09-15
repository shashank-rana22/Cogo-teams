import { Modal, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetLocationCluster from '../../../hooks/useGetLocationCluster';

import LoadingCard from './LoadingCard';
import LocationCard from './LocationCard';
import SearchLocations from './SearchLocations';
import styles from './styles.module.css';

const SCROLL_LIMIT = 24;

function ViewLocations({ setShowViewLocations = () => {}, item:itemData = {} }) {
	const [showInput, setShowInput] = useState(true);
	const [searchVal, setSearchVal] = useState('');
	const [isFocused, setIsFocused] = useState(true);
	const { data = {}, loading = false } = useGetLocationCluster({ location_id: itemData.id });

	const filteredLocations = searchVal
		? (data || [])?.filter(
			(location) => startCase(location?.display_name)?.toLowerCase()?.includes(searchVal.toLowerCase()),
		)
		: data;

	const handleScroll = (e) => {
		if (!isFocused && e.target.scrollTop > SCROLL_LIMIT) {
			setShowInput(false);
		} else setShowInput(true);
	};

	return (
		<div>
			<Modal
				show
				onClose={() => setShowViewLocations(false)}
				onOuterClick={() => { setShowViewLocations(false); }}
				style={{ width: 'fit-content' }}
			>
				<Modal.Header title="Locations" />
				<Modal.Body style={{ minHeight: '680px' }}>
					<div
						className={styles.container}
						onScroll={(e) => { handleScroll(e); }}
					>
						<SearchLocations
							searchVal={searchVal}
							setSearchVal={setSearchVal}
							showInput={showInput}
							setShowInput={setShowInput}
							setIsFocused={setIsFocused}
						/>
						<div
							className={styles.list_container}
						>
							{loading ? (
								<LoadingCard />
							) : (
								<>
									{filteredLocations.map((item) => (
										<LocationCard
											key={item.id}
											name={item?.display_name}
											type={item?.type}
										/>
									))}
								</>
							)}
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => { setShowViewLocations(false); }}>CANCEL</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
export default ViewLocations;
