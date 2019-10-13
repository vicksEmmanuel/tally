import React, { Component } from "react";
import {
  View,
  Animated,
  TextInput,
  Image,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar
} from "react-native";
import index from "../../image/flags/index";
import {
  Africa,
  Oceania,
  Europe,
  Asia,
  NorthAmerica,
  SouthAmerica
} from "../../realm/data";

export const AfricaFlatList = props => {
  return (
    <View style={{ flex: 1, marginTop: 5 }} >
      <View style={{ flex: 1, backgroundColor: "#f8f8fc" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "slategray",
            padding: 5
          }}
        >
          Africa
        </Text>
      </View>
      <FlatList
        style={{
          padding: 5
        }}
        data={props.data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, id }) => {
          return (
            <View
              style={{
                flex: 1,
                borderBottomWidth: 4,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 4,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "rgba(0, 172, 212, 0.3)",
                margin: 5
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  padding: 10,
                  marginTop: 10
                }}
              >
                <Image
                  source={index[item.code]}
                  style={{ width: 40, height: 25, marginRight: 10 }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "100",
                    color: "slategray"
                  }}
                >
                  {item.country}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export const AsiaFlatList = props => {
  return (
    <View style={{ flex: 1, marginTop: 5 }}>
      <View style={{ flex: 1, backgroundColor: "#f8f8fc" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "slategray",
            padding: 5
          }}
        >
          Asia
        </Text>
      </View>
      <FlatList
        style={{
          padding: 5
        }}
        data={props.data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, id }) => {
          return (
            <View
              style={{
                flex: 1,
                borderBottomWidth: 4,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 4,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "rgba(0, 172, 212, 0.3)",
                margin: 5
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  padding: 10,
                  marginTop: 10
                }}
              >
                <Image
                  source={index[item.code]}
                  style={{ width: 40, height: 25, marginRight: 10 }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "100",
                    color: "slategray"
                  }}
                >
                  {item.country}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export const EuropeFlatList = props => {
  return (
    <View style={{ flex: 1, marginTop: 5 }}>
      <View style={{ flex: 1, backgroundColor: "#f8f8fc" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "slategray",
            padding: 5
          }}
        >
          Europe
        </Text>
      </View>
      <FlatList
        style={{
          padding: 5
        }}
        data={props.data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, id }) => {
          return (
            <View
              style={{
                flex: 1,
                borderBottomWidth: 4,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 4,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "rgba(0, 172, 212, 0.3)",
                margin: 5
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  padding: 10,
                  marginTop: 10
                }}
              >
                <Image
                  source={index[item.code]}
                  style={{ width: 40, height: 25, marginRight: 10 }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "100",
                    color: "slategray"
                  }}
                >
                  {item.country}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export const NorthAmericaFlatList = props => {
  return (
    <View style={{ flex: 1, marginTop: 5 }}>
      <View style={{ flex: 1, backgroundColor: "#f8f8fc" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "slategray",
            padding: 5
          }}
        >
          North America
        </Text>
      </View>
      <FlatList
        style={{
          padding: 5
        }}
        data={props.data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, id }) => {
          return (
            <View
              style={{
                flex: 1,
                borderBottomWidth: 4,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 4,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "rgba(0, 172, 212, 0.3)",
                margin: 5
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  padding: 10,
                  marginTop: 10
                }}
              >
                <Image
                  source={index[item.code]}
                  style={{ width: 40, height: 25, marginRight: 10 }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "100",
                    color: "slategray"
                  }}
                >
                  {item.country}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export const OceaniaFlatList = props => {
  return (
    <View style={{ flex: 1, marginTop: 5 }}>
      <View style={{ flex: 1, backgroundColor: "#f8f8fc" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "slategray",
            padding: 5
          }}
        >
          Oceania
        </Text>
      </View>
      <FlatList
        style={{
          padding: 5
        }}
        data={props.data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, id }) => {
          return (
            <View
              style={{
                flex: 1,
                borderBottomWidth: 4,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 4,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "rgba(0, 172, 212, 0.3)",
                margin: 5
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  padding: 10,
                  marginTop: 10
                }}
              >
                <Image
                  source={index[item.code]}
                  style={{ width: 40, height: 25, marginRight: 10 }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "100",
                    color: "slategray"
                  }}
                >
                  {item.country}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export const SouthAmericaFlatList = props => {
  return (
    <View style={{ flex: 1, marginTop: 5 }}>
      <View style={{ flex: 1, backgroundColor: "#f8f8fc" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "slategray",
            padding: 5
          }}
        >
          South America
        </Text>
      </View>
      <FlatList
        style={{
          padding: 5
        }}
        data={props.data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, id }) => {
          return (
            <View
              style={{
                flex: 1,
                borderBottomWidth: 4,
                borderLeftWidth: 0,
                borderTopWidth: 0,
                borderRightWidth: 4,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "rgba(0, 172, 212, 0.3)",
                margin: 5
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  padding: 10,
                  marginTop: 10
                }}
              >
                <Image
                  source={index[item.code]}
                  style={{ width: 40, height: 25, marginRight: 10 }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "100",
                    color: "slategray"
                  }}
                >
                  {item.country}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
