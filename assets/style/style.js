export default {
	titleView: {
		justifyContent: 'center',
		height: 80,
	},
	titleText: {
		zIndex: 20,
		color: 'white',
		textAlign: 'center',
		fontSize: 36,
		textShadowColor: 'black',
		textShadowRadius: 10,
		textShadowOffset: { width: 3, height: 3 }
	},
	imgTitle: {
		zIndex: 10,
		flex: 1,
    	resizeMode: 'cover',
    	top: 0,
    	left: 0,
    	right: 0,
    	bottom: 0,
    	position: 'absolute',
    },
	container: {
		flex: 1,
		justifyContent: 'center',
		// alignItems: 'center',
		backgroundColor: '#9100be',
	},
	squareBorderButton: {
		marginRight: 15,
		borderWidth: 1,
		justifyContent: 'center',
		borderStyle: 'solid',
		borderColor: '#888888',
		width: 80,
		height: 80,
		borderRadius: 10
	},
	buttName: {
		fontWeight: 'bold',
		fontSize: 15,
		color: '#9100be',
		textAlign: 'center'		
	},
	buttonDescription: {
		flex: 2,
		fontSize: 15,
		color: '#9100be',
		textAlign: 'center'
	},
	blockTitle: {
		fontSize: 15,
		color: '#9100be',
		textAlign: 'center'
	},
	lineView: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row'
	},
	textInput: {
		fontSize: 10,
		color: '#9100be'
	},
	contentWrap: {
		backgroundColor: 'white',
		marginTop: 20,
		marginLeft: 5,
		marginRight: 5,
		paddingTop: 20,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 20
	},
	input: {
		alignSelf: 'stretch',
		borderWidth: 0,
		height: 40,
	},
	inputMulti: {
		textAlignVertical: 'top',
		alignSelf: 'stretch',
		borderWidth: 0,	
	},
	inputMultiWrap: {
		marginTop: 20,
		alignSelf: 'stretch',
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: '#888888',
	}
}