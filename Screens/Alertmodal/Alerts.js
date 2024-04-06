import React, { useState } from "react";
import { View, Modal,StyleSheet,Text,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
const Alerts = ({visible,onClose ,icon,title,desc}) => {
  console.log(visible)
  const [showModal, setShowModal] = useState(visible);
  const navigation = useNavigation();
  const closeHandler =()=>{
    onClose()
    // setShowModal(false)
  }
  return (
    <View style={{}}>
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FontAwesome5Icon
              name={icon}
              size={20}
              color="blue"
              style={{ alignSelf: "center" }}
            />
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={{ fontWeight: "400", textAlign: "center" }}>
             {desc}
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={()=>navigation.goBack()}
              >
                <Text style={{ color: "#fff", fontWeight: "500" }}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
    top: 10,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  submitButton: {
    backgroundColor: "tomato",
  },
  button1: {
    backgroundColor: "#f2f2f2", // Green color similar to Internshala's UI
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    right: 10,
    elevation: 1,
  },
  text1: {
    color: "#000", // White color for text
    fontSize: 15,
    fontWeight: "500",
  },
});
