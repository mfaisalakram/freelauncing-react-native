import React, { useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ActivityIndicator } from 'react-native-paper';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Header from '../../Header';
import { useTheme } from '../../../utils/themeContext';

export function Media() {
    const navigation = useNavigation();
    const navigateTo = (screen: any) => {
        const dt = {
            name: screen,
            key: undefined,
            params: {},
            merge: undefined,
        } as any;
        navigation.navigate(dt);
    };

    const data = [
        {
            id:1,
            image: require("../../../../assets/media/2.jpeg"),
            description: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter.'
        },
        {
            id:2,
            image: require("../../../../assets/media/3.jpeg"),
            description: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter.'
        },
        {
            id:3,
            image: require("../../../../assets/media/4.jpeg"),
            description: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter.'
        },
        {
            id:4,
            image: require("../../../../assets/media/5.jpeg"),
            description: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter.'
        }, {
            id:5,
            image: require("../../../../assets/media/6.jpeg"),
            description: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter.'
        },
        {
            id:6,
            image: require("../../../../assets/media/1.jpeg"),
            description: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter.'
        },
    ]

    const { colors, isDark } = useTheme();


    return (
        <ScrollView style={styles().container}>
            <Header/>
            <View style={{
            backgroundColor: "#3483eb",
            display: "flex",
            height: 50,
            justifyContent: "center",
          }}>

  <Text style={styles(colors.heading).aboutHeading}>Media</Text>
          </View>
             <View>
            {data.map((item , index) => [
                <Card  key = {index}>
                    <Card.Content>
                    </Card.Content>
                    <Card.Cover source={item.image} />
                </Card>
            ])}
        </View>
            </ScrollView>
    );
}

const styles = (color?: string) =>
    StyleSheet.create({
        container: {
            backgroundColor: 'white',
        },
        aboutHeading: {
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
          },

        
        
    });
