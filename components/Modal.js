import { Modal, TextInput, Text, View, TouchableOpacity, Image, Button } from "react-native";
import { useEffect, useState } from "react";
import styles2 from "./MyStyles2";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
const ModalAdd = () => {
 
    const [showModalDialog, setshowModalDialog] = useState(false);

    const [username, setUserName] = useState();
    const [password, setPassWord] = useState();
    const [fullname, setFullName] = useState();
    const [email, setEmail] = useState();
    const [img_source, setimg_source] = useState(null)
    const [image, setiimg_base64] = useState("data:image/jpeg;base64,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")
    // useEffect(() => {
    //     setshowModalDialog(true)
    //     // setiimg_base64("data:image/jpeg;base64,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")
    // })


    const SaveData = () => {

        // 1. tạo obj 
        let objSP = {
            username, password,
            fullname,email, image
        };

        //2. Dùng fetch:
        let api_url = 'http://44.168.0.121:3000/userData'

        fetch(api_url, {
            method: 'POST', // POST: Thêm mới, PUT: Sửa, DELETE: xóa, GET: lấy thông tin
            headers: { // Định dạng dữ liệu gửi đi
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objSP) // chuyển đối tượng SP thành chuỗi JSON
        })
            .then((response) => {
                console.log(response.status);
                // nếu log là 201 thì là tạo thành công
                if (response.status == 201)
                    alert("Thêm mới thành công");
                    //clearState()

            })
            .catch((err) => {  // catch để bắt lỗi ngoại lệ
                console.log(err);
            });


    }


    const pickImage = async () => {
        

        // Đọc ảnh từ thư viện thì không cần khai báo quyền
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4], // khung view cắt ảnh 
            quality: 1,
        });


        if (!result.canceled) {
            setimg_source(result.assets[0].uri);
            // chuyển ảnh thành base64 để upload lên json
            let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
            let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file
            console.log(file_ext);


            FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
                .then((res) => {
                    // phải nối chuỗi với tiền tố data image
                    setiimg_base64("data:image/" + file_ext + ";base64," + res);
                    // upload ảnh lên api thì dùng PUT có thể viết ở đây
                });


        }


    }



    return (
        <View >
            <Modal visible={showModalDialog}
                transparent={true}
                animationType="fade"
                onRequestClose={
                    () => {
                        // xảy ra khi bấm nút back trên điện thoại
                        setshowModalDialog(false);
                    }
                }
                >
                <View style={styles2.noidung_dialog}>
                    <TouchableOpacity onPress={pickImage}>
                        <View style={styles2.avt}>
                            {image && <Image source={{ uri: image }} style={styles2.avt} />}
                        </View>
                    </TouchableOpacity>

                    <View style={styles2.content}>
                        <TextInput
                            style={styles2.input}
                            placeholder='username'
                            onChangeText={((text) => setUserName(text))} />
                    </View>
                    <View style={styles2.content}>
                        <TextInput
                            style={styles2.input}
                            placeholder='password'
                            onChangeText={((text) => setPassWord(text))} />
                    </View>
                    <View style={styles2.content}>
                        <TextInput
                            style={styles2.input}
                            placeholder='fullname'
                            onChangeText={((text) => setFullName(text))} />
                    </View>
                    <View style={styles2.content}>
                        <TextInput
                            style={styles2.input}
                            placeholder='email'
                            onChangeText={((text) => setEmail(text))} />
                    </View>
                    <TouchableOpacity
                        onPress={SaveData}
                        style={styles2.add}>
                        <Text style={styles2.icon}>ADD DATA</Text>
                    </TouchableOpacity>
                </View>

            </Modal>

            <Button title="Add User" onPress={()=>setshowModalDialog(true)} />
        </View>
    )
}
export default ModalAdd;
