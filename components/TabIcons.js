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
			tabTitleWidth: Math.floor(360 / 3)
		};
		
		this.onLayoutView = this.onLayoutView.bind(this);
		this.selectTab = this.selectTab.bind(this);
	}

	onLayoutView(ev) {
		let { width, height } = ev.nativeEvent.layout;

		this.setState({
			tabTitleWidth: Math.floor(width / 3)
		});
	}

	selectTab(index) {
		this.setState({
			currentPage: index
		});
	}

	render() {
		let tabs = this.props.children.map((component, index) =>  {

			if (index === this.state.currentPage) {

			}

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


		return (
			<View onLayout={this.onLayoutView}>
				<ScrollView horizontal={ true } contentContainerStyle={st.tabTitlesView}>
					{ tabs }
				</ScrollView>
				{ this.props.children[this.state.currentPage] }
			</View>
		)
	}
};
