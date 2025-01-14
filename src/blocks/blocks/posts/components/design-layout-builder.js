/**
 * External dependencies
 */
import arrayMove from 'array-move';

import classnames from 'classnames';

import { v4 as uuidv4 } from 'uuid';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { intersection } from 'lodash';

import {
	Button,
	ExternalLink
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { SortableItem, SortableList } from './sortable.js';

const LayoutBuilder = ({
	attributes,
	setAttributes
}) => {
	const onSortEnd = ({ oldIndex, newIndex }) => {
		const template = arrayMove( attributes.template, oldIndex, newIndex );
		setAttributes({ template });
	};

	const filterDeadCustomTemplates = () => {
		const validCustomTemplates = intersection(
			attributes.template,
			attributes?.customMetas?.map( ({ id }) => id )
		);

		return {
			template: attributes?.template.filter( t => ! t.startsWith( 'custom_' ) || ( validCustomTemplates.includes( t ) ) ),
			customMetas: attributes.customMetas?.filter( ({ id }) => validCustomTemplates.includes( id ) )
		};
	};

	return (
		<Fragment>
			<div
				className={ classnames(
					'otter-blocks-sortable',
					attributes.style
				) }
			>
				<SortableItem
					attributes={ attributes }
					setAttributes={ setAttributes }
					template={ 'image' }
					disabled={ true }
				/>

				<SortableList
					attributes={ attributes }
					setAttributes={ setAttributes }
					onSortEnd={ onSortEnd }
					useDragHandle
					axis="y"
					lockAxis="y"
				/>

				{ window.themeisleGutenberg?.hasNeveSupport?.hasNeve && (
					<Fragment>
						{ window?.acf === undefined ? (
							<ExternalLink
								href="https://wordpress.org/plugins/advanced-custom-fields/"
								target="_blank"
							>
								{ __( 'Activate Advance Custom Fields to add more fields.', 'otter-blocks' ) }
							</ExternalLink>
						) : (
							<Fragment>
								<Button
									variant="secondary"
									isSecondary
									className="o-conditions__add"
									disabled={ window?.acf === undefined || ( ! window?.themeisleGutenberg?.hasNeveSupport?.hasNevePro || ! window?.themeisleGutenberg?.hasNeveSupport?.isBoosterActive ) }
									onClick={ () => {
										let id = uuidv4().slice( 0, 8 );
										while ( 0 < attributes?.customMetas?.some( ({ otherId }) => otherId === id )  ) {
											id = uuidv4().slice( 0, 8 );
										}
										id = `custom_${ id }`;

										const newMeta = {
											id,
											field: '',
											display: true
										};

										const {
											template,
											customMetas
										} = filterDeadCustomTemplates();

										setAttributes({
											template: [ ...template, id ],
											customMetas: customMetas ? [ ...customMetas, newMeta ] : [ newMeta ]
										});
									} }
								>
									{ __( 'Add Meta Field', 'otter-blocks' ) }
								</Button>

								{ ( ! window.themeisleGutenberg?.hasNeveSupport?.hasNevePro || ! window?.themeisleGutenberg?.hasNeveSupport?.isBoosterActive ) && (
									<ExternalLink
										href={ window.themeisleGutenberg?.hasNeveSupport?.hasNevePro ? window.themeisleGutenberg.hasNeveSupport.optionsPage : 'https://themeisle.com/themes/neve/' }
										target="_blank"
									>
										{__( 'Enable ACF fields with Neve Pro\'s Block Editor Booster.', 'otter-blocks' )}
									</ExternalLink>
								) }
							</Fragment>
						) }
					</Fragment>
				) }
			</div>
		</Fragment>
	);
};

export default LayoutBuilder;
