/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { faIcon as icon } from '../../helpers/icons.js';
import edit from './edit.js';

const { name } = metadata;

registerBlockType( name, {
	...metadata,
	title: __( 'Product Review', 'otter-blocks' ),
	description: __( 'Turn your posts into smart reviews with ratings and generate leads with a performing review block.', 'otter-blocks' ),
	icon,
	keywords: [
		'product',
		'review',
		'stars'
	],
	styles: [
		{
			name: 'default',
			label: __( 'Default', 'otter-blocks' ),
			isDefault: true
		},
		{
			name: 'single-column',
			label: __( 'Single Column', 'otter-blocks' )
		}
	],
	edit,
	save: () => null
});
