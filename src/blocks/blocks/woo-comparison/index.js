/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';

import { useBlockProps } from '@wordpress/block-editor';

import { Placeholder } from '@wordpress/components';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import attributes from './attributes.js';
import { faIcon as icon } from '../../helpers/icons.js';
import edit from './edit.js';

const { name } = metadata;

if ( Boolean( window.themeisleGutenberg.hasNeveSupport.isBoosterActive ) && Boolean( window.themeisleGutenberg.hasWooCommerce ) && Boolean( window.themeisleGutenberg.hasNeveSupport.wooComparison ) ) {
	registerBlockType( name, {
		...metadata,
		title: __( 'WooCommerce Comparison Table', 'otter-blocks' ),
		description: __( 'A way to compare different WooCommerce products made on the website.', 'otter-blocks' ),
		icon,
		keywords: [
			'woocommerce',
			'comparison',
			'table'
		],
		attributes,
		edit,
		save: () => null
	});
} else {
	registerBlockType( name, {
		...metadata,
		title: __( 'WooCommerce Comparison Table', 'otter-blocks' ),
		description: __( 'A way to compare different WooCommerce products made on the website.', 'otter-blocks' ),
		icon,
		keywords: [
			'woocommerce',
			'comparison',
			'table'
		],
		attributes,
		supports: {
			inserter: false
		},
		edit: () => <div { ...useBlockProps() }><Placeholder>{ __( 'You need to have Neve Pro & WooCommerce installed to edit WooCommerce Comparison Table block.', 'otter-blocks' ) }</Placeholder></div>,
		save: () => null
	});
}

