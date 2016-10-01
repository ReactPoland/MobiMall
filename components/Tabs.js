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
			let textViewStyles = {
				position: 'absolute',
				top: 0,
				left: 12,
				bottom: 0,
				right: 12,
			};

			if (index === this.state.currentPage) {
				textViewStyles['borderBottomColor'] = 'white';
				textViewStyles['borderBottomWidth'] = 3;
				textViewStyles['borderStyle'] = 'solid';
			}

			return (
				<TouchableNativeFeedback key={index} onPress={() => {
					let curIndex = index;
					this.selectTab(curIndex);
				}}>
					<View style={{paddingBottom: 5}} >

						<View style={textViewStyles} ></View>
						<Text
							style={{
								width:this.state.tabTitleWidth,
								fontSize: 19,
								color: 'white',
								textAlign: 'center',
							}} >
							{ component.props.name ? component.props.name : 'unnamed' }
						</Text>
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
