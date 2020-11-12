import { View, Text, StyleSheet,SafeAreaView,ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import IconBack from '../assets/icons/Back.svg';
import IconSelection from '../assets/icons/Selection.svg';
import IconForward from '../assets/icons/forward.svg';
import {colors, scale} from '../styles';

const colorsSelectors = [
    {name: "darkBlue", code: colors.darkBlue},
    {name: "blueCategoryDark", code: colors.blueCategoryDark},
    {name: "orange", code: colors.orange},
    {name: "darkGreen", code: colors.darkGreen},
    {name: "violetLight", code: colors.violetLight},
    {name: "brown", code: colors.brown},
    {name: "violet", code: colors.violet},
    {name: "red", code: colors.red},
    {name: "pink", code: colors.pink},
    {name: 'yellow', code: colors.yellow},
    {name: "beige", code: colors.beige},
    {name: "blueCategoryLight", code: colors.blueCategoryLight},
    {name: "darkBlue", code: colors.darkBlue},
    {name: "blueCategoryDark", code: colors.blueCategoryDark},
    {name: "orange", code: colors.orange},
];

function renderContext(currentColor){
    if(currentTab == 'red'){
      return  style = {borderColor} 
    }
    else if(currentTab == 'darkBlue'){
        return borderColor
    }
    else if(currentTab == 'blueCategoryDark'){
        return borderColor
    }
}

export const FilterColour = ({title}) => {
    const [currentColor, setCurrentColor] = useState(colorsSelectors[0].name);

    return (
        <View style={styles.container} >
            <View style={styles.containerColour} >
               {colorsSelectors.map((color) => 
                <TouchableOpacity style={{
                        backgroundColor: color.code,
                        borderWidth: 5,
                        borderColor: currentColor == color.name ? 'red' : color.code,
                        width: scale(50),
                        padding: 20,
                        margin: 10,
                        borderRadius: 4,
                    }} onPress={() => setCurrentColor(color.name)} >
                </TouchableOpacity>
               )}
            </View > 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      containerColour: {
        flexDirection: "row",
        flexWrap: 'wrap',
        backgroundColor: colors.lightGray,
        width: scale(355),
        justifyContent: 'center',
        
      },
      borderColor: {
        borderColor: colors.mainBlue,
        borderWidth: 4,
      },
})