import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import colors from '../Screens/Utils/colors';

interface Props {
  visible: boolean;
  setVisible: any;
  onPress?: any;
  message: string;
}

const CustomSnackBar = ({ visible, setVisible, message }: Props) => {
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: '#07243f' }}
        action={{
          label: 'Dismiss',
          onPress: () => setVisible(false),
          labelStyle: { color: 'white' },
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    top: '-5%',
  },
});

export default CustomSnackBar;
