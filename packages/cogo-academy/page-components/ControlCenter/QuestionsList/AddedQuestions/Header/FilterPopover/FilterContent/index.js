import { Button } from '@cogoport/components';
import { MultiselectController } from '@cogoport/forms';

import styles from './styles.module.css';

function FilterContent({
	topicOptions,
	tagOptions,
	control,
	handleSubmit,
	onSubmit,
	onClickReset,
	audienceOptions,
}) {
	const filtersMapping = [
		{ name: 'topic', options: topicOptions, title: 'Filter By Topics' },
		{ name: 'tag', options: tagOptions, title: 'Filter By Tags' },
		{ name: 'audience', options: audienceOptions, title: 'Filter By Audience' },
	];

	return (
		<form className={styles.filter_container} onSubmit={handleSubmit(onSubmit)}>
			{
				filtersMapping.map((filterElement) => {
					const { name, options, title } = filterElement || {};
					return	(
						<div key={name}>
							<div className={styles.title}>
								{' '}
								{title}
							</div>

							<MultiselectController
								name={name}
								control={control}
								options={options}
							/>
						</div>
					);
				})
			}

			<div className={styles.button_container}>
				<Button
					themeType="secondary"
					style={{ marginRight: '8px' }}
					onClick={onClickReset}
					type="button"
				>
					Reset
				</Button>

				<Button
					themeType="primary"
					type="submit"
				>
					Apply
				</Button>
			</div>
		</form>
	);
}

export default FilterContent;
