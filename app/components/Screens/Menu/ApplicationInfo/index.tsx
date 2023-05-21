import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";

import Header from "../../../Header";

import { useTheme } from "../../../../utils/themeContext";

export function ApplicationInfo() {
  const { colors, isDark } = useTheme();

  return (
    <>
      <Header isDrawer={false} />
      <View style={styles(colors.background).mainView}>
        <Text style={styles(colors.heading).aboutHeading}>About Us</Text>
        <ScrollView>
          <Text style={styles(colors.aboutTextColor).bold}>
            We has established citizen facilitation centers known as Felony
            System (FS) Lahore Pakistan
          </Text>
          <Text style={styles(colors.aboutTextColor).text}>
            We has automated the processes and developed an integrated and
            centralized IT system for these centers to improve the overall
            efficiency. The services being provided at Police Khidmat Marakiz
            are Character Certificate, General Police Verification, Learner
            Driving License, Driving License Renewal, International Driving
            License, Duplicate Driving License, Endorsement of a License,
            Employee Registration, Tenants Registration, Vehicle Verification,
            Loss Report, Crime Report, Women Violence Report, Copy of FIR.
            Establishment of these Khidmat Marakiz with a centralised IT system
            has resulted in:
          </Text>
          <Text style={styles(colors.aboutTextColor).text}>
            • Register FIR without going to Police Station 
          </Text>
          <Text style={styles(colors.aboutTextColor).text}>
            • Verify Documents 
          </Text>
          <Text style={styles(colors.aboutTextColor).text}>
          • Increase in revenue by ensuring transparency
          </Text>
          <Text style={styles(colors.aboutTextColor).text}>
          • Online Tracking of application
          </Text>
          {/*
          <Text style={styles(colors.aboutTextColor).text}>
            Octane was conceived out of the need for sports organizations around
            the world to leverage the power of data and technology to empower
            teams to focus on what they do best {"–"} develop high performance
            organizations and support continuous player development.
          </Text>
          <Text style={styles(colors.aboutTextColor).text}>
            For general inquires, advertising / investment opportunities or
            strategic partnerships, please contact us at{" "}
            <Text style={styles(colors.aboutTextColor).bold}>
              "info@octanetech.ca"
            </Text>
          </Text> */}
        </ScrollView>
      </View>
    </>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    mainView: {
      backgroundColor: color,
      flexDirection: "column",
      padding: 12,
      flex: 1,
      borderColor: "red",
    },
    aboutHeading: {
      color: color,
      fontSize: 18,
      textAlign: "center",
      fontWeight: "bold",
    },
    bold: {
      marginTop: 10,
      fontWeight: "bold",
      fontSize: 16,
      lineHeight: 20,
      color: color,
    },
    text: {
      marginTop: 10,
      fontSize: 16,
      color: color,
      lineHeight: 20,
    },
  });
