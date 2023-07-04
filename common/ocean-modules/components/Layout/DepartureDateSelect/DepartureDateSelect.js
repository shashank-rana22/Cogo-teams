import { Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMCalendar } from '@cogoport/icons-react';
import React, { useState } from 'react';

import OptionsModal from './OptionsModal';

function DepartureDateSelect({ value, onChange, showPopover, datePair, ...rest }) {
	const [showModal, setShowModal] = useState(false);
	const [multiSelected, setMultiSelected] = useState(value);

	const getValue = () => {
		let valueString = '';

		const formattedValues = (value || []).map((item) => formatDate({
			date       : item,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		}));

		valueString += formattedValues.concat();

		return valueString;
	};

	return (
		<>
			<div onFocus={() => setShowModal(true)}>
				<Input
					{...rest}
					value={getValue()}
					suffix={() => <IcMCalendar onClick={() => setShowModal(true)} color="#adadad" size={1.4} />}
				/>

			</div>
			<OptionsModal
				onChange={onChange}
				onClose={() => setShowModal(false)}
				show={showModal}
				value={value}
				datePair={datePair}
				isMobile={rest.isMobile}
				multiSelected={multiSelected}
				setMultiSelected={setMultiSelected}
			/>
		</>
	);
}

export default DepartureDateSelect;
