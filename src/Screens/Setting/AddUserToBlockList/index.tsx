/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import { ScreenNavigationProp } from '@/Routes/Stack';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { TBlockUser } from '@/types/user.type';
import unidecode from 'unidecode';

const AddUserToBlockListScreen = () => {

    const navigation = useNavigation<ScreenNavigationProp>();

    const allFriend: TBlockUser[] = [
        {
            id: '1',
            username: 'Đinh Duy Anh',
            avatar: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg',
        },
        {
            id: '2',
            username: 'Bích Diệp',
            avatar: 'https://antimatter.vn/wp-content/uploads/2022/04/hinh-meo-khoc-tha-like.jpg',
        },
        {
            id: '3',
            username: 'Tran Viet An',
            avatar: 'https://catscanman.net/wp-content/uploads/2023/02/meme-cheems-18.jpg',
        },
        {
            id: '4',
            username: 'Tùng Lâm',
            avatar: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg',
        },
        {
            id: '5',
            username: 'Lại Quốc Trung',
            avatar: 'https://antimatter.vn/wp-content/uploads/2022/04/hinh-meo-khoc-tha-like.jpg',
        },
        {
            id: '6',
            username: 'Nguyễn Văn A',
            avatar: 'https://catscanman.net/wp-content/uploads/2023/02/meme-cheems-18.jpg',
        },
        {
            id: '7',
            username: 'Faker',
            avatar: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Faker_2020_interview.jpg',
        },
        {
            id: '8',
            username: 'Jack Grealish',
            avatar: 'https://media.gq-magazine.co.uk/photos/60dd80da798ce10d68d9c999/1:1/w_1080,h_1080,c_limit/GettyImages-1326255764HP.jpg',
        },
        {
            id: '9',
            username: 'Jack 5 củ',
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS78ubOu-SHKa0Hv0d2rAuWlomNzyyFFg3OruDTvsjQK7ZmOeFSPLfUApLtkKxgInUDGSs&usqp=CAU',
        },
        {
            id: '10',
            username: 'Kim Ri Cha',
            avatar: 'https://steamuserimages-a.akamaihd.net/ugc/1749059066579358572/380FE80C6573DCB042330DAD8A0E843CE68C52F4/?imw=200&imh=200&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
        },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [listSearchUser, setListSearchUser] = useState<TBlockUser[]>([]);

    const blockUser = (id: string) => {
        // Xử lý gọi API chặn ở đây
        console.log(id);
    };

    useEffect(() => {
        if (searchQuery === '') setListSearchUser([]);
        else {
            const normalizedSearchQuery = unidecode(searchQuery.toLowerCase());
            const filteredUsers = allFriend.filter(user => {
                const normalizedUsername = unidecode(user.username.toLowerCase());
                return normalizedUsername.includes(normalizedSearchQuery);
            });
            setListSearchUser(filteredUsers);
        }
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <View style={styles.search_container}>
                <TouchableOpacity onPress={() => navigation.goBack()}><FontAwesome6 name="arrow-left" size={24} color={'black'} /></TouchableOpacity>
                <View>
                    <TextInput
                        style={styles.input}
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                        placeholder="Nhập tên của người dùng"
                    />
                </View>
            </View>
            <View style={styles.search_result_container}>
                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.list_user_search}>
                        {listSearchUser.length > 0 && listSearchUser.map((user, index) => (
                            <View key={index} style={styles.user_search_item}>
                                <View style={styles.image_name}>
                                    <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                                    <View>
                                        <Text style={styles.username}>{user.username}</Text>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        style={styles.button_block}
                                        onPress={() => blockUser(user.id)}
                                    >
                                        <Text style={styles.button_block_text}>CHẶN</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    search_container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#cccccc',
        borderBottomStyle: 'solid',
    },
    input: {
        backgroundColor: '#e4e4ed',
        paddingVertical: 6,
        paddingHorizontal: 20,
        fontSize: 18,
        borderRadius: 16,
        alignItems: 'center',
        width: 330,
    },
    search_result_container: {
        height: '93%',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    list_user_search: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
    user_search_item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image_name: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userAvatar: {
        width: 60,
        height: 60,
        borderColor: '#aaaaaa',
        borderWidth: 1,
        borderRadius: 4,
    },
    username: {
        color: 'black',
        fontSize: 20,
        marginLeft: 15,
    },
    button_block: {
        borderWidth: 1,
        borderColor: '#2477c9',
        borderStyle: 'solid',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    button_block_text: {
        fontWeight: '500',
        fontSize: 17,
        color: '#2477c9',
    },
});

export default AddUserToBlockListScreen;
