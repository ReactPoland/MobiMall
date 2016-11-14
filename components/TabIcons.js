import React, { Component } from 'react';
import st from '../assets/style';
import {
  TouchableNativeFeedback,
  View,
  Text,
  ScrollView
} from 'react-native';

export default class Tabs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 0,
			tabTitleWidth: Math.floor(360 / this.props.children.length )
		};
		
		this.onLayoutView = this.onLayoutView.bind(this);
		this.selectTab = this.selectTab.bind(this);
	}

	onLayoutView(ev) {
		let { width, height } = ev.nativeEvent.layout;

		this.setState({
			tabTitleWidth: Math.floor(width / this.props.children.length )
		});
	}

	selectTab(index) {
		this.setState({
			currentPage: index
		});
	}

	renderHeader(items) {
		
		return items.map((component, index) =>  {

			if (index === this.state.currentPage) {
				// if (component.props.onActive) component.props.onActive.call(); 
			};

			return (
				<TouchableNativeFeedback key={index} onPress={() => {
					let curIndex = index;
					this.selectTab(curIndex);
				}}>
					<View style={{paddingBottom: 5, width:this.state.tabTitleWidth}} >

						{ index === this.state.currentPage ? 
							component.props.iconActive : component.props.icon }

					</View>
				</TouchableNativeFeedback>
			)
		});
	}

	render() {

		let { containerStyle } = this.props.children[this.state.currentPage].props;


		return (
			<View onLayout={this.onLayoutView} style={containerStyle} >
				<ScrollView horizontal={ true } contentContainerStyle={[st.tabTitlesView, {paddingTop: 0, paddingBottom: 0}]}>
					{ this.renderHeader( this.props.children ) }
				</ScrollView>
				{ this.props.children[this.state.currentPage] }
			</View>
		)
	}
};
