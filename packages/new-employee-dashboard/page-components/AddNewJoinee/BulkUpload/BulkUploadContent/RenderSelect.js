import { Select, Toast } from '@cogoport/components';
import AsyncSelect from '@cogoport/forms/page-components/Business/AsyncSelect';
import { IcMCopy } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

const handleCopy = (val) => {
	navigator.clipboard.writeText(val)
		.then(Toast.info('Copied Successfully !!', { autoClose: 1000 }));
};

function RenderSelect({ type = '', asyncKey = '', options = [], valueKey = undefined }) {
	const [select, setSelect] = useState('');

	return (
		<div className={styles.select_container}>
			{type === 'async' ? (
				<AsyncSelect
					value={select}
					onChange={setSelect}
					initialCall
					valueKey={valueKey}
					asyncKey={asyncKey}
					isClearable
				/>
			) : (
				<Select
					options={options}
					value={select}
					size="sm"
					isClearable
					onChange={setSelect}
				/>
			)}

			<IcMCopy
				className={select ? styles.copy_icon : styles.copy_icon_disabled}
				fill={select ? '#449e48' : '#d3d3d3'}
				onClick={() => { if (select) handleCopy(select); }}
			/>
		</div>
	);
}

export default RenderSelect;
