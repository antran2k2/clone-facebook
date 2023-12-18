import { TUserFriend } from '@/types/user.type';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { SCREEN_WIDTH } from '@/Constants'
import { ScreenNavigationProp } from '@/Routes/Stack';
import { useNavigation } from '@react-navigation/native';

const isUserX: boolean = false;
const mututalCount = 350;

interface IMyProps {
    userFriends: TUserFriend,
    user_id: string
}

const FriendsShowing: React.FC<IMyProps> = (props) => {

    const navigation = useNavigation<ScreenNavigationProp>();

    const onPressViewAllFriendsHandler = () => {
        const id = props.user_id;
        navigation.navigate("FullFriend", {
            user_id: id
        })
    }

    const onPressFindFriendsHandler = () => {
        console.log('1');
    }

    return (
        <View style={styles.friendsWrapper}>
            <View style={{ backgroundColor: "#000", borderRadius: 5, }}>
                <TouchableOpacity
                    onPress={onPressViewAllFriendsHandler}
                    activeOpacity={0.8} style={styles.friendsBar}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Bạn bè</Text>
                        <Text style={{ fontSize: 16, fontWeight: '400', color: '#333' }}>{props.userFriends.total} người bạn{(isUserX && mututalCount > 0) ? `(${mututalCount} bạn chung)` : ''}</Text>
                    </View>
                    {!isUserX && <TouchableOpacity
                        onPress={onPressFindFriendsHandler}
                        activeOpacity={0.8} style={styles.btnFindFriends}>
                        <Text style={{ fontSize: 16, color: '#318bfb', fontWeight: 'bold' }}>
                            Tìm bạn bè
                        </Text>
                    </TouchableOpacity>}
                </TouchableOpacity>
            </View>
            <View style={styles.friendGallery}>
                {props.userFriends.friends.splice(0, 6).map((friend, index) => (
                    <View key={index} style={styles.friendItem}>
                        <TouchableOpacity
                            // onPress={this.onPressProfileHandler.bind(this, friend.id)}
                            activeOpacity={0.8}>
                            <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={this.onPressProfileHandler.bind(this, friend.id)}
                            style={{ marginTop: 5 }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#000' }}>{friend.username}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            <TouchableOpacity
                onPress={onPressViewAllFriendsHandler}
                activeOpacity={0.8} style={styles.btnViewAllFriends}>
                <Text style={{ fontSize: 16, fontWeight: '500', color: '#000' }}>Xem tất cả bạn bè</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    friendsWrapper: {
        paddingVertical: 15
    },
    friendsBar: {
        borderRadius: 5,
        paddingVertical: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnFindFriends: {
        paddingHorizontal: 11
    },
    friendGallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10
    },
    friendItem: {
        width: (SCREEN_WIDTH - 30 - 20) / 3,
        marginBottom: 15
    },
    friendAvatar: {
        width: (SCREEN_WIDTH - 30 - 20) / 3,
        height: (SCREEN_WIDTH - 30 - 20) / 3,
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: '#333'
    },
    btnViewAllFriends: {
        width: '100%',
        borderRadius: 5,
        height: 40,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FriendsShowing;