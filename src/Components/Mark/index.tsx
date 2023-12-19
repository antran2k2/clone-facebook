/* eslint-disable react/no-unstable-nested-components */
import {calculateTimeDifference} from '@/Utils';
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Card, Avatar, List} from 'react-native-paper';

export default function Mark({mark}: any) {
  const cardBackgroundColor = mark.type_of_mark === '1' ? 'blue' : 'red';

  return (
    <Card
      key={mark.id}
      style={{margin: 10, backgroundColor: cardBackgroundColor}}>
      <Card.Title
        title={mark.poster.name}
        subtitle={calculateTimeDifference(mark.created)}
        left={props => (
          <Avatar.Image {...props} source={{uri: mark.poster.avatar}} />
        )}
      />
      <Card.Content>
        <Text>{mark.mark_content}</Text>
      </Card.Content>
      <List.Accordion
        title="Comments"
        left={props => <List.Icon {...props} icon="comment" />}>
        {mark.comments.map(comment => (
          <List.Item
            key={comment.created}
            title={comment.poster.name}
            description={comment.content}
            left={props => (
              <Avatar.Image {...props} source={{uri: comment.poster.avatar}} />
            )}
          />
        ))}
      </List.Accordion>
    </Card>
  );
}
