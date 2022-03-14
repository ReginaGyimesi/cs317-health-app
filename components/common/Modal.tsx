import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Colors, FontVariants } from "../../styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type ModalProps = {
  title: string;
  children: any;
  text: string;
  _onClick: () => void;
};

export const ModalWrapper = ({
  title,
  text,
  _onClick,
  children,
}: ModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={[styles.centeredView, { backgroundColor: "rgba(0,0,0,0.5)" }]}
        >
          <View style={styles.modalView}>
            <View style={[styles.flex, { justifyContent: "space-between" }]}>
              <View style={{ width: 20 }} />
              <Text style={styles.title}>{title}</Text>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <MaterialCommunityIcons
                  name={"close-circle-outline"}
                  color={Colors.grey20}
                  size={20}
                />
              </Pressable>
            </View>
            <View>
              <Text style={styles.text}>{text}</Text>
            </View>
            <View style={[styles.flex, { justifyContent: "space-evenly" }]}>
              <Pressable
                style={[styles.btnwrapper, { borderColor: Colors.dangerRed }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.btntext, { color: Colors.dangerRed }]}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[styles.btnwrapper, { borderColor: Colors.acceptGreen }]}
                onPress={() => _onClick}
              >
                <Text style={[styles.btntext, { color: Colors.acceptGreen }]}>
                  Yes
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>{children}</Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    backgroundColor: Colors.grey60,
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    ...FontVariants.modalHeader,
    color: Colors.white,
  },
  flex: {
    flexDirection: "row",
    textAlignVertical: "center",
  },
  btnwrapper: {
    borderWidth: 1,
    borderRadius: 20,
    width: 80,
    padding: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btntext: {
    ...FontVariants.body,
    color: Colors.grey20,
  },
  text: {
    ...FontVariants.body,
    color: Colors.grey20,
    textAlign: "center",
    padding: 10,
  },
});
