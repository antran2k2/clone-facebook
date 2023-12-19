import { TFriend, TUserFriend } from '@/types/user.type';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { SCREEN_WIDTH } from '@/Constants'
import { ScreenNavigationProp } from '@/Routes/Stack';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IMyProps {
    sortDataByCreateAt: () => void
    toggleModal: () => void
}

const ArrangeWrapper: React.FC<IMyProps> = (props) => {

    const onPressDeafaulttHandler = () => {
        props.toggleModal();
    }

    const onPressNewHandler = () => {
        props.sortDataByCreateAt();
        props.toggleModal();


    }
    const onPressOldHandler = () => {
        props.toggleModal();
    }

    return (
        // <View style={styles.container}>
        //     <View style={styles.backdrop}>
        //         <TouchableOpacity onPress={this.onPressBackdropHandler.bind(this)} style={{ width: '100%', height: '100%' }}>

        //         </TouchableOpacity>
        //     </View>
        <View style={styles.postOptionsWrapper}>
            <TouchableOpacity style={styles.postOptionItemWrapper} onPress={onPressDeafaulttHandler}>
                <View style={styles.postOptionItem}>
                    <View style={styles.optionIcon}><MaterialCommunityIcons name="hexagon-multiple-outline" size={24} color={'#000'}></MaterialCommunityIcons></View>
                    <View>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '700',
                            color: '#000'
                        }}>Mặc định</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postOptionItemWrapper} onPress={onPressNewHandler}>
                <View style={styles.postOptionItem}>
                    <View style={styles.optionIcon}><MaterialCommunityIcons name="sort-descending" size={24} color={'#000'}></MaterialCommunityIcons></View>
                    <View>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '700',
                            color: '#000'
                        }}>Bạn bè mới nhất trước tiên</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postOptionItemWrapper} onPress={onPressOldHandler}>
                <View style={styles.postOptionItem}>
                    <View style={styles.optionIcon}><MaterialCommunityIcons name="sort-ascending" size={24} color={'#000'}></MaterialCommunityIcons></View>
                    <View>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '700',
                            color: '#000'
                        }}>Bạn bè lâu năm trước tiên</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        // </View>
    )
};

const styles = StyleSheet.create({
    postOptionsWrapper: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // width: '100%',
        // flex: 1,
        paddingTop: 16,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    postOptionHeaderWrapper: {
        paddingLeft: 20,
        paddingBottom: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    friendAvatar: {
        height: 40,
        width: 40,
        borderRadius: 40,
        borderColor: '#333',
        borderWidth: 0.2,
        marginRight: 14,
    },
    postOptionItemWrapper: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 50,
    },
    // postOptionItemWrapperLast: {
    //     paddingBottom: 10,
    //     paddingTop: 10,
    //     paddingLeft: 20,
    //     paddingRight: 50,
    //     color: 'red'
    // },
    postOptionItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionIcon: {
        width: 35,
        alignItems: 'center'
    },
    postOptionTitle: {
        fontSize: 16
    },
    postOptionSubtitle: {
        fontSize: 12
    }
})

export default ArrangeWrapper;