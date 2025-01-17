/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { buttonsIcon as icon } from '../../../helpers/icons.js';
import deprecated from './deprecated.js';
import edit from './edit.js';
import save from './save.js';

const { name } = metadata;

registerBlockType( name, {
	...metadata,
	title: __( 'Button Group', 'otter-blocks' ),
	description: __( 'Prompt visitors to take action with a button group.', 'otter-blocks' ),
	icon,
	keywords: [
		'button',
		'buttons',
		'button group'
	],
	deprecated,
	edit,
	save
});
