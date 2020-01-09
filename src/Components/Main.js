/**
 * External dependencies.
 */
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	Button,
	ExternalLink,
	PanelBody,
	PanelRow,
	Placeholder,
	Spinner,
	ToggleControl
} = wp.components;

const {
	Fragment,
	useEffect,
	useRef,
	useState
} = wp.element;

const Main = () => {
	useEffect( () => {
		wp.api.loadPromise.then( () => {
			settingsRef.current = new wp.api.models.Settings();

			if ( false === isAPILoaded ) {
				settingsRef.current.fetch().then( response => {
					setCSSModule( Boolean( response.themeisle_blocks_settings_css_module ) );
					setBlocksAnimation( Boolean( response.themeisle_blocks_settings_blocks_animation ) );
					setDefaultSection( Boolean( response.themeisle_blocks_settings_default_block ) );
					setGoogleMapsAPI( response.themeisle_google_map_block_api_key );
					setLoggingData( response.otter_blocks_logger_flag );
					setAPILoaded( true );
				});
			}
		});
	}, []);

	const [ isAPILoaded, setAPILoaded ] = useState( false );
	const [ isAPISaving, setAPISaving ] = useState( false );
	const [ notification, setNotification ] = useState( null );
	const [ cssModule, setCSSModule ] = useState( false );
	const [ blocksAnimation, setBlocksAnimation ] = useState( false );
	const [ isDefaultSection, setDefaultSection ] = useState( true );
	const [ googleMapsAPI, setGoogleMapsAPI ] = useState( '' );
	const [ isLoggingData, setLoggingData ] = useState( 'no' );

	const settingsRef = useRef( null );
	const notificationDOMRef = useRef( null );

	const changeOptions = ( option, state, value ) => {
		setAPISaving( true );

		addNotification( __( 'Updating settings…' ), 'info' );

		const model = new wp.api.models.Settings({
			// eslint-disable-next-line camelcase
			[option]: value
		});

		const save = model.save();

		save.success( ( response, status ) => {
			notificationDOMRef.current.removeNotification( notification );

			if ( 'success' === status ) {

				setOptions( state, response[option]);

				setTimeout( () => {
					addNotification( __( 'Settings saved.' ), 'success' );
					setAPISaving( false );
				}, 800 );
			}

			if ( 'error' === status ) {
				setTimeout( () => {
					addNotification( __( 'An unknown error occurred.' ), 'danger' );
					setAPISaving( false );
				}, 800 );
			}

			settingsRef.current.fetch();
		});

		save.error( ( response, status ) => {
			notificationDOMRef.current.removeNotification( notification );

			setTimeout( () => {
				addNotification( response.responseJSON.message ? response.responseJSON.message : __( 'An unknown error occurred.' ), 'danger' );
				setAPISaving( false );
			}, 800 );
		});
	};

	const setOptions = ( option, value ) => {
		switch ( option ) {
		case 'cssModule':
			setCSSModule( value );
			break;
		case 'blocksAnimation':
			setBlocksAnimation( value );
			break;
		case 'isDefaultSection':
			setDefaultSection( value );
			break;
		case 'googleMapsAPI':
			setGoogleMapsAPI( value );
			break;
		case 'isLoggingData':
			setLoggingData( value );
			break;
		}
	};

	const addNotification = ( message, type ) => {
		const notification = notificationDOMRef.current.addNotification({
			message,
			type,
			insert: 'top',
			container: 'top-right',
			slidingEnter: {
				duration: 0,
				delay: 0
			},
			dismiss: { duration: 2000 },
			dismissable: { click: true }
		});

		setNotification( notification );
	};

	if ( ! isAPILoaded ) {
		return (
			<Placeholder>
				<Spinner />
			</Placeholder>
		);
	}

	return (
		<Fragment>
			<ReactNotification ref={ notificationDOMRef } />

			<div className="otter-main">
				<div className="otter-step-two">
					<PanelBody
						title={ __( 'Modules' ) }
					>
						<PanelRow>
							<ToggleControl
								label={ __( 'Enable Custom CSS Module' ) }
								help={ 'Custom CSS module allows to add custom CSS to each block in Block Editor.' }
								checked={ cssModule }
								onChange={ () => changeOptions( 'themeisle_blocks_settings_css_module', 'cssModule', ! cssModule ) }
							/>
						</PanelRow>

						<PanelRow>
							<ToggleControl
								label={ __( 'Enable Blocks Animation Module' ) }
								help={ 'Blocks Animation module allows to add CSS animations to each block in Block Editor.' }
								checked={ blocksAnimation }
								onChange={ () => changeOptions( 'themeisle_blocks_settings_blocks_animation', 'blocksAnimation', ! blocksAnimation ) }
							/>
						</PanelRow>
					</PanelBody>
				</div>

				<div className="otter-step-three">
					<PanelBody
						title={ __( 'Section' ) }
					>
						<PanelRow>
							<ToggleControl
								label={ __( 'Make Section your default block for Pages' ) }
								help={ 'Everytime you create a new page, Section block will be appended there by default.' }
								checked={ isDefaultSection }
								onChange={ () => changeOptions( 'themeisle_blocks_settings_default_block', 'isDefaultSection', ! isDefaultSection ) }
							/>
						</PanelRow>
					</PanelBody>
				</div>

				<div className="otter-step-four">
					<PanelBody
						title={ __( 'Maps' ) }
					>
						<PanelRow>
							<BaseControl
								label={ __( 'Google Maps API' ) }
								help={ 'In order to use Google Maps block, you need to use Google Maps and Places API.' }
								id="otter-options-google-map-api"
								className="otter-text-field"
							>
								<input
									type="text"
									id="otter-options-google-map-api"
									value={ googleMapsAPI }
									placeholder={ __( 'Google Maps API Key' ) }
									disabled={ isAPISaving }
									onChange={ e => setGoogleMapsAPI( e.target.value ) }
								/>

								<div className="otter-text-field-button-group">
									<Button
										isPrimary
										isLarge
										disabled={ isAPISaving }
										onClick={ () => changeOptions( 'themeisle_google_map_block_api_key', 'googleMapsAPI', googleMapsAPI ) }
									>
										{ __( 'Save' ) }
									</Button>

									<ExternalLink
										href="https://developers.google.com/maps/documentation/javascript/get-api-key"
										className="otter-step-five"
									>
										{ __( 'Get API Key' ) }
									</ExternalLink>
								</div>
							</BaseControl>
						</PanelRow>
					</PanelBody>
				</div>

				<div className="otter-step-six">
					<PanelBody
						title={ __( 'Other' ) }
					>
						<PanelRow>
							<ToggleControl
								label={ __( 'Anonymous Data Tracking.' ) }
								help={ 'Become a contributor by opting in to our anonymous data tracking. We guarantee no sensitive data is collected.' }
								checked={ 'yes' === isLoggingData ? true : false }
								onChange={ () => changeOptions( 'otter_blocks_logger_flag', 'isLoggingData', ( 'yes' === isLoggingData ? 'no' : 'yes' ) ) }
							/>
						</PanelRow>
					</PanelBody>
				</div>

				<PanelBody>
					<div className="otter-info">
						<h2>{ __( 'Got a question for us?' ) }</h2>

						<p>{ __( 'We would love to help you out if you need any help with Otter.' ) }</p>

						<div className="otter-info-button-group">
							<Button
								isDefault
								isLarge
								target="_blank"
								href="https://wordpress.org/support/plugin/otter-blocks"
								className="otter-step-seven"
							>
								{ __( 'Ask a question' ) }
							</Button>

							<Button
								isDefault
								isLarge
								target="_blank"
								href="https://wordpress.org/support/plugin/otter-blocks/reviews/#new-post"
								className="otter-step-eight"
							>
								{ __( 'Leave a review' ) }
							</Button>
						</div>
					</div>
				</PanelBody>
			</div>
		</Fragment>
	);
};

export default Main;