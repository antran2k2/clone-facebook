import React from "react";
import { KeyboardAvoidingView, TouchableWithoutFeedback, View, TouchableOpacity, Text, ScrollView, TextInput } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const CommentList = () => {
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        backgroundColor: 'rgba(255,255,255,0.0)',
        position: 'relative',
        height: screenHeight,
      }}
      enabled>
      <TouchableWithoutFeedback onPress={this.onPressBackDropHandler}>
        <View style={{height: 92}}></View>
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <View style={styles.navigationStackBar}>
          <TouchableOpacity
            onPress={this.onPressBtnBackHandler}
            style={styles.btnBack}>
            <FontAwesome5Icon name="arrow-left" size={24}></FontAwesome5Icon>
          </TouchableOpacity>
          <View style={styles.stackBarTitle}>
            <Text style={{fontSize: 16}}>Comments</Text>
          </View>
        </View>
        <ScrollView style={styles.commentsWrapper}>
          {comments.map((comment, index) => (
            <Comment key={index} comment={comment}>
              Detail
            </Comment>
          ))}
        </ScrollView>
      </View>
      <View style={styles.commentInputWrapper}>
        <TouchableOpacity style={styles.cameraIconWrapper}>
          <FontAwesome5Icon name="camera" size={20}></FontAwesome5Icon>
        </TouchableOpacity>
        <View style={styles.textInputWrapper}>
          <TextInput autoFocus={true} style={styles.textInput}></TextInput>
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity style={styles.iconItem}>
            <FontAwesome5Icon
              name="grip-horizontal"
              size={20}></FontAwesome5Icon>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconItem}>
            <FontAwesome5Icon name="grin-wink" size={20}></FontAwesome5Icon>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
