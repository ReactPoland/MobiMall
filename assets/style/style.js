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
	profileImgIcon: {
		resizeMode: 'contain',
		width: 25,
		height: 25,
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
	blockSubtitle: {
		fontSize: 11,
		color: '#9100be',
		textAlign: 'left',
		marginTop: -8,
		marginBottom: 10,
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
	textInputGrey: {
		fontSize: 10,
		color: '#888888'
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
	},
	shopTitleView: {
		justifyContent: 'center',
		paddingHorizontal: 50,
	},
	shopperTitleIcon: {
		paddingBottom: 30,
		justifyContent: 'center',
		flex: 1,
		alignItems: 'center',
	},
	shopperTitleProfile: {
		flex: 3,
		alignItems: 'center',
	},
	shopTitleProfileBlock: {
		flexDirection: 'row',
		flex: 1,
		zIndex: 20,
		marginTop: 20,
		marginBottom: 30,
	},
	tabTitlesView: {
		paddingBottom: 10,
		paddingTop: 10,
		flexDirection: 'row',
	},
	shopProfileName: {
		fontSize: 18,
		marginTop: 10,
		color: 'white',
		textShadowColor: 'black',
		textShadowRadius: 10,
		textShadowOffset: { width: 2, height: 2 }
	},
	shopProfileImg: {
		resizeMode: 'contain',
		width: 100,
		height: 100,
		borderRadius: 100 / 2,
	},
	purpleButtonView: {
		backgroundColor: '#9100be',
		marginRight: 20,
		marginLeft: 20,
		marginTop: 15,
		padding: 7,
	},
	cardRow: {
		marginBottom: 10,
		flexDirection: 'row',
		borderBottomColor: '#edb4ff',
		borderBottomWidth: 1,
		borderStyle: 'solid',
	},
	cardImage: {
		resizeMode: 'contain',
		height: 40,
		width: 50,
	},
	cardImageWrap: {
		alignItems: 'flex-start',
	},
	cardTextNumber: {
		paddingTop: 8,
		paddingLeft: 20,
		flex:1,
		height: 40,
	},
	purpleButtonName: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
	},
	checkboxPointer: {
		height: 10,
		width: 10,
		borderRadius: 5,
		backgroundColor: '#888888',
	},
	chBoxCardImage: {
		resizeMode: 'contain',
		height: 60,
		width: 70,
	},

	chboxCardWrap: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkboxPointerChecked: {
		height: 10,
		width: 10,
		borderRadius: 5,
		backgroundColor: '#9100be',
	},
	chboxCardVertContainer: {
		flexDirection: 'row',
	}
}
