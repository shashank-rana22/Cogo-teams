import { Input } from '@cogoport/components';
import { useForm, useDebounceQuery } from '@cogoport/forms';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import filterControls from '../../../../utils/filter-controls';
import { getElementController } from '../../../../utils/get-element-controls';

import styles from './styles.module.css';

function Filters(props) {
	const { params = {}, setParams = () => {}, disabled } = props;
	const [search, setSearch] = useState('');

	const formProps = useForm();

	const { query = '', debounceQuery } = useDebounceQuery();

	const {
		control, watch,
	} = formProps;

	const uploadBy = watch('partner_user_id');
	const uploadDate = watch('upload_date');

	useEffect(() => {
		setParams({
			...params,
			page    : 1,
			filters : {
				q               : query || undefined,
				partner_user_id : uploadBy || undefined,
				upload_date     : uploadDate || undefined,
			},

		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, uploadDate, uploadBy]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => debounceQuery(search), [search]);

	return (
		<div className={styles.filter_container}>

			<div className={styles.filter}>
				{
					filterControls.map((controlItem) => {
						const el = { ...controlItem };

						const Element = getElementController(el.type);

						if (!Element) return null;

						return (
							<div style={{ width: `${Number(el.span) * 10}%` }} className={styles.form_group}>
								<div style={{ width: '100%' }} className={styles.input_group}>
									<Element
										{...el}
										key={el.name}
										control={control}
										// disabled={disabled}
									/>
								</div>
							</div>
						);
					})
				}

			</div>
			<div className={styles.search}>
				<Input
					onChange={(val) => {
						setSearch(val);
						console.log('val', val);
					}}
					prefix={<IcMSearchlight />}
					placeholder="Search Filename"
					width="100%"
					// disabled={disabled}
				/>
			</div>
		</div>
	);
}

export default Filters;
