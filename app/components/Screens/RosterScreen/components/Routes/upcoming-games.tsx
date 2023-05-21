import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export function UpcomingGames() {
  const data = [
    {
      description: 'Mr Philips is away from next week',
      time: '3 mins ago',
    },
    {
      description: 'Bring your hockey kits today',
      time: '6 hours ago',
    },
    {
      description:
        'Ovechkin scores No. 742 in Capitals win against Blue Jackets',
      time: '5 days ago',
    },
  ];
  return (
    <View>
      <View>
        {data.map((arr, ind) => (
          <View key={ind}>
            <View style={{ padding: 12 }}>
              <Text style={{ fontSize: 14, color: '#090909' }}>
                {arr.description}
              </Text>
              <Text style={{ marginTop: 5, color: '#07243F', fontSize: 10 }}>
                {arr.time}
              </Text>
            </View>
            <View style={{ borderWidth: 0.3, borderColor: '#E9E9E9' }} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#07243F',
    width: 187,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25%',
  },
});
